const tableFilmsView = ({ id, img, name, year }) => {
  return `
<div class="movie grid-view" data-id=${id}>
  <div class="star star-grid star-img"></div>
    <div class="movie__image-block">
      <img src=${img} alt="poster" class="movie__image" />
    </div> 
    <div class="movie__description">
    <div class="movie__title">${name}</div>
    <div class="movie__year">${year}</div>
  </div>
</div>`;
};

const listFilmsView = ({ id, img, name, year, description, genres }) => {
  const listGenre = genres.map((genre) => `<li class="list-view__genre">${genre}</li>`);
  return `
<div class="movie list-view" data-id=${id}>
    <div class="star star-list star-img"></div>
    <div class="movie__image-block"><img src=${img} alt="poster" class="movie__image" /></div>    
    <div class="list-view__block">
      <div class="movie__description">
        <span class="movie__title">${name}</span>
        <span class="movie__year">${year}</span>
      </div>
      <p>${description}</p>
      <ul class="list-view__genres">${listGenre}</ul>
    </div>
</div>`;
};
const favoriteFilm = ({ id, movie }) => `
  <li class="fav__item" data-id=${id}>
    <div class="fav">
    <p class="fav__title">${movie}</p>
    <span class="fav__delete">X</span>
  </div>
</li>
`;

export { listFilmsView, tableFilmsView, favoriteFilm };
