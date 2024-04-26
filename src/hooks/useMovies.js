import responseMovies from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
export function useMovies() {
    const movies = responseMovies.Search
    const mappedMovies = movies?.map(movie => ({
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
        id: movie.imdbID
    }))

return { movies: mappedMovies }
}