const favoriteFilm = ({ id, movie }) => `
  <li class="fav__item" data-id=${id}>
    <div class="fav">
    <p class="fav__title">${movie}</p>
    <span class="fav__delete">X</span>
  </div>
</li>
`;

export { favoriteFilm };
