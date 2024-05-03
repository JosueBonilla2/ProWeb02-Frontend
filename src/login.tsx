import { useState } from 'react'
import Header from './components/Header'
import Form from './components/Form/Form'
import './login.css'

function LogIn() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Header title= "FORMULARIO LOGIN" />
      <Form />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
    </main>
  )
}

export default LogIn
