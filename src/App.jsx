import './App.css'
import {useCallback, useEffect, useRef, useState} from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'


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
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading} = useMovies({search, sort})
  const inputRef = useRef()

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
    /*we can also do this with the useRef
    console.log({query: inputRef.current.value})
    */
    //here, we could also use vanila javascript to get the value of the input with the event object
    /*const fields = new window.FormData(event.target)
    const filmQuery = fields.get('filmQuery')*/
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} value={search} onChange={handleChange} name='query' placeholder='Avengers, Interstellar..' />
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}} className='error'>{error}</p>}
      </header>

    <main>
      {
        loading ? <p>Loading...</p> : <Movies movies={movies}/>    
      }
      
    </main>
    </div>
  )
}

export default App
