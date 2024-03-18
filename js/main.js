document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '1dc3c38cda57f4fa45498e3d9f598773';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            const moviesContainer = document.getElementById('movies-container');

            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');

                const title = document.createElement('h2');
                title.textContent = movie.title;

                const posterPath = movie.poster_path;
                const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                const poster = document.createElement('img');
                poster.src = posterUrl;
                poster.alt = movie.title;

                movieElement.appendChild(title);
                movieElement.appendChild(poster);

                moviesContainer.appendChild(movieElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar filmes:', error);
        });
});
