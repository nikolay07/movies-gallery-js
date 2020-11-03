import { fetchMoviesList } from "./movies.gateway.js";
import { tableFilmsView, listFilmsView } from "./component/viewFilms.js";
import { favoriteFilm } from "./component/favoriteFilm.js";
import { showModalWindow } from "./modalWindow.js";

let moviesList = [];
let newList = [];

const movies = document.querySelector("#movies");
const favorite = document.querySelector(".favorite-list");
const genres = document.querySelector("#genre");
const grid = document.querySelector("#grid");
const list = document.querySelector("#list");

// render Movies
function renderMovies() {
  fetchMoviesList().then((data) => {
    let movieList = "";
    moviesList = [...moviesList, ...data];
    moviesList.forEach((movie) => {
      movieList += tableFilmsView(movie);
    });
    movies.innerHTML = movieList;
    addStarToGallery();
  });
}
window.onload = function () {
  localStorage.setItem("view", JSON.stringify("grid"));
  renderListFromLocal();
  renderMovies();
};

function deleteFromFavorite(id) {
  newList = newList.filter((movie) => movie.id !== id);
  localStorage.setItem("movies", JSON.stringify(newList));
}

function handleMovie(e) {
  const parent = e.target.closest(".movie");
  if (e.target.classList.contains("star")) {
    // handleFavorite
    e.target.classList.toggle("star-img-active");
    const title = parent.getElementsByClassName("movie__title")[0].innerText;

    const id = parent.dataset.id;

    if (e.target.classList.contains("star-img-active")) {
      addToFavorite([{ title, id }]);
      renderFavorite();
    }
    // remove if clicked again on star
    if (!e.target.classList.contains("star-img-active")) {
      deleteFromFavorite(id);
      renderFavorite();
    }
  }
  // show modal
  if (parent && !e.target.classList.contains("star")) {
    const id = parent.dataset.id;
    showModalWindow(id);
  }
}
movies.addEventListener("click", handleMovie);

function addToFavorite(movies) {
  newList = [...newList, ...movies];
  localStorage.setItem("movies", JSON.stringify(newList));
}

function renderFavorite() {
  const edited = newList.map((movie) => {
    return {
      movie: movie.title,
      id: movie.id,
    };
  });
  let favor = "";
  edited.forEach((edit) => {
    favor += favoriteFilm(edit);
  });
  favorite.innerHTML = favor;
}

function handleDelete(e) {
  if (e.target.className === "fav__delete") {
    const id = e.target.closest(".fav__item").dataset.id;
    removeFavoriteFilm(id);
    deleteFromFavorite(id);
    renderFavorite();
  }
}
favorite.addEventListener("click", handleDelete);

/*  manage stars */
function addStarToGallery() {
  findMatched().map((movie) => movie[0].classList.add("star-img-active"));
}

function removeFavoriteFilm(id) {
  //need fix
  const moviesAll = document.querySelectorAll(".movie");
  const matched = [...moviesAll].filter((movie) => movie.dataset.id == id);
  const star = matched[0].getElementsByClassName("star");
  star[0].classList.remove("star-img-active");
}

function findMatched() {
  const moviesAll = document.querySelectorAll(".movie");
  const movies = JSON.parse(localStorage.getItem("movies"));

  if (movies && movies.length > 0) {
    const locaclId = movies.map((movie) => movie.id);
    const matched = [...moviesAll].filter((movie) => locaclId.includes(movie.dataset.id));
    return matched.map((movie) => movie.getElementsByClassName("star"));
  } else {
    return [];
  }
}

function renderListFromLocal() {
  const movies = JSON.parse(localStorage.getItem("movies"));
  if (movies && movies.length > 0) {
    addToFavorite(movies);
    renderFavorite();
  }
}

// filter by genres
function handleGenres() {
  const genre = genres.value;
  const filtered = genre !== "" ? moviesList.filter((movie) => movie.genres.includes(genre)) : moviesList;
  let films = "";
  const typeView = JSON.parse(localStorage.getItem("view"));
  if (typeView === "grid") {
    filtered.forEach((movie) => {
      films += tableFilmsView(movie);
    });
  } else if (typeView === "list") {
    filtered.forEach((movie) => {
      films += listFilmsView(movie);
    });
  }
  localStorage.setItem("filtered", JSON.stringify(filtered));
  movies.innerHTML = films;
  addStarToGallery();
}
genres.addEventListener("change", handleGenres);

function changeView(value, func) {
  let films = "";
  const filmsFiltered = JSON.parse(localStorage.getItem("filtered"));
  filmsFiltered.forEach((movie) => {
    films += func(movie);
  });
  movies.innerHTML = films;
  localStorage.setItem("view", JSON.stringify(value));
  addStarToGallery();
}

// change gallery view
function handleRadios(e) {
  const values = e.target.value;
  if (values === "grid") {
    changeView(values, tableFilmsView);
  }
  if (values === "list") {
    changeView(values, listFilmsView);
  }
}

grid.addEventListener("click", handleRadios);
list.addEventListener("click", handleRadios);

export { deleteFromFavorite, addToFavorite, renderFavorite, addStarToGallery, removeFavoriteFilm };
