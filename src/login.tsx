import { useState } from 'react'
import Form from './components/Form/Form'
import './login.css'
import Prueba from './components/Form/Prueba'

function LogIn() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Form />
    </main>
  )
}

export default LogIn
