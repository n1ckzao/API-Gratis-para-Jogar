'use strict'

async function buscarJogos() {
    const url = `https://www.freetogame.com/api/games`
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Erro ao buscar jogos')
        return await response.json()
    } catch (error) {
        console.error('Erro ao buscar jogos:', error)
        return []
    }
}

function criarBanner(jogo) {
    const banner = document.getElementById('banner')
    
    const novoJogo = document.createElement('div')
    novoJogo.classList.add('game')

    const imagemJogo = document.createElement('img')
    imagemJogo.src = jogo.thumbnail
    imagemJogo.alt = `Imagem do jogo ${jogo.title}`

    const nomeJogo = document.createElement('h2')
    nomeJogo.textContent = jogo.title

    const descricaoJogo = document.createElement('p')
    descricaoJogo.textContent = jogo.short_description
    descricaoJogo.style.color = 'gray'

    const generoJogo = document.createElement('p')
    generoJogo.textContent = `Gênero: ${jogo.genre}`
    generoJogo.style.color = 'blue'

    const botaoJogar = document.createElement('a')
    botaoJogar.href = jogo.game_url
    botaoJogar.target = "_blank"
    botaoJogar.textContent = 'Jogar Agora'
    botaoJogar.classList.add('botao-jogar')

    novoJogo.appendChild(imagemJogo)
    novoJogo.appendChild(nomeJogo)
    novoJogo.appendChild(descricaoJogo)
    novoJogo.appendChild(generoJogo)
    novoJogo.appendChild(botaoJogar)
    banner.appendChild(novoJogo)
}

async function exibirJogos(filtro = '') {
    const banner = document.getElementById('banner')
    banner.innerHTML = '<p>Carregando...</p>'

    const jogos = await buscarJogos()
    banner.innerHTML = ''

    if (!jogos || jogos.length === 0) {
        banner.innerHTML = '<p>Erro ao carregar jogos ou nenhum jogo disponível.</p>'
        return
    }

    const jogosFiltrados = filtro
        ? jogos.filter(jogo => jogo.title.toLowerCase().includes(filtro.toLowerCase()))
        : jogos

    if (jogosFiltrados.length === 0) {
        banner.innerHTML = '<p>Nenhum jogo encontrado.</p>'
        return
    }

    jogosFiltrados.forEach(criarBanner)
}

document.getElementById('pesquisar').addEventListener('click', () => {
    const jogoInput = document.getElementById('jogo')
    const jogo = jogoInput.value.trim()
    exibirJogos(jogo)
    jogoInput.value = ''
})

window.addEventListener('load', () => {
    exibirJogos()
})



// 'use strict'

// const imagens = [
//     {nome: 'Call Of Duty: Warzone', imagem: 'https://www.freetogame.com/g/452/thumbnail.jpg' , descricao: 'Um battle royale independente e gratuito com modos acessíveis via Call of Duty: Modern Warfare.'},
//     {nome: 'Marvel Rivals', imagem: 'https://www.freetogame.com/g/599/thumbnail.jpg' , descricao: 'Um jogo de tiro em equipe de super-heróis gratuito da NetEase.'},
//     {nome: 'Overwatch 2', imagem: 'https://www.freetogame.com/g/540/thumbnail.jpg' , descricao: 'Um jogo de tiro em primeira pessoa focado em heróis da Blizzard Entertainment. '},
//     {nome: 'Enlisted', imagem: 'https://www.freetogame.com/g/508/thumbnail.jpg' , descricao: 'Prepare-se para comandar seu próprio esquadrão militar da Segunda Guerra Mundial no jogo de tiro baseado em esquadrão MMO da Gaijin e da Darkflow Software, Enlisted.'},
//     {nome: 'Fall Guys', imagem: 'https://www.freetogame.com/g/523/thumbnail.jpg' , descricao: 'Jogue o jogo multijogador massivo party royale mais competitivo com feijões de graça em diversas plataformas.'},
//     {nome: 'Crossout', imagem: 'https://www.freetogame.com/g/5/thumbnail.jpg' , descricao: 'Um jogo MMO de combate veicular pós-apocalíptico!'},
// ]

// function criarBanner(jogo) {
//     const banner = document.getElementById('banner')
//     const novoJogo = document.createElement('div')
//     novoJogo.classList.add('game')

//     const novaImagem = document.createElement('img')
//     novaImagem.src = jogo.imagem
//     novaImagem.alt = jogo.nome

//     const nomeJogo = document.createElement('h2')
//     nomeJogo.textContent = jogo.nome

//     const descricaoJogo = document.createElement('p')
//     descricaoJogo.textContent = jogo.descricao
//     descricaoJogo.style.color = 'gray'

//     novoJogo.appendChild(novaImagem)
//     novoJogo.appendChild(nomeJogo)
//     novoJogo.appendChild(descricaoJogo)
//     banner.appendChild(novoJogo)
// }
// imagens.forEach(criarBanner)