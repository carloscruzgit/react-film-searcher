import './App.css'
import {useRef} from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState } from 'react'


function App() {
  const [query, setQuery] = useState()
  const [error, setError] = useState()
  const { movies} = useMovies()
  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({query})
    /*we can also do this with the useRef
    console.log({query: inputRef.current.value})
    */
    //here, we could also use vanila javascript to get the value of the input with the event object
    /*const fields = new window.FormData(event.target)
    const filmQuery = fields.get('filmQuery')*/
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)

    if(newQuery === ''){
      setError('Please enter a movie title. Can\'t be empty')
      return
    }

    if (newQuery.length < 3){
      setError('Please enter a movie title. Must be at least 3 characters long')
      return
    }

    if(newQuery.match(/^\d+$]/)){
      setError('You can\'t enter numbers only. Please enter a movie title.')
      return
    }

    setError(null)
  }

  return (
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input value={query} onChange={handleChange} name='filmQuery' placeholder='Avengers, Interstellar..' />
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
