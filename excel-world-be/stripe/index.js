import { Router } from "express";
import Stripe from "stripe";
import { v4 as genId } from "uuid";
import nodemailer from "nodemailer"
import { userModel } from "../models/user.js";
import { userAuthMiddleWare } from "../auth/authMiddleWare.js";
const stripe = new Stripe(process.env.STRIPE_SK_LIVE); // API key

const paymentRoute = new Router();

paymentRoute.post("/", userAuthMiddleWare, async (req, res) => {
  const { product, token } = req.body;
  const idempotencyKey = genId();
  try {
    const customer = await stripe.customers
      .create({
        email: token.email,
        source: token.id,
      });
    const result = await stripe.charges.create(
      {
        amount: product.discount
          ? product.discount * 100
          : product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: product.description,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
          },
        },
      },
      { idempotencyKey }
    );
    // This block executes when the payment is successful
 // You can handle the payment result here, like updating your database or sending a confirmation email to the customer.
    let mailTransporter = nodemailer.createTransport({
      port: 587,
      service: 'gmail',
      auth: {
        user: "quliyevnamiq8@gmail.com",
        pass: "zctcotccytitdxsi"
      }
    })
    // email details
    let details = {
      from: "quliyevnamiq8@gmail.com",
      to: `${result.receipt_email}`,
      subject: `${product.name}`,
      attachments: [
        {
          filename: `${product.name}.pdf`,
          path: `public/books/${product.link_file}`,
        },
      ],
    };
    // send email
    mailTransporter.sendMail(details, (err) => {
      if (err) {
        return res.status(400).send({ success: false, error: err.message })
      } else {
        return res.status(200).send({ success: true, message: "The book you bought has been sent to your email address" })
      }
    })

    await userModel.findByIdAndUpdate(req.user._id, { $push: { purchased_resourced: product._id } })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});
export default paymentRoute;

