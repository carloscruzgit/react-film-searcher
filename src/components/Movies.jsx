export function ListOfMovies({ movies }) {
  return (
    <ul className='movies-list'>
      {
        movies.map(movie => (
          <li key={movie.id} className='movie'>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.image} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

export function NoMoviesResults() {
  return (
    <p>No results found</p>

  )
}

export function Movies({movies}) {
    const hasMovies = movies?.length > 0
    return (
        hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
    )
}