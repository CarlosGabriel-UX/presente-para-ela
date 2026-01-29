document.addEventListener('DOMContentLoaded', () => {
    const btnSim = document.getElementById('btn-sim');
    const btnNao = document.getElementById('btn-nao');
    const questionSection = document.getElementById('question-section');
    const successSection = document.getElementById('success-section');
    const heartsContainer = document.getElementById('hearts-container');
    const btnSaveRing = document.getElementById('btn-save-ring');
    const ringSizeInput = document.getElementById('ring-size');
    const finalMessage = document.getElementById('final-message');

    // Função para criar corações flutuantes
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // Lógica do botão NÃO fugir
    btnNao.addEventListener('mouseover', () => {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        
        // Gera posições aleatórias, mas mantém dentro da tela
        const newX = Math.random() * (containerWidth - btnNao.offsetWidth);
        const newY = Math.random() * (containerHeight - btnNao.offsetHeight);

        btnNao.style.position = 'fixed';
        btnNao.style.left = `${newX}px`;
        btnNao.style.top = `${newY}px`;
    });

    // Se clicar no NÃO por acaso (mobile ou sorte)
    btnNao.addEventListener('click', () => {
        alert('Tente novamente! Essa opção está com defeito. 😉');
    });

    // Lógica do botão SIM
    btnSim.addEventListener('click', () => {
        questionSection.classList.add('hidden');
        successSection.classList.remove('hidden');
        
        // Intensifica os corações
        for(let i=0; i<50; i++) {
            setTimeout(createHeart, i * 50);
        }
    });

    // Salvar tamanho da aliança e enviar via WhatsApp
    btnSaveRing.addEventListener('click', () => {
        const size = ringSizeInput.value;
        if (!size) {
            alert('Por favor, coloque o tamanho da aliança! ❤️');
            return;
        }

        // SEU NÚMERO AQUI (Apenas números, com DDD e 55 na frente)
        // Exemplo: 5511999999999
        const seuNumero = "5511972317352"; 
        const mensagem = encodeURIComponent(`Oi amor! Eu aceitei! ❤️ O tamanho da minha aliança é: ${size}`);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${seuNumero}&text=${mensagem}`;

        // Abre o WhatsApp
        window.open(whatsappLink, '_blank');
        
        // Desabilita inputs e mostra mensagem final
        ringSizeInput.disabled = true;
        btnSaveRing.disabled = true;
        finalMessage.classList.remove('hidden');
        
        // Mostra o botão da biblioteca
        document.getElementById('book-section').classList.remove('hidden');
    });

    // Lógica do Livro
    const ourBook = document.getElementById('our-book');
    if (ourBook) {
        ourBook.addEventListener('click', () => {
            ourBook.classList.toggle('open');
        });
    }
});
