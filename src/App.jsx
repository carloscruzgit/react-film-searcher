import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'

import { Movies } from './components/Movies'



function App() {
  const movies = responseMovies.Search
  return (
    <div className='page'>
      <header>
        <form className='form'>
          <input placeholder='Avengers, Interstellar..' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

    <main>
      <Movies movies={movies}/>    
    </main>
    </div>
  )
}

export default App
