'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const detalhesJogo = document.getElementById('detalhes-jogo')
    const jogo = JSON.parse(localStorage.getItem('jogoSelecionado'))

    if (!jogo) {
        detalhesJogo.innerHTML = "<p>Jogo não encontrado.</p>"
        return
    }

    detalhesJogo.innerHTML = `
        <img src="${jogo.thumbnail}" alt="${jogo.title}">
        <h2>${jogo.title}</h2>
        <p>Gênero: ${jogo.genre}</p>
        <p>Plataforma: ${jogo.platform}</p>
        <p>Desenvolvedor: ${jogo.developer}</p>
        <p>Publicadora: ${jogo.publisher}</p>
        <p>Data de Lançamento: ${jogo.release_date}</p>
        <a href="${jogo.game_url}" target="_blank">Jogar Agora</a>
    `
})