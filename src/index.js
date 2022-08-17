// Not sure if i messed up this iniital commit, but i have tried to at least submit what has really exercised the necessary components of using git commands in the terminal as well as DOM manipulation with fetch princples.

// Thanx!! (: 


// global constants for functions 
const movieList = document.querySelector("#movie-list");
const movieInfo = document.querySelector("#movie-info");
const movieTitle = document.querySelector("#title");
const movieYear = document.querySelector("#year-released")
const movieDescription = document.querySelector("#description");
const movieImage = document.querySelector("#detail-image");

let watchButton = document.querySelector("#watched");

const bloodForm = document.querySelector("#blood-form");
const dropAmount = document.querySelector("#amount");
const bloodAmount = document.querySelector("#blood-amount");

let movieData;
let currentMovie;
let watchStatus;
let id;

// fetch data and add images to movie list element

fetch  ("http://localhost:3000/movies")
.then(response => response.json())
.then(data => {
    movieData = data;
    movieData.forEach(movies => {
        const img = document.createElement("img");
        img.src = movies.image;
        movieList.append(img);


// upon clicking, load image, title, year, description, blood amount, and watched status
        img.addEventListener("click", e => {
            showMovies(movies);
        })
    })
// as page loads, load content for first movie in dataset
    showMovies(data[0]);
    buttonClick();
    bloodCount();

})


// other movie data display
function showMovies(movies) {
    let watchStatus = movies.watched ? "watched" : "unwatched";
    currentMovie = movies
    movieTitle.textContent = movies.title;
    movieDescription.textContent = movies.description;
    movieImage.src = movies.image;
    movieYear.textContent = movies.release_year;
    dropAmount.textContent = movies.blood_amount;
    watchButton.textContent = currentMovie.watched ? "watched" : "unwatched";
    }


// watched and unwatched button functionality (watched = true : unwatched = false)
    function buttonClick() {
    watchButton.addEventListener("click", () => {
    currentMovie.watched = !currentMovie.watched;
    watchButton.textContent = currentMovie.watched ? "watched" : "unwatched";

    })}
    
    

// add more blood drops with click events, amount staying constant
function bloodCount() {
    bloodForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (parseFloat(bloodAmount.value) > 0 || (parseFloat(bloodAmount.value) < 0)) {
            currentMovie.blood_amount += parseFloat(bloodAmount.value);
            showMovies(currentMovie);
        }

            e.target.reset();
            

        })}
