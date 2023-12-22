import PropTypes from "prop-types";
import { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { SnackBarContext } from "../../Context/Snackbar";
import { useNavigate } from "react-router";

const StripePayment = ({ childen, data, userToken }) => {
  const setNotify = useContext(SnackBarContext);
  const navigate = useNavigate();

  const makePayment = (token) => {
    const body = {
      token,
      product: data,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    };

    return fetch(`${import.meta.env.VITE_BASE_URL}/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 400) {
          setNotify({ success: false, message: res.message });
        } else {
          setNotify({ success: true, message: res.message });
          navigate("/user-settings");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <StripeCheckout
      stripeKey={import.meta.env.VITE_STRIPE_KEY}
      token={makePayment}
      description="Enter your email address"
      panelLabel={`Pay $${
        data.discount ? data.discount : data.price
      } slslslslslslsllssllslslslslslsl`} // Error change text span.iconTick
      name="Buy product"
      label="Buy product"
      amount={data.price}
    >
      {childen}
    </StripeCheckout>
  );
};

StripePayment.propTypes = { childen: PropTypes.node.isRequired };
StripePayment.propTypes = { data: PropTypes.object.isRequired };
StripePayment.propTypes = { userToken: PropTypes.string.isRequired };

export default StripePayment;
