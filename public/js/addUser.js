document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addUserForm');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const endereco = document.getElementById('endereco').value;
        const biografia = document.getElementById('biografia').value;

        if (!nome || !idade || !endereco || !biografia) {
            mensagem.innerHTML = '<div class="alert alert-danger rounded-0" role="alert">Por favor, preencha todos os campos do formulário.</div>';
            return;
        }

        try {
            const response = await fetch('/inserir-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, idade, endereco, biografia })
            });

            if (response.ok) {
                mensagem.innerHTML = '<div class="alert alert-success rounded-0" role="alert">Usuário inserido com sucesso!</div>';
                form.reset();
            } else {
                throw new Error('Erro ao adicionar usuário');
            }
        } catch (error) {
            console.error('Erro:', error.message);
            mensagem.innerHTML = '<div class="alert alert-danger" role="alert">Erro ao adicionar usuário. Por favor, tente novamente mais tarde.</div>';
        }
    });
});