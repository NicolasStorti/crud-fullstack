const express = require('express');
const path = require('path');
const db = require('./repository/database.js');
const bodyParser = require('body-parser');
const userRepository = require('./repository/userRepository.js');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

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

app.post('/inserir-usuario', (req, res) => {
    const { nome, idade, endereco, biografia } = req.body;

    userRepository.insertUser(nome, idade, endereco, biografia, (err, userId) => {
        if (err) {
            res.status(500).send('Erro ao inserir usuário');
        } else {
            res.status(200).send('Usuário inserido com sucesso');
        }
    });
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'erro404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
