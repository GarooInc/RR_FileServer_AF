const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

// Servir archivos estáticos desde /uploads
app.use('/files', express.static(path.join(__dirname, 'files')));

// Rutas
app.use(require('./routes/index'));

// Iniciar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server on port:', PORT);
});