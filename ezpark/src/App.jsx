import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddParqueadero from './components/espacio/AddParqueadero'

function App() {
  const [count, setCount] = useState(0)

  return <>
    <AddParqueadero/>
  </>
}

export default App
