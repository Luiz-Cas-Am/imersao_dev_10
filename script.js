let cardContainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("#input-busca");
let dados = [];

// Carrega os dados do JSON e renderiza os cards iniciais quando a página carrega.
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
});

// Adiciona um evento para buscar enquanto o usuário digita.
inputBusca.addEventListener('keyup', iniciarBusca);

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(livro => {
        return livro.nome.toLowerCase().includes(termoBusca) ||
            livro.autor.toLowerCase().includes(termoBusca) ||
            livro.descricao.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <img src="${dado.imagem}" alt="Capa do livro ${dado.nome}">
            <div class="card-info">
                <h2>${dado.nome}</h2>
                <p>Autor: ${dado.autor}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}