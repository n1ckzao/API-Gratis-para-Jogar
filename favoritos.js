'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const favoritosLista = document.getElementById('favoritos-lista')
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

    function renderizarFavoritos() {
        favoritosLista.innerHTML = ''
        favoritos.forEach(jogo => {
            const jogoElemento = document.createElement('div')
            jogoElemento.classList.add('game-horizontal')

            jogoElemento.innerHTML = `
                <img src="${jogo.thumbnail}" alt="${jogo.title}">
                <h2>${jogo.title}</h2>
                <p>Gênero: ${jogo.genre}</p>
                <a href="${jogo.game_url}" target="_blank">Jogar Agora</a>
                <select class="status">
                    <option ${jogo.status == 'Jogando no Momento' ? 'selected' : ''}>Jogando no Momento</option>
                    <option ${jogo.status == 'Jogar Depois' ? 'selected' : ''}>Jogar Depois</option>
                    <option ${jogo.status == 'Jogado' ? 'selected' : ''}>Jogado</option>
                    <option ${jogo.status == 'Completo' ? 'selected' : ''}>Completo</option>
                </select>
                <button class="remover" data-id="${jogo.id}">Remover</button>
            `
            favoritosLista.appendChild(jogoElemento)
        })
    }
    favoritosLista.addEventListener('click', (event) => {
        if (event.target.classList.contains('remover')) {
            const id = event.target.dataset.id
            favoritos = favoritos.filter(jogo => jogo.id != id)
            localStorage.setItem('favoritos', JSON.stringify(favoritos))
            renderizarFavoritos()
        }
    })
    favoritosLista.addEventListener('change', (event) => {
        if (event.target.classList.contains('status')) {
            const id = event.target.closest('div').querySelector('.remover').dataset.id
            const status = event.target.value
            const jogo = favoritos.find(jogo => jogo.id == id)
            if (jogo) {
                jogo.status = status;
                localStorage.setItem('favoritos', JSON.stringify(favoritos))
            }
        }
    })

    renderizarFavoritos()
})