// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.

const movies = require("./data");

// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map((movie) => movie.director);
  return directors;
}

// console.log(getAllDirectors(movies));

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const steveSpielbergMovies = moviesArray.filter((movie) => movie.director === 'Steven Spielberg').filter((movie) => movie.genre.includes("Drama"));
  return steveSpielbergMovies.length === 0 ? 0 : steveSpielbergMovies.length;
}
// console.log(howManyMovies(movies));

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length == 0) return 0;
  const scores = moviesArray.map((movie) => movie.hasOwnProperty('score') ? (movie.score === '' ? 0 : movie.score) : 0);
  const sum = scores.reduce((sum, score) => sum + score, 0);
  const average = sum / scores.length;
  return parseFloat(average.toFixed(2));
}

console.log(scoresAverage(movies));

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) => movie.genre.includes("Drama"));
  if (dramaMovies.length === 0) {
    return 0;
  }
  const scores = dramaMovies.map(movie => movie.score);
  const sum = scores.reduce((sum, score) => sum + score, 0);
  const average = sum / scores.length;
  return parseFloat(average.toFixed(2));

}

console.log(dramaMoviesScore(movies));

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const copyArray = JSON.parse(JSON.stringify(moviesArray)); // make a copy of the array to avoid modifying the original array
  return copyArray.sort((a, b) => a.year === b.year ? (a.title.localeCompare(b.title)) : (a.year - b.year));
}

// console.log(orderByYear(movies));

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const copyArray = JSON.parse(JSON.stringify(moviesArray));
  const sortedMovies = copyArray.sort((a, b) => a.title.localeCompare(b.title));
  return sortedMovies.slice(0, 20).map(movie => movie.title);
}

// console.log(orderAlphabetically(movies));

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const duration = moviesArray.map((movie) => {
    const [hours, minutes] = movie.duration.split(' ');
    const hour = parseInt(hours) || 0;
    const minute = parseInt(minutes) || 0;
    const totalMinutes = hour * 60 + minute;
    return {
      ...movie,
      duration: totalMinutes,
    };
  });
  return duration;

}
turnHoursToMinutes(movies);

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;
  let yearArray = moviesArray.map((movie) => movie.year);
  let uniqueYears = yearArray.filter(
    (year, i, self) => self.indexOf(year) === i
  );
  let result = { year: 0, avgScore: 0 };
  let total = 0;
  let moviesCount = 0;
  let avg = 0;
  for (let i = 0; i < uniqueYears.length; i++) {
    for (let j = 0; j < moviesArray.length; j++) {
      if (moviesArray[j].year === uniqueYears[i]) {
        total += moviesArray[j].score;
        moviesCount++;
      }
    }
    avg = total / moviesCount;
    if (avg.toFixed(1) > result.avgScore) {
      result.year = uniqueYears[i];
      result.avgScore = avg.toFixed(1);
    } else if (
      avg.toFixed(1) === result.avgScore &&
      uniqueYears[i] < result.year
    ) {
      result.year = uniqueYears[i];
    }
    total = moviesCount = 0;
  }
  return `The best year was ${result.year} with an average score of ${Number(
    result.avgScore
  )}`;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
