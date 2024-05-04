const express = require('express');
const path = require('path');

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

app.get('/meuperfil', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`API na Porta: ${PORT}`);
});
