import './App.css'
import {useEffect, useRef, useState} from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'


function useSearch (){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === '' //if the search is empty, it will be true, so we return
      return
    }
    if(search === ''){
      setError('Please enter a movie title. Can\'t be empty')
      return
    }

    if (search.length < 3){
      setError('Please enter a movie title. Must be at least 3 characters long')
      return
    }

    if(search.match(/^\d+$]/)){
      setError('You can\'t enter numbers only. Please enter a movie title.')
      return
    }

    setError(null)
  }, [search])

  return {search, updateSearch, error}
}


function App() {
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies} = useMovies({search})
  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
    /*we can also do this with the useRef
    console.log({query: inputRef.current.value})
    */
    //here, we could also use vanila javascript to get the value of the input with the event object
    /*const fields = new window.FormData(event.target)
    const filmQuery = fields.get('filmQuery')*/
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input value={search} onChange={handleChange} name='filmQuery' placeholder='Avengers, Interstellar..' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}} className='error'>{error}</p>}
      </header>

    <main>
      <Movies movies={movies}/>    
    </main>
    </div>
  )
}

export default App
