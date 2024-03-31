document.addEventListener('DOMContentLoaded', function () {
    // Função para inicializar cada slideshow
    function inicializarSlideshow(slideshow) {
        var quant = slideshow.querySelectorAll('.slides .image');
        var atual = 0;
        var voltar = slideshow.querySelector('.btn-voltar');
        var proximo = slideshow.querySelector('.btn-proximo');
        var balls = slideshow.querySelector('.balls');

        // Cria os marcadores de navegação
        for (let i = 0; i < quant.length - balls; i++) {
            var div = document.createElement('div');
            div.id = i; // Atribui IDs únicos a cada marcador
            balls.appendChild(div);
        }

        // Define a classe 'imgAtual' para o primeiro marcador
        balls.children[0].classList.add('imgAtual');

        // Obtém os marcadores de navegação
        var pos = balls.querySelectorAll('div');
        console.log(pos);

        // Adiciona eventos de clique aos marcadores de navegação
        for (let i = 0; i < pos.length; i++) {
            pos[i].addEventListener('click', () => {
                atual = parseInt(pos[i].id); // Converte para número
                slide();
            });
        }

        // Adiciona evento de clique ao botão 'voltar'
        voltar.addEventListener('click', () => {
            atual--;
            slide();
        });

        // Adiciona evento de clique ao botão 'próximo'
        proximo.addEventListener('click', () => {
            atual++;
            slide();
        });

        // Função para controlar a exibição dos slides
        function slide() {
            if (atual >= quant.length) {
                atual = 0;
            } else if (atual < 0) {
                atual = quant.length - 1;
            }

            // Oculta todos os slides
            quant.forEach((img) => {
                img.style.display = 'none';
            });

            // Exibe apenas o slide atual
            quant[atual].style.display = 'block';

            // Atualiza a classe dos marcadores de navegação
            pos.forEach((ball) => {
                ball.classList.remove('imgAtual');
            });
            pos[atual].classList.add('imgAtual');
        }

        // Inicia a transição automática entre os slides
        setInterval(() => {
            atual++;
            slide();
        }, 4000);

        // Inicia o slideshow
        slide();
    }

    // Inicializa cada slideshow na página
    document.querySelectorAll('.slide').forEach((slideshow) => {
        inicializarSlideshow(slideshow);
    });
});
