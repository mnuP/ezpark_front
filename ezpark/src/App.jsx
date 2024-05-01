import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddParqueadero from './components/espacio/AddParqueadero'
import EditParqueadero from './components/espacio/EditParqueadero'
import ListParqueaderos from './components/espacio/ListParqueaderos'
import DeleteParqueadero from './components/espacio/DeleteParqueadero'

function App() {
  const [count, setCount] = useState(0)

  return <>
    <AddParqueadero/>
    <EditParqueadero/>
    <DeleteParqueadero/>
    <ListParqueaderos/>
  </>
}

export default App
