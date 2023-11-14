function generateStarRating(rating) {
    const maxRating = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'flex items-center';

    for (let i = 0; i < fullStars; i++) {
        const starIcon = document.createElement('i');
        starIcon.className = 'fas fa-star text-yellow-500 mr-1';
        ratingContainer.appendChild(starIcon);
    }

    if (halfStar) {
        const halfStarIcon = document.createElement('i');
        halfStarIcon.className = 'fas fa-star-half-alt text-yellow-500 mr-1';
        ratingContainer.appendChild(halfStarIcon);
    }

    for (let i = 0; i < emptyStars; i++) {
        const emptyStarIcon = document.createElement('i');
        emptyStarIcon.className = 'far fa-star text-gray-400 mr-1';
        ratingContainer.appendChild(emptyStarIcon);
    }
    return ratingContainer;
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white';

    // Create and append movie details
    const movieDetails = document.createElement('div');
    movieDetails.className = 'px-6 py-4';

    // Add title
    const title = document.createElement('div');
    title.className = 'font-bold text-xl mb-2';
    title.textContent = movie.Title;
    movieDetails.appendChild(title);

    // Add genre
    const genreContainer = document.createElement('div');
    genreContainer.className = 'flex flex-wrap';

    movie.Genres.forEach(genre => {
        const genreItem = document.createElement('span');
        genreItem.className = 'bg-gray-300 text-gray-700 px-2 py-1 m-1 rounded';
        genreItem.textContent = genre;
        genreContainer.appendChild(genreItem);
    });
    // Add rating
    const rating = document.createElement('div');
    rating.className = 'text-gray-700 text-base';
    var starts = generateStarRating(movie.Rating)
    rating.appendChild(starts);

    // Add other details as needed
    
    movieCard.appendChild(movieDetails);
    movieDetails.appendChild(genreContainer);
    movieDetails.appendChild(rating);
    return movieCard;
}

function fetchMovies(){
    fetch("http://127.0.0.1:8000/api/v1/movies")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
        if(response.status == 'success'){
            movies = response.data
            const moviesSection = document.getElementById('moviesSection');
            // Clear existing content (optional)
            moviesSection.innerHTML = '';

            // Append each item to the resultContainer
            movies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                moviesSection.appendChild(movieCard);
            });
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    })
}

document.addEventListener('DOMContentLoaded', function() {
    // Call the function when the page is loaded
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    fetchMovies();

    loadMoreBtn.addEventListener('click', () => {
        var movieCard = document.getElementsByClassName("movie-card");
        var start = movieCard.length + 1
        var limit = start + 6
        fetch(`http://127.0.0.1:8000/api/v1/movies?start=${start}&limit=${limit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            if(response.status == 'success'){
                movies = response.data
                const moviesSection = document.getElementById('moviesSection');
                // Append each item to the resultContainer
                movies.forEach(movie => {
                    const movieCard = createMovieCard(movie);
                    moviesSection.appendChild(movieCard);
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        })
    })
});
