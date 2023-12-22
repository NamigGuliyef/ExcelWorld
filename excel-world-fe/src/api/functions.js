import { sendRequest } from "./request";

// GET Requests

export const getAbout = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/about`);

export const getBlogs = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/blogs`);

export const getSingleBlog = (id) =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);

export const getYoutube = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/home_youtubeLink`);

export const getCards = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/past_In_Picture`);

export const getAllResources = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/resource`);

export const getSingleResource = (id) =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/resource/${id}`);

export const getUsefullLinks = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/useful_Links`);

// GET Requests(Admin)

export const getContacts = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/admin/contacts`, "GET", true);

export const getUsers = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/admin/allUsers`, "GET", true);

export const getSingleUser = (id) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/single-user/${id}`,
    "GET",
    true
  );

export const getSingleUsefullLink = (id) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/single-usefulLink/${id}`,
    "GET",
    true
  );

// GET Requests(User)

export const getUserDetails = () =>
  sendRequest(`${import.meta.env.VITE_BASE_URL}/user/profile`, "GET", true);

// POST reequests
export const login = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/auth/signin`,
    "POST",
    false,
    data
  );

export const register = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/auth/signup`,
    "POST",
    false,
    data
  );

export const forgetPassword = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/auth/forgotPass`,
    "POST",
    false,
    data
  );

export const verifyCode = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/auth/verifyCode`,
    "POST",
    false,
    data
  );

export const recoveryPassword = (data, token) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/auth/recoveryPass/${token}`,
    "POST",
    false,
    data
  );

export const createBlog = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/create-blog`,
    "POST",
    true,
    data
  );

export const createCard = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/past_In_Picture`,
    "POST",
    true,
    data,
    "FORM_DATA"
  );

export const createSocialMedia = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/social_media`,
    "POST",
    true,
    data
  );

export const createContact = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/contact-create`,
    "POST",
    false,
    data
  );

export const createResource = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/create-resource`,
    "POST",
    true,
    data,
    "FORM_DATA"
  );

export const createUsefullLink = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/create-usefulLink`,
    "POST",
    true,
    data,
    "FORM_DATA"
  );

// PUT Requests
export const userEditProfile = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/user/edit-profile`,
    "PUT",
    true,
    data
  );

export const editAboutPage = (urlEndpoint, data, type) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/${urlEndpoint}`,
    "PUT",
    true,
    data,
    type
  );

export const editBlog = (id, data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/update-blog/${id}`,
    "PUT",
    true,
    data
  );

export const editYoutubeLink = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/home_youtubeLink`,
    "PUT",
    true,
    data
  );

export const editSingleCard = (id, data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/past_In_Picture/${id}`,
    "PUT",
    true,
    data,
    "FORM_DATA"
  );

export const editUsefullLink = (id, data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/update-usefulLink/${id}`,
    "PUT",
    true,
    data,
    "FORM_DATA"
  );

export const editResource = (id, data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/update-resource/${id}`,
    "PUT",
    true,
    data,
    "FORM_DATA"
  );

export const getInTouch = (data) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/contact-create`,
    "POST",
    false,
    data
  );

//DELETE Requests
export const deleteBlog = (id) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/delete-blog/${id}`,
    "DELETE",
    true
  );

export const deleteCard = (id) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/past_In_Picture/${id}`,
    "DELETE",
    true
  );

export const deleteUsefullLink = (id) =>
  sendRequest(
    `${import.meta.env.VITE_BASE_URL}/admin/delete-usefulLink/${id}`,
    "DELETE",
    true
  );

// export const deleteResource = (id) =>
//   sendRequest(
//     `${import.meta.env.VITE_BASE_URL}/admin//${id}`,
//     "DELETE",
//     true
//   );
