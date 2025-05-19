const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { uploadMiddleware, uploadFile } = require('../controllers/files.controller');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/src/uploads', express.static(path.join(__dirname, 'src/uploads')));

// Ruta de carga
app.post('/upload', uploadMiddleware, uploadFile);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
