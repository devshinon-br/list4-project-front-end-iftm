document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '1dc3c38cda57f4fa45498e3d9f598773';
    const moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR&page=1`;

    const fetchGenres = () => {
        return fetch(genresUrl)
            .then(response => response.json())
            .then(data => {
                const genresMap = new Map();
                data.genres.forEach(genre => {
                    genresMap.set(genre.id, genre.name);
                });
                return genresMap;
            })
            .catch(error => {
                console.error('Erro ao carregar gêneros:', error);
            });
    }

    const fetchAndDisplayMovies = () => {
        fetch(moviesUrl)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                const moviesContainer = document.getElementById('movies-container');

                fetchGenres().then(genresMap => {
                    movies.forEach(movie => {
                        const movieElement = document.createElement('div');
                        movieElement.classList.add('movie');

                        const title = document.createElement('h2');
                        title.textContent = movie.title;

                        const voteAverage = document.createElement('p');
                        voteAverage.innerHTML = `<i class="fas fa-star"></i>${movie.vote_average} (${movie.vote_count} votos)`;

                        const genreNames = movie.genre_ids.map(id => {
                            const genreElement = document.createElement('p');
                            genreElement.textContent = genresMap.get(id); 
                            
                            return genreElement;
                        });
                        
                        const genres = document.createElement('div');
                        genres.classList.add('genre');
                        genreNames.forEach(genreElement => {
                            genres.appendChild(genreElement); 
                        });

                        const posterPath = movie.poster_path;
                        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                        const poster = document.createElement('img');
                        poster.src = posterUrl;
                        poster.alt = movie.title;

                        movieElement.appendChild(title);
                        movieElement.appendChild(poster);
                        movieElement.appendChild(voteAverage);
                        movieElement.appendChild(genres);

                        moviesContainer.appendChild(movieElement);
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao carregar filmes:', error);
            });
    }

    fetchAndDisplayMovies();
});
