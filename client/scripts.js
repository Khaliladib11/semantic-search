



document.addEventListener('DOMContentLoaded', function() {
    // Call the function when the page is loaded
    
    fetchMovies();
});

function fetchMovies(){
    fetch("http://127.0.0.1:8000/api/v1/movies")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
        console.log(response.status)
        if(response.status == 'success'){
            movies = response.data
            const moviesSection = document.getElementById('moviesSection');
            // Clear existing content (optional)
            moviesSection.innerHTML = '';

            // Append each item to the resultContainer
            movies.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = movie.id;  // Assuming the item has a "title" property
                moviesSection.appendChild(listItem);
            });
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    })
}