const modalWindowView = ({ img, name, description, year, genres, director, starring }) => {
  let listGenre = "";
  let listStarring = "";
  genres.forEach((genre) => (listGenre += `<li class="modal__genre">${genre}</li>`));
  starring.forEach((star) => (listStarring += `${star},`));
  return `
  <div class="modal__data">
    <div class="modal__main">
      <div class="modal__close">X</div>
      <img src=${img} alt="poster" class="modal__image" />
      <div class="modal__description">
        <h2 class="modal__title">${name}</h2>
        <p class="modal__text">${description}</p>
      </div>
    </div>
    <div class="modal__info">
      <div class="star modal__star star-img"></div>
      <div class="modal__year"><b>${year}</b></div>
    </div>
    <div class="modal__secondary">
      <ul class="modal__genres">${listGenre}</ul>
      <div class="modal__emp">
        <p>Director: <b>${director}</b></p>
        <p>Starring: ${listStarring}</p>     
      </div>
    </div>
  </div>`;
};
export default modalWindowView;
