const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../../db.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conexão bem-sucedida com o banco de dados');
    }
});

module.exports = db;