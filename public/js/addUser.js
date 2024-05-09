document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addUserForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const endereco = document.getElementById('endereco').value;
        const biografia = document.getElementById('biografia').value;
        
        if (!nome || !idade || !endereco || !biografia) {
            console.error('Por favor, preencha todos os campos do formulário.');
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
            
            if (!response.ok) {
                throw new Error('Erro ao adicionar usuário');
            }
        } catch (error) {
            console.error('Erro:', error.message);
        }
    });
});