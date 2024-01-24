import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import Rickandmorty1 from './img/Rickandmorty1.jpg'
import Rickandmortyerr1 from './img/Rickandmortyerr1.png'

function App() {
  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId)
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [location, getLocation, hasError] = useFetch(url)



  useEffect(() => {
    if(inputValue !== '') {
      getLocation()
    }
    
  }, [inputValue])

  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputLocation.current.value.trim())
  }

  return (
    <div className='App'>
      <img className='App__img__header' src={Rickandmorty1} alt="" />
      <form className='App__form' onSubmit={handleSubmit}>
        <input className='App__input__location' ref={inputLocation} type="text" />
        <button className='App__button'>Search</button>
      </form>
      {
        hasError
          ? <figure className='Error__img__container'>
            <img className='Error__img' src={Rickandmortyerr1} />
          </figure>
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
