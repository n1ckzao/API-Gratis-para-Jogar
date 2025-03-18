'use strict'

async function pesquisarJogos(game) {
    try {
        const url = game ? `https://www.freetogame.com/api/games?title=${game}` : 'https://www.freetogame.com/api/games'
        const response = await fetch(url)
        if (!response.ok) throw new Error('ERRO')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch error:', error)
        alert('Falha ao procurar o jogo')
        return []
    }
}

function criarBanner(jogo) {
    const banner = document.getElementById('banner')
    const novoJogo = document.createElement('div')
    novoJogo.classList.add('game')

    const novaImagem = document.createElement('img')
    novaImagem.src = jogo.thumbnail
    novaImagem.alt = jogo.title

    const nomeJogo = document.createElement('h2')
    nomeJogo.textContent = jogo.title

    const descricaoJogo = document.createElement('p')
    descricaoJogo.textContent = jogo.short_description
    descricaoJogo.style.color = 'gray'

    const generoJogo = document.createElement('p')
    generoJogo.textContent = `Gênero: ${jogo.genre}`
    generoJogo.style.color = 'blue'

    novoJogo.appendChild(novaImagem)
    novoJogo.appendChild(nomeJogo)
    novoJogo.appendChild(descricaoJogo)
    novoJogo.appendChild(generoJogo)
    banner.appendChild(novoJogo)
}

async function exibirJogos(game) {
    const banner = document.getElementById('banner')
    banner.innerHTML = '<p>Carregando...</p>'
    const jogos = await pesquisarJogos(game)
    banner.innerHTML = ''
    jogos.forEach(criarBanner)
}

document.getElementById('pesquisar').addEventListener('click', () => {
    const jogoInput = document.getElementById('jogo')
    const jogo = jogoInput.value
    exibirJogos(jogo)
    jogoInput.value = ''
})

exibirJogos()