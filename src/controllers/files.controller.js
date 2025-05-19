const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const UPLOAD_PATH = process.env.UPLOAD_PATH || 'src/uploads';
const BASE_URL = process.env.BASE_URL;

// Middleware dinámico para almacenamiento según tipo y uuid
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tipo = req.body.tipo;
    const dir = path.join(UPLOAD_PATH, tipo);

    // Crear la carpeta si no existe
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uuid = req.body.uuid;
    const ext = path.extname(file.originalname) || '.bin';
    cb(null, `${uuid}${ext}`);
  }
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single('file');

exports.uploadFile = (req, res) => {
  const tipo = req.body.tipo;
  const uuid = req.body.uuid;
  const file = req.file;

  if (!file || !tipo || !uuid) {
    return res.status(400).json({ error: 'Faltan campos requeridos: file, tipo o uuid' });
  }

  const ext = path.extname(file.originalname);
  const filePath = `${UPLOAD_PATH}/${tipo}/${uuid}${ext}`;
  const fileUrl = `${BASE_URL}/${filePath}`;

  return res.status(200).json({
    message: 'Archivo subido correctamente',
    path: filePath,
    url: fileUrl
  });
};
