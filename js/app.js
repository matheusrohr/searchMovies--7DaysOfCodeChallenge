import { keyApi } from "./key.js";


async function getPopularMovies() {
  const responce = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${keyApi}&language=en-US&page=1`)
  const data = await responce.json();
  const setMovies = data.results;

  return setMovies
}

async function searchMovies() {
  const titleSearchMovies = document.querySelector("#buscamovie").value
  console.log(titleSearchMovies + "Estêvão")
  const responce = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&language=en-US&page=1&include_adult=false&query=${titleSearchMovies}`)
  const data = await responce.json();
  const searchMoviesdata = data.results;

  console.log(`Olá de novo ${titleSearchMovies}`)

  return searchMoviesdata
}

let favorito = (isFavorited) => {
  if (isFavorited) {
    return '/img/icon/true-heart.svg'
  } else {
    return '/img/icon/false-heart.svg'
  }
}

let CreateMoviePoster = (movies) => {

  let box = document.querySelector('div#box')

  let card = document.createElement('div')
  card.className = 'card'

  let iconTitle = document.createElement('div')
  iconTitle.className = 'icon-title'

  let divImg = document.createElement('div')
  let imgCapa = document.createElement('img')
  imgCapa.className = 'capa-movie'
  imgCapa.src = `https://image.tmdb.org/t/p/w500${movies.poster_path}`
  imgCapa.alt = movies.title

  let avali = document.createElement('div')
  avali.className = 'avali'

  let divTitulo = document.createElement('div')
  let pTitulo = document.createElement('p')
  let pTexto = document.createTextNode(`${movies.title} (${movies.release_date})`)

  let icon = document.createElement('div')
  icon.className = 'icon'

  let divIconeStar = document.createElement('div')
  let imgIconStar = document.createElement('img')
  imgIconStar.src = '/img/icon/star.svg'
  let labelIconStar = document.createElement('label')
  let textoLabelStar = document.createTextNode(movies.vote_average)

  let divIconeHeart = document.createElement('div')
  let imgIconHeart = document.createElement('img')
  imgIconHeart.src = favorito(movies.isFavorited)
  let labelIconHeart = document.createElement('label')
  let textoLabelHeart = document.createTextNode('Favoritar')

  let descricao = document.createElement('div')
  descricao.className = 'descricao'
  let spanDescricao = document.createElement('span')
  let textoSpan = document.createTextNode(movies.overview)

  divImg.appendChild(imgCapa)
  iconTitle.appendChild(divImg)
  pTitulo.appendChild(pTexto)
  divTitulo.appendChild(pTitulo)
  avali.appendChild(divTitulo)
  iconTitle.appendChild(avali)
  labelIconStar.appendChild(textoLabelStar)
  divIconeStar.appendChild(imgIconStar)
  divIconeStar.appendChild(labelIconStar)
  icon.appendChild(divIconeStar)
  labelIconHeart.appendChild(textoLabelHeart)
  divIconeHeart.appendChild(imgIconHeart)
  divIconeHeart.appendChild(labelIconHeart)
  icon.appendChild(divIconeHeart)
  avali.appendChild(icon)
  card.appendChild(iconTitle);
  spanDescricao.appendChild(textoSpan)
  descricao.appendChild(spanDescricao)
  card.appendChild(descricao)

  box.appendChild(card)

}

getPopularMovies().then(
  function (setMovie) { setMovie.forEach(setMovie => CreateMoviePoster(setMovie)) },

);

const searchMovieButton = document.querySelector("#search-icon")
const searchMovieInput = document.querySelector("#buscamovie")

searchMovieButton.addEventListener('click', function () {
  const cardBox = document.querySelector("#box");
  cardBox.innerHTML = ""

  searchMovies().then(
    function (searchMoviesdata) { searchMoviesdata.forEach(searchMoviesdata => CreateMoviePoster(searchMoviesdata)) },
  );
}
)

searchMovieInput.addEventListener("keydown", function (e) {

  if (e.keyCode == 13) {
    const cardBox = document.querySelector("#box");
    cardBox.innerHTML = ""

    searchMovies().then(
      function (searchMoviesdata) { searchMoviesdata.forEach(searchMoviesdata => CreateMoviePoster(searchMoviesdata)) },
    );
  }
}
)