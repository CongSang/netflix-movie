export const addMovieHistory = (movie) => {
  let historyMovie = localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history"))
    : []

  const existMovie = historyMovie.some((p) => p.id === movie.id)

  if (existMovie) {
    historyMovie = historyMovie.filter((item) => item.id !== movie.id)
  }

  historyMovie.push(movie)
  localStorage.setItem("history", JSON.stringify(historyMovie))
}

export const getMovieHistory = () => {
  const historyMovie = localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history"))
    : []

  const result = historyMovie.sort((a, b) => b.viewAt - a.viewAt)

  return result
}