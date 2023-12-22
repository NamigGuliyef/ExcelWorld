import joi from "joi";
import cloudinary from "../config/cloudinary.js";
import { aboutModel } from "../models/about.js";
import { contactModel } from "../models/contact.js";
import { blogModel } from "../models/blog.js";
import { HomeYoutubeModel } from "../models/homeYoutube.js";
import { pastInPicModel } from "../models/pastInPicture.js";
import { userModel } from "../models/user.js";
import { resourceModel } from "../models/resource.js";
import { usefulLinkModel } from "../models/usefulLink.js";

// home page add youtube link
export const homeYoutubeLinkController = async (req, res) => {
  try {
    const newYoutubeLink = await HomeYoutubeModel.create(req.body);
    return res.status(201).send({
      success: true,
      message: "New youtube link successfully created",
      newYoutubeLink,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in yotubeLink",
      error: error.message,
    });
  }
};

// home page youtube link update
export const UpdatehomeYoutubeLinkController = async (req, res) => {
  try {
    await HomeYoutubeModel.updateOne({ $set: req.body });
    return res
      .status(201)
      .send({ success: true, message: "Youtube link successfully updated" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update yotubeLink",
      error: error.message,
    });
  }
};

//create past in picture
export const createPastInPictureController = async (req, res) => {
  try {
    const { checked, description } = req.body; // CHANGED
    const data = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.originalname,
    });
    const pastInPic = await pastInPicModel.create({
      description,
      checked: checked ? checked : false, // CHANGED
      photo: data.url,
    });
    return res.status(201).send({
      success: true,
      message: "New past in picture successfully created",
      pastInPic,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create past in picture ",
      error: error.message,
    });
  }
};

//update past in picture
export const updatePastInPictureController = async (req, res) => {
  try {
    const { checked, description } = req.body;
    const updatedCard = {};
    if (checked && checked === "false") {
      updatedCard.checked = false;
    }
    if (checked && checked === "true") {
      updatedCard.checked = true;
    }
    if (req.file) {
      const data = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.originalname,
      });
      updatedCard.photo = data.url;
    }
    if (description) {
      updatedCard.description = description;
    }
    const pastInPic = await pastInPicModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedCard },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Update past in picture successfully",
      pastInPic,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update past in picture ",
      error: error.message,
    });
  }
};

//delete past in picture
export const deletePastInPictureController = async (req, res) => {
  try {
    const pastInPic = await pastInPicModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Past in picture deleted successfully",
      pastInPic,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update past in picture ",
      error: error.message,
    });
  }
};

//update about
export const aboutController = async (req, res) => {
  try {
    const aboutSchema = joi.object({
      title: joi.string().required(),
      info: joi.string().required(),
      photo: joi.string(),
      detailed_info: joi.string().required(),
    });

    const { error, value } = aboutSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
    const data = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.originalname,
    });
    await aboutModel.updateOne({ $set: { ...value, photo: data.url } });
    return res
      .status(200)
      .send({ success: true, message: "Update about successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in about us",
      error: error.message,
    });
  }
};

// get about
export const getAboutController = async (req, res) => {
  try {
      const about_us = await aboutModel.find()
      return res.status(200).send({ success: true, message: "About us", about_us })
  } catch (error) {
      return res.status(500).send({ success: false, message: "Error in get about us", error: error.message })
  }
}

// add social media
export const SocialMediaController = async (req, res) => {
  try {
    await aboutModel.updateOne({ $set: { social_media: req.body } });
    return res
      .status(200)
      .send({ success: true, message: "Add social media link successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in social media",
      error: error.message,
    });
  }
};

// add certificate
export const certificateController = async (req, res) => {
  try {
    const data = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.originalname,
    });
    await aboutModel.updateOne({ $push: { certificates: data.url } });
    return res
      .status(200)
      .send({ success: true, message: "Add certificate successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in certificate",
      error: error.message,
    });
  }
};

// get All Contacts
export const getContactsController = async (req, res) => {
  try {
    const allContact = await contactModel.find();
    return res
      .status(200)
      .send({ success: true, message: "All contacts", allContact });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get all contact",
      error: error.message,
    });
  }
};

// create blog
export const createBlogController = async (req, res) => {
  try {
    const blogSchema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      category: joi.string().required(),
    });
    const { error, value } = blogSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
    const newBlog = await blogModel.create(value);
    return res.status(201).send({
      success: true,
      message: "New blog created successfully",
      newBlog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create blog",
      error: error.message,
    });
  }
};

// add Blog Picture
export const addBlogPictureController = async (req, res) => {
  try {
    const { url } = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.originalname,
    });
    return res
      .status(201)
      .send({ success: true, message: "Photo url created", url });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create blog",
      error: error.message,
    });
  }
};

// update blog
export const updateBlogController = async (req, res) => {
  try {
    const blogSchema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      category: joi.string().required(),
    });
    const { error, value } = blogSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
    const blogExist = await blogModel.findById(req.params.id);
    if (!blogExist) {
      return res
        .status(404)
        .send({ success: false, message: "Blog not found" });
    }
    const updateBlog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { $set: value },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, message: "Update blog successfully", updateBlog });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update blog",
      error: error.message,
    });
  }
};

// delete blog
export const deleteBlogController = async (req, res) => {
  try {
    const blogExist = await blogModel.findById(req.params.id);
    if (!blogExist) {
      return res
        .status(404)
        .send({ success: false, message: "Blog not found" });
    }
    await blogModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in delete blog",
      error: error.message,
    });
  }
};

// get single blog
export const singleBlogController = async (req, res) => {
  try {
      const singleBlog = await blogModel.findById(req.params.id)
      if (!singleBlog) {
          return res.status(404).send({ success: false, message: "Blog not found" })
      }
      return res.status(200).send({ success: true, message: "Get single blog", singleBlog })
  } catch (error) {
      return res.status(500).send({ success: false, message: "Error in single blog", error: error.message })
  }
}

// get All blog
export const getAllBlogController = async (req, res) => {
  try {
      const blogs = await blogModel.find()
      return res.status(200).send({ success: true, message: " All blogs", blogs })
  } catch (error) {
      return res.status(500).send({ success: false, message: "Error in all blogs", error: error.message })
  }
}

// get all users profile information
export const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userModel.find({ role: "user" }).select("-password");
    return res.status(200).send({
      success: true,
      message: "All users profile information",
      allUsers,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get All users profile information",
      error: error.message,
    });
  }
};

// get single user profile information
export const getSingleUserController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .populate({
        path: "purchased_resourced",
        select: ["name", "photo", "description"],
      })
      .select("-password");
    console.log(user);

    return res.status(200).send({
      success: true,
      message: "Single user profile information",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get single user profile information",
      error: error.message,
    });
  }
};

// create resource
export const createResourceController = async (req, res) => {
  try {
    const resourceSchema = joi.object({
      name: joi.string().required(),
      category: joi.string().required(),
      photo: joi.string(),
      link_file: joi.string(),
      price: joi.number().required(),
      description: joi.string().required(),
      details:joi.string().required(),
      discount: joi.number(),
    });
    const { error, value } = resourceSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
    const resource = await resourceModel.create({
      ...value,
      photo: req.files.photo[0].originalname,
      link_file: req.files.link_file[0].originalname,
    });
    return res.status(201).send({
      success: true,
      message: "New resource successfully created",
      resource,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create resource",
      error: error.message,
    });
  }
};

// update resource
export const updateResourceController = async (req, res) => {
  try {
    const resourceSchema = joi.object({
      name: joi.string().required(),
      category: joi.string().required(),
      photo: joi.string(),
      link_file: joi.string(),
      price: joi.number().required(),
      description: joi.string().required(),
      details:joi.string().required(),
      discount: joi.number(),
    });
    const { error, value } = resourceSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
    const resourceExist = await resourceModel.findById(req.params.id);
    if (!resourceExist) {
      return res
        .status(404)
        .send({ success: false, message: "Resource not found!" });
    }
    const updatedObj = { ...value };
    if (req.files.photo) {
      updatedObj.photo = req.files.photo[0].originalname;
    }

    if (req.files.link_file) {
      updatedObj.link_file = req.files.link_file[0].originalname;
    }
    const updateResource = await resourceModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedObj },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Resource update successfully",
      updateResource,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update Resource",
      error: error.message,
    });
  }
};

// get All resources 
export const getALLResourceController = async (req, res) => {
  try {
    const allResources = await resourceModel.find()
    return res.status(200).send({ success: true, message: "All resources", allResources })
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in get all resources", error: error.message })
  }
}

//get single resource
export const getResourceController = async (req, res) => {
  try {
    const resource = await resourceModel.findById(req.params.id)
    return res.status(200).send({ success: true, message: "Single resource", resource })
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in get resource", error: error.message })
  }
}

// create useful Link
export const createUsefulLinkController = async (req, res) => {
  try {
    const usefulLinkSchema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      photo: joi.string(),
      web_link: joi.string().required(),
    });
    const { error, value } = usefulLinkSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
    const data = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.originalname,
    });
    const usefulLink = await usefulLinkModel.create({
      ...value,
      photo: data.url,
    });
    return res.status(201).send({
      success: true,
      message: "New useful link created successfully",
      usefulLink,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create useful link",
      error: error.message,
    });
  }
};

// update useful Link
export const updateUsefulLinkController = async (req, res) => {
  try {
    const usefulLinkSchema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      photo: joi.string(),
      web_link: joi.string().required(),
    });
    const { error, value } = usefulLinkSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
    if (!req.file) {
      const updateUsefulLink = await usefulLinkModel.findByIdAndUpdate(
        req.params.id,
        { $set: value },
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Updated useful link successfully",
        updateUsefulLink,
      });
    } else {
      const data = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.originalname,
      });
      const updateUsefulLink = await usefulLinkModel.findByIdAndUpdate(
        req.params.id,
        { $set: { ...value, photo: data.url } },
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Updated useful link successfully",
        updateUsefulLink,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update useful link",
      error: error.message,
    });
  }
};

// delete useful Link
export const deleteUsefulLinkController = async (req, res) => {
  try {
    await usefulLinkModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ success: true, message: "Deleted useful link successfully" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in delete useful link",
      error: error.message,
    });
  }
};

// get single useful link
export const getSingleUsefulLink = async (req, res) => {
  try {
    const usefulLink = await usefulLinkModel.findById(req.params.id);
    return res
      .status(200)
      .send({ success: true, message: "Single useful Link", usefulLink });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get single useful link",
      error: error.message,
    });
  }
};

// get all useful links
export const usefulLinksController = async (req, res) => {
  try {
      const allUsefulLinks = await usefulLinkModel.find()
      return res.status(200).send({ success: true, message: "All useful links", allUsefulLinks })
  } catch (error) {
      return res.status(500).send({ success: false, message: "Error in get all useful links" })
  }
}

