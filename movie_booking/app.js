const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');;
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');


populateUI();

let ticketPrice = +selectedMovie.value;

// seat selection
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// updaate count and total price of seats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

updateSelectedCount();

// save selected movie inex and Price
function setMovieData(movieIndex, moviePrice) {
  localstorage.setItem('selectedMovieIndex', movieIndex);
  localstorage.setItem('selectedMoviePrice', moviePrice);
}

// movie selection 
selectedMovie.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

// populaate UI and get data from localStorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {

      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    selectedMovie.selectedIndex = selectedMovieIndex;
  }
}