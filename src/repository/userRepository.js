const mysql = require('./database.js');

async function mapUser(req, res) {
    mysql().then(db => {
        db.all('SELECT * FROM user')
            .then(user => res.json(user));
    });
}

async function selectUser(req, res) {
    let id = req.body.id;
    mysql().then(db => {
        db.get('SELECT * FROM user WHERE id=?', [id])
            .then(user => res.json(user));
    });
}

async function insertUser(req, res) {
    let user = req.body;
    mysql().then(db => {
        db.run('INSERT INTO user (nome, idade, endereco, biografia)  VALUES (?, ?, ?, ?)', [user.nome, user.idade, user.endereco, user.biografia]);
    });
    res.json({
        "statusCode": 200
    });
}

async function updateUser(req, res) {
    let user = req.body;
    mysql().then(db => {
        db.run('UPDATE user SET nome=?, idade=?, endereco=?, biografia=? WHERE id=?', [user.nome, user.idade, user.endereco, user.biografia, user.id]);
    });
    res.json({
        "statusCode": 200
    });
}

async function deleteUser(req, res) {
    let id = req.body.id;
    openDb().then(db => {
        db.run('DELETE FROM user WHERE id=?', [id])
            .then(res => res);
    });
    res.json({
        "statusCode": 200
    });
}

module.exports = {
    mapUser,
    selectUser,
    insertUser,
    updateUser,
    deleteUser
};