'use strict'

async function buscarCategorias() {
    try {
        const response = await fetch("https://www.freetogame.com/api/games")
        if (!response.ok) throw new Error('Erro ao buscar jogos')
        const jogos = await response.json()

        const generos = [...new Set(jogos.map(jogo => jogo.genre))]
        return generos
    } catch (error) {
        console.error('Erro ao buscar categorias:', error)
        return []
    }
}

function mostrarCategorias() {
    const categoriasMenu = document.getElementById('categorias-menu')
    const categoriasList = document.getElementById('categorias-list')

    buscarCategorias().then(generos => {
        if (generos.length == 0) {
            categoriasList.innerHTML = '<li>Sem categorias disponíveis</li>'
        } else {
            categoriasList.innerHTML = ''
            generos.forEach(genero => {
                const item = document.createElement('li')
                item.textContent = genero
                item.addEventListener('click', () => {
                    exibirJogos(genero)
                    categoriasMenu.style.display = 'none'
                })
                categoriasList.appendChild(item)
            })
        }
    })
    categoriasMenu.style.display = 'block'
}

document.addEventListener('click', (event) => {
    const categoriasMenu = document.getElementById('categorias-menu')
    if (!categoriasMenu.contains(event.target) && event.target.id != 'categorias') {
        categoriasMenu.style.display = 'none'
    }
})

document.getElementById('categorias').addEventListener('click', (event) => {
    event.preventDefault()
    mostrarCategorias()
})

function adicionarFavoritos(jogo) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
    if (!favoritos.some(fav => fav.id == jogo.id)) {
        favoritos.push({ ...jogo, status: 'Jogar Depois' })
        localStorage.setItem('favoritos', JSON.stringify(favoritos))
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
    nomeJogo.textContent = jogo.title;

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

    const botaoFavoritar = document.createElement('button')
    botaoFavoritar.textContent = 'Adicionar aos Favoritos'
    botaoFavoritar.classList.add('favoritar')
    botaoFavoritar.onclick = () => adicionarFavoritos(jogo)

    novoJogo.appendChild(imagemJogo)
    novoJogo.appendChild(nomeJogo)
    novoJogo.appendChild(descricaoJogo)
    novoJogo.appendChild(generoJogo)
    novoJogo.appendChild(botaoJogar)
    novoJogo.appendChild(botaoFavoritar)
    banner.appendChild(novoJogo)
}

async function buscarJogos() {
    try {
        const response = await fetch("https://www.freetogame.com/api/games")
        if (!response.ok) throw new Error('Erro ao buscar jogos')
        return await response.json()
    } catch (error) {
        console.error('Erro ao buscar jogos:', error)
        return []
    }
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
        ? jogos.filter(jogo => jogo.genre.toLowerCase() == filtro.toLowerCase())
        : jogos

    if (jogosFiltrados.length === 0) {
        banner.innerHTML = '<p>Nenhum jogo encontrado com esse filtro.</p>'
        return
    }

    jogosFiltrados.forEach(criarBanner)
}

document.getElementById('pesquisar').addEventListener('click', () => {
    const jogoInput = document.getElementById('jogo')
    const jogoID = jogoInput.value.trim()
    exibirJogos(jogoID)
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