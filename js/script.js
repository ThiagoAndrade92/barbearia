// Variáveis
const menuHamburger = document.querySelector('.menu-hamburger');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');
const line3 = document.querySelector('.line3');
const navMobile = document.querySelector('.nav-mobile');
const btnEnviar = document.querySelector('#enviar');

let boxFeedback = [];

// Carregar feedbacks do localStorage
document.addEventListener("DOMContentLoaded", () => {
    const feedbacksSalvos = localStorage.getItem('feedbacks');
    if (feedbacksSalvos) {
        boxFeedback = JSON.parse(feedbacksSalvos); // Converte de volta para array
        boxFeedback.forEach(feedback => {
            adicionarComentario(feedback); // Renderiza os feedbacks salvos
        });
        adicionarEventosDeRemocao(); // Adiciona os eventos de remoção aos feedbacks carregados
    }
});

// Menu Hamburger
menuHamburger.addEventListener('click', () => {
    line1.classList.toggle('active');
    line2.classList.toggle('active');
    line3.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Enviar dados dos inputs
btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    const inputName = document.querySelector('#nome');
    const opiniao = document.querySelector('#opiniao');

    // Validação de campos
    if (inputName.value.trim() === "" || opiniao.value.trim() === "") {
        alert(`Por favor, preencha todos os campos! 
- Nome: ${inputName.value.trim() === "" ? "Vazio" : "OK"} 
- Opinião: ${opiniao.value.trim() === "" ? "Vazio" : "OK"}`);
        return;
    }

    // Criar objeto de feedback
    const feedbackObj = {
        nome: inputName.value.trim(),
        opiniao: opiniao.value.trim(),
        data: new Date().toLocaleString("pt-BR") // Adiciona data e hora
    };

    inputName.value = "";
    opiniao.value = "";

    boxFeedback.push(feedbackObj);

    // Salvar no localStorage
    salvarFeedbacks();

    // Adicionar novo feedback diretamente ao DOM
    adicionarComentario(feedbackObj);

    // Atualizar eventos de remoção
    adicionarEventosDeRemocao();
});

// Função de Adicionar comentários
const adicionarComentario = (feedbackObj) => {
    const feedback = document.querySelector('.box-feedback');
    const novoFeedback = document.createElement('div');
    novoFeedback.className = "feedback-list p-3 mx-2 my-3 d-flex flex-column";
    novoFeedback.innerHTML = `
        <div class="cliente d-flex align-items-center justify-content-between">
            <p class="autor">${feedbackObj.nome}</p>
            <p class="eliminar" title="Apagar comentário" style="cursor: pointer;">X</p>
        </div>
        <h3 class="align-self-start mb-4">
            &#10077 <span class="coment text-center">${feedbackObj.opiniao}</span> &#10078
        </h3>
        <p class="data">${feedbackObj.data}</p>
    `;
    feedback.prepend(novoFeedback); // Adiciona o mais recente no topo
};

// Função para salvar feedbacks no localStorage
const salvarFeedbacks = () => {
    localStorage.setItem('feedbacks', JSON.stringify(boxFeedback)); // Converte o array para string
};

// Função para adicionar eventos de remoção
const adicionarEventosDeRemocao = () => {
    const botoesApagar = document.querySelectorAll('.eliminar');
    botoesApagar.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            // Remover o feedback do DOM
            const pai = botao.parentElement.parentElement; // Localiza o elemento pai
            pai.remove();

            // Remover o feedback do array
            boxFeedback.splice(boxFeedback.length - index - 1, 1); // Remove o feedback correspondente

            // Atualizar o localStorage
            salvarFeedbacks();
        });
    });
};

// Aplicar caixa alta na primeira letra da frase
document.querySelectorAll(".nome, .txt-area").forEach(function (elemento) {
    elemento.addEventListener("input", function () {
        const valor = this.value;
        this.value = valor.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (letra) {
            return letra.toUpperCase();
        });
    });
});

// Usabilidade: Submeter com Enter
document.querySelectorAll(".nome, .txt-area").forEach((campo) => {
    campo.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Evita quebra de linha no textarea
            btnEnviar.click();
        }
    });
});
