const baseUrl = "https://my-json-server.typicode.com/moviedb-tech/movies/list";

export const fetchMoviesList = () => {
  return fetch(baseUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Loading data failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMovie = (id) => {
  return fetch(`${baseUrl}/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Loading data failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
