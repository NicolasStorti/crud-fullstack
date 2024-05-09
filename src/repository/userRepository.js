const mysqlConnection = require('./database.js');

async function mapUser(req, res) {
    mysqlConnection.query('SELECT * FROM user', (err, rows) => {
        if (err) {
            console.error('Erro ao selecionar usuários:', err);
            res.status(500).json({ error: 'Erro ao selecionar usuários' });
            return;
        }
        res.json(rows);
    });
}

async function selectUser(req, res) {
    let id = req.body.id;
    mysqlConnection.query('SELECT * FROM user WHERE id=?', [id], (err, rows) => {
        if (err) {
            console.error('Erro ao selecionar usuário:', err);
            res.status(500).json({ error: 'Erro ao selecionar usuário' });
            return;
        }
        res.json(rows[0]);
    });
}

async function insertUser(nome, idade, endereco, biografia, callback) {
    mysqlConnection.query('INSERT INTO user (nome, idade, endereco, biografia) VALUES (?, ?, ?, ?)', [nome, idade, endereco, biografia], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            callback(err, null);
        } else {
            callback(null, result.insertId);
        }

    });
}

async function updateUser(req, res) {
    let user = req.body;
    mysqlConnection.query('UPDATE user SET nome=?, idade=?, endereco=?, biografia=? WHERE id=?', [user.nome, user.idade, user.endereco, user.biografia, user.id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
            return;
        }
        res.json({ statusCode: 200, message: 'Usuário atualizado com sucesso' });
    });
}

async function deleteUser(req, res) {
    let id = req.body.id;
    mysqlConnection.query('DELETE FROM user WHERE id=?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir usuário:', err);
            res.status(500).json({ error: 'Erro ao excluir usuário' });
            return;
        }
        res.json({ statusCode: 200, message: 'Usuário excluído com sucesso' });
    });
}

module.exports = {
    mapUser,
    selectUser,
    insertUser,
    updateUser,
    deleteUser
};