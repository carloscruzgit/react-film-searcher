const API_KEY = '4287ad07'

export const searchMovies = async ({search}) => {

    if(search === '') return null
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        const movies = json.Search
        return movies.map(movie => ({
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster,
            id: movie.imdbID
        }))
    } catch(e){
        console.error('Error fetching movies')
    }
    
}