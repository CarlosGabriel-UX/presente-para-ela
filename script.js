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
    function moverBotaoNao() {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        
        // Gera posições aleatórias, mas mantém dentro da tela
        const padding = 20;
        const newX = Math.random() * (containerWidth - btnNao.offsetWidth - padding * 2) + padding;
        const newY = Math.random() * (containerHeight - btnNao.offsetHeight - padding * 2) + padding;

        btnNao.style.position = 'fixed';
        btnNao.style.left = `${newX}px`;
        btnNao.style.top = `${newY}px`;
        btnNao.style.zIndex = '1000';
    }

    // Move quando o mouse chega perto
    btnNao.addEventListener('mouseover', moverBotaoNao);
    
    // Move automaticamente a cada 1 segundo (mesmo sem o mouse perto)
    let intervalNo = setInterval(moverBotaoNao, 1000);

    // Se ela conseguir clicar (muito difícil)
    btnNao.addEventListener('click', (e) => {
        e.preventDefault();
        moverBotaoNao();
        alert('Ops! Essa opção está com defeito. Tente o outro botão! 😉');
    });

    // Lógica do botão SIM
    btnSim.addEventListener('click', () => {
        clearInterval(intervalNo); // Para de pular o botão Não
        btnNao.classList.add('hidden'); // Some com o botão Não
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
    });

    // Lógica do Livro
    const ourBook = document.getElementById('our-book');
    if (ourBook) {
        ourBook.addEventListener('click', () => {
            ourBook.classList.toggle('open');
        });
    }
});
