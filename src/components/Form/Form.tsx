import {useState, useEffect} from "react"
import Data from "./Data"
import "./Form.css"
import Mostrar from "../../mostrar"

const loginData = {
    email: "josue@gmail.com",
    password: "12345"
}

function Form(){

    const [email, setemail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showData, setShowData] = useState<boolean>(false)
    const [loginAttempt, setLoginAttempt] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if(email.includes("chuy")){
            alert("No registro gays")
        }
    }, [email, password])

    const handleInputChange = (stateUpdate) =>{
        return (event) =>{
            stateUpdate(event.target.value)
        }
    }

    const handleOnClick = () =>{
        if(showData){
            setemail("")
            setPassword("")
            setLoginAttempt(false)
            setIsLoggedIn(false)
        } else {
            setLoginAttempt(true)
            if(email === loginData.email && password === loginData.password){
                alert("¡Datos encontrados!")
                setIsLoggedIn(true)
            } else {
                alert("¡Datos incorrectos! Por favor, intenta de nuevo.")
            }
        }
        setShowData(!showData)
    }

    if (isLoggedIn) {
        return <Mostrar />
    }

    return(
        <>
            <Data email={email} password={password} showData={showData}/> 
            <section className="formContainer">
                <span className="inputContainer">
                    <label htmlFor="email">Correo:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setemail)}></input>
                </span>
                <span>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)}></input>
                </span>
                <button onClick={handleOnClick}>
                    {showData ? "Ocultar datos" : "Mostrar datos"}
                </button>
                {loginAttempt && (email !== loginData.email || password !== loginData.password) && (
                    <p style={{ color: 'red' }}>¡Datos incorrectos! Por favor, intenta de nuevo.</p>
                )}
            </section>
        </>       
    )
}

export default Form