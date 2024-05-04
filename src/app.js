const express = require('express');
const path = require('path');
const db = require('./repository/database.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    if (req.url === '/') {
        res.redirect('/meuperfil');
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get(['/', '/meuperfil'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'erro404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
