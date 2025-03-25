'use strict'

async function buscarCategorias() {
    try {
        const response = await fetch(proxy + url)
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
        categoriasList.innerHTML = ''

        if (generos.length == 0) {
            categoriasList.innerHTML = '<li>Sem categorias disponíveis</li>'
        } else {
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

        categoriasMenu.style.display = 'block'
    })
}
document.addEventListener('click', (event) => {
    const categoriasMenu = document.getElementById('categorias-menu')
    if (!categoriasMenu.contains(event.target) && event.target.id !== 'categorias') {
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
    nomeJogo.textContent = jogo.title

    const descricaoJogo = document.createElement('p')
    descricaoJogo.textContent = jogo.short_description
    descricaoJogo.style.color = 'white'

    const generoJogo = document.createElement('p')
    generoJogo.textContent = `Gênero: ${jogo.genre}`
    generoJogo.style.color = 'gray'

    const botaoJogar = document.createElement('button')
    botaoJogar.href = jogo.game_url
    botaoJogar.target = "_blank"
    botaoJogar.textContent = 'Jogar Agora'
    botaoJogar.classList.add('botao-jogar')

    const botaoFavoritar = document.createElement('button')
    botaoFavoritar.textContent = 'Adicionar aos Favoritos'
    botaoFavoritar.classList.add('favoritar')
    botaoFavoritar.onclick = () => adicionarFavoritos(jogo)

    novoJogo.addEventListener('click', () => {
        localStorage.setItem('jogoSelecionado', JSON.stringify(jogo))
        window.location.href = 'informacoes.html'
    })

    novoJogo.appendChild(imagemJogo)
    novoJogo.appendChild(nomeJogo)
    novoJogo.appendChild(descricaoJogo)
    novoJogo.appendChild(generoJogo)
    novoJogo.appendChild(botaoJogar)
    novoJogo.appendChild(botaoFavoritar)
    banner.appendChild(novoJogo)
}

const proxy = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://www.freetogame.com/api/games'

async function buscarJogos() {
    try {
        const response = await fetch(proxy + url)
    if (!response.ok) throw new Error('Erro ao buscar jogos: ' + response.statusText)
        return await response.json()
    } catch (error) {
        console.error('Erro ao buscar jogos:', error)
        return []
    }
}

async function exibirJogos(filtro = '', nome = '') {
    const banner = document.getElementById('banner')
    banner.innerHTML = '<p>Carregando...</p>'

    const jogos = await buscarJogos()
    banner.innerHTML = ''

    if (!jogos || jogos.length == 0) {
        banner.innerHTML = '<p>Erro ao carregar jogos ou nenhum jogo disponível.</p>'
        return
    }

    const jogosFiltrados = jogos.filter(jogo => {
        const nomeMatch = nome ? jogo.title.toLowerCase().includes(nome.toLowerCase()) : true
        const generoMatch = filtro ? jogo.genre.toLowerCase() == filtro.toLowerCase() : true
        return nomeMatch && generoMatch
    })

    if (jogosFiltrados.length == 0) {
        banner.innerHTML = '<p>Nenhum jogo encontrado com esse nome ou filtro.</p>'
        return
    }

    jogosFiltrados.forEach(criarBanner)
}

document.getElementById('pesquisar').addEventListener('click', () => {
    const jogoInput = document.getElementById('jogo')
    const nomeJogo = jogoInput.value.trim()
    exibirJogos('', nomeJogo)
    jogoInput.value = ''
})
document.getElementById('jogo').addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault()
        document.getElementById('pesquisar').click()
    }
})

window.addEventListener('load', () => {
    exibirJogos()
})