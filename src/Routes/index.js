const express = require('express');
const router = express.Router();

const { uploadMiddleware, uploadFile } = require('../controllers/files.controller');

// Ruta de carga
router.post('/upload', uploadMiddleware, uploadFile);

module.exports = router;
