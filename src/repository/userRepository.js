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

async function insertUser(req, res) {
    let user = req.body;
    mysqlConnection.query('INSERT INTO user (nome, idade, endereco, biografia) VALUES (?, ?, ?, ?)', [user.nome, user.idade, user.endereco, user.biografia], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ error: 'Erro ao inserir usuário' });
            return;
        }
        res.json({ statusCode: 200, message: 'Usuário inserido com sucesso' });
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