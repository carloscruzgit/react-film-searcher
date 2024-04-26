export function ListOfMovies({ movies }) {
  return (
    <ul className='movies-list'>
      {
        movies.map(movie => (
          <li key={movie.id} className='movie'>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <img src={movie.image} alt={movie.title} />
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