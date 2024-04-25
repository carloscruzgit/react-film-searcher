export function ListOfMovies({ movies }) {
  return (
    <ul className='movies-list'>
      {
        movies.map(movie => (
          <li key={movie.imdbID} className='movie'>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
            <hr />
          </li>
        ))
      }
    </ul>
  )
}

export function NoMoviesResults() {
  return (
    <div className='empty'>
      <img src={reactLogo} alt='React Logo' />
      <h2>No se encontraron resultados</h2>
    </div>
  )
}

export function Movies({movies}) {
    const hasMovies = movies?.length > 0
    return (
        hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
    )
}