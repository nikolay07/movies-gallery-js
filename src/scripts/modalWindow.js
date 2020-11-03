import { getMovie } from "./movies.gateway.js";
import modalWindowView from "./component/modalWindowView.js";
import { addToFavorite, deleteFromFavorite, renderFavorite, addStarToGallery, removeFavoriteFilm } from "./index.js";

const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
let movie = {};

function showModalWindow(id) {
  getMovie(id).then((data) => {
    movie = {
      title: data.name,
      id: `${data.id}`,
    };
    modal.innerHTML = modalWindowView(data);
    modalOverlay.classList.add("modal-visible");
    checkInFavorite(id);
  });
  window.addEventListener("keydown", handleCloseModalEsc);
}

function toggleFavorite(e) {
  if (e.target.classList.contains("modal__star")) {
    e.target.classList.toggle("star-img-active");
    // add to favorite if clicked again on star
    if (e.target.classList.contains("star-img-active")) {
      addToFavorite([movie]);
      renderFavorite();
      addStarToGallery();
    }
    // remove from favorite if clicked again on star
    if (!e.target.classList.contains("star-img-active")) {
      deleteFromFavorite(movie.id);
      removeFavoriteFilm(movie.id);
      renderFavorite();
    }
  }
}
// handle modal events
function handleModal(e) {
  toggleFavorite(e);
  handleCloseModalClick(e);
}
modalOverlay.addEventListener("click", handleModal);

// close modal window by click X
function handleCloseModalClick(e) {
  if (e.target.classList.contains("modal__close") || e.target === e.currentTarget) {
    closeModalWindow();
  }
}
// close modal window by Esc
function handleCloseModalEsc(e) {
  if (e.code === "Escape") {
    closeModalWindow();
  }
}
function closeModalWindow() {
  modalOverlay.classList.remove("modal-visible");
  window.removeEventListener("keydown", handleCloseModalEsc);
}

// check if already added to fav
function checkInFavorite(id) {
  const movies = JSON.parse(localStorage.getItem("movies"));
  if (movies && movies.length > 0) {
    const modalStar = document.querySelector(".modal__star");
    const locaclId = movies.map((movie) => movie.id);
    const matched = locaclId.includes(id);
    if (matched) {
      modalStar.classList.add("star-img-active");
    }
  }
}
export { showModalWindow };
