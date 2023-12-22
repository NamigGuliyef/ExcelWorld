import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({})
const upload = multer({ storage })
export default upload



const booksStorageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/books')
    },
    filename: (req, file, cb) => {
        let originalname = file.originalname
        cb(null, originalname.slice(originalname[0], originalname.indexOf('.')) + path.extname(file.originalname))
    }
})

export const multerStorage = multer({ storage: booksStorageFile })
