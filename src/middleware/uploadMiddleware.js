//here I will use multer to handle file uploads
import multer, { diskStorage } from 'multer';

//configure multer storage
const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//create a multer instance with the configured storage
const upload = multer({ storage: storage });

export default upload;
