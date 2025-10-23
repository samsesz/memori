import multer from 'multer';
import path from 'path';

//Checkpoints
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/checkpoints/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Rotas
const rotasStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/rotas/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Modelagens - QRCodes
const qrCodeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/modelagens/qrcodes/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas imagens são permitidas.'), false);
    }
};

// Upload Checkpoints
const uploadCheckpoint = multer({ 
    storage: storage, // Correto
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Upload Rotas
const uploadRota = multer({ 
    storage: rotasStorage, // <-- CORRIGIDO (a chave é "storage")
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Upload QRCodes
const uploadQRCode = multer({ 
    storage: qrCodeStorage, // <-- CORRIGIDO (a chave é "storage")
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export { uploadCheckpoint, uploadRota, uploadQRCode };