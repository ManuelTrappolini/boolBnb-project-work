const multer = require('multer');
const path = require('path');

// Configurazione di Multer per l'upload delle immagini
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            console.log("File valid: ", file);
            return cb(null, true);
        } else {
            console.log("Invalid file: ", file);
            return cb(new Error('Only images are allowed.'));
        }
    },
});

module.exports = upload;