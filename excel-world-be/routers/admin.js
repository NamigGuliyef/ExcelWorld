import { Router } from 'express'
import { AdminAuthMiddleWare } from '../auth/authMiddleWare.js'
import upload, { multerStorage } from '../config/multer.js'
import {
    aboutController, getAboutController, addBlogPictureController, certificateController, createBlogController,
    createPastInPictureController, createResourceController, createUsefulLinkController, deleteBlogController, deletePastInPictureController, deleteUsefulLinkController, getAllUsersController, getContactsController, getSingleUsefulLink, getSingleUserController, homeYoutubeLinkController, SocialMediaController,
    updateBlogController, UpdatehomeYoutubeLinkController, updatePastInPictureController, updateResourceController, updateUsefulLinkController, singleBlogController, getAllBlogController,
    getALLResourceController, getResourceController, usefulLinksController
} from '../controllers/admin.js'
const r = Router()

// home page add youtube link
r.post('/home_youtubeLink', AdminAuthMiddleWare, homeYoutubeLinkController)
// home page youtube link update
r.put('/home_youtubeLink', AdminAuthMiddleWare, UpdatehomeYoutubeLinkController)
// home page create past in picture
r.post('/past_In_Picture', AdminAuthMiddleWare, upload.single('photo'), createPastInPictureController)
// home page update past in picture
r.put('/past_In_Picture/:id', AdminAuthMiddleWare, upload.single('photo'), updatePastInPictureController)
// home page delete past in picture
r.delete('/past_In_Picture/:id', AdminAuthMiddleWare, deletePastInPictureController)
//  change about us
r.put('/about', AdminAuthMiddleWare, upload.single('photo'), aboutController)
// get about
r.get('/about', AdminAuthMiddleWare, getAboutController)
// get all contacts
r.get('/contacts', AdminAuthMiddleWare, getContactsController)
// add social media
r.post('/social_media', AdminAuthMiddleWare, SocialMediaController)
// add certificate
r.put('/certificate', AdminAuthMiddleWare, upload.single('photo'), certificateController)
// create blog
r.post('/create-blog', AdminAuthMiddleWare, createBlogController)
// create blog picture
r.post('/create-blog-picture', AdminAuthMiddleWare, upload.single('photo'), addBlogPictureController)
// update blog
r.put('/update-blog/:id', AdminAuthMiddleWare, updateBlogController)
// delete blog
r.delete('/delete-blog/:id', AdminAuthMiddleWare, deleteBlogController)
// get single blog
r.get('/blogs/:id', AdminAuthMiddleWare, singleBlogController)
// get All blogs
r.get('/blogs', AdminAuthMiddleWare, getAllBlogController)
// get All users profile information
r.get('/allUsers', AdminAuthMiddleWare, getAllUsersController)
// get single user profile information
r.get('/single-user/:id', AdminAuthMiddleWare, getSingleUserController)
// create resource 
r.post('/create-resource', AdminAuthMiddleWare, multerStorage.fields([{ name: 'photo' }, { name: 'link_file' }]), createResourceController)
// update resource
r.put('/update-resource/:id', AdminAuthMiddleWare, multerStorage.fields([{ name: 'photo' }, { name: "link_file" }]), updateResourceController)
// get all resources
r.get('/recources', AdminAuthMiddleWare, getALLResourceController)
//get single resource
r.get('/recources/:id', AdminAuthMiddleWare, getResourceController)
// create useful link
r.post('/create-usefulLink', AdminAuthMiddleWare, upload.single('photo'), createUsefulLinkController)
// update useful link
r.put('/update-usefulLink/:id', AdminAuthMiddleWare, upload.single('photo'), updateUsefulLinkController)
// delete useful Link
r.delete('/delete-usefulLink/:id', AdminAuthMiddleWare, deleteUsefulLinkController)
// get single useful link
r.get('/single-usefulLink/:id', AdminAuthMiddleWare, getSingleUsefulLink)
// get all useful links
r.get('/usefulLinks', usefulLinksController)


export default r
