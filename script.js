'use strict'

async function pesquisarJogos(game) {
    const url =`https://www.freetogame.com/api/games?title=${game}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarBanner(jogo) {
    const banner = document.getElementById('banner')
    const novoJogo = document.createElement('div')
    novoJogo.classList.add('game')

    const nomeJogo = document.createElement('h2')
    nomeJogo.textContent = jogo.title

    const descricaoJogo = document.createElement('p')
    descricaoJogo.textContent = jogo.short_description
    descricaoJogo.style.color = 'gray'

    const generoJogo = document.createElement('p')
    generoJogo.textContent = `Gênero: ${jogo.genre}`
    generoJogo.style.color = 'blue'

    novoJogo.appendChild(nomeJogo)
    novoJogo.appendChild(descricaoJogo)
    novoJogo.appendChild(generoJogo)
    banner.appendChild(novoJogo)
}

async function exibirJogos(game) {
    const banner = document.getElementById('banner')
    const jogos = await pesquisarJogos(game)
    banner.innerHTML = ''
    jogos.forEach(criarBanner)
}

document.getElementById('pesquisar').addEventListener('click', () => {
    const jogoInput = document.getElementById('jogo')
    const jogo = jogoInput.value
    exibirJogos(jogo)
    jogoInput.value = ''
});

exibirJogos()



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