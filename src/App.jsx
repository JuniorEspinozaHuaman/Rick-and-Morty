import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'

function App() {
  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId)
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [location, getLocation, hasError] = useFetch(url)


  useEffect(() => {
    getLocation()
  }, [inputValue])

  const inputLocation = useRef()
  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value)
  }

  return (
    <div className='App'>
      <h1 className='App__title'>Rick and Morty</h1>
      <form className='App__form' onSubmit={handleSubmit}>
        <input className='App__input__location' ref={inputLocation} type="text" />
        <button className='App__button'>Search</button>
      </form>
      {
        hasError
          ? <h2>❌ Hey! you provide an id from 1 to 126 😥</h2>
          : (
            <>
              <div className='location__container'>
              <LocationCard 
                location={location}
              />
              </div>
              <div className='resident__container'>
                {
                  location?.residents.map(url => (
                    <ResidentCard
                      key={url}
                      url={url}
                    />
                  ))
                }
              </div>
            </>
          )
      }

    </div>
  )

}

export default App
