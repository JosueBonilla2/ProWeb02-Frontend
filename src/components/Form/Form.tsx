import {useState, useEffect} from "react"
import Data from "./Data"
import "./Form.css"
import Mostrar from "../../mostrar"

const API_URL = "http://localhost:3000/"

const loginData = {
    email: "josue@gmail.com",
    password: "12345"
}

function Form(){

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showData, setShowData] = useState<boolean>(false)
    const [loginAttempt, setLoginAttempt] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)


    useEffect(() => {
        if(email.includes("chuy")){
            alert("No registro gays")
        }
    }, [email, password])

    const handleInputChange = (stateUpdate: (newState: string)=>void ) =>{
        return (event: any) =>{
            stateUpdate(event.target.value)
        }
    }

    const handleOnClick = () =>{
        
        logIn({email, password})

        if(showData){
            setEmail("")
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

    const logIn = async ({email, password}: {email: string, password: string}) => {
        try{
            const response = await fetch(`${API_URL}api/v1/auth/login`,{
                method: 'POST',
                headers: {
                    "Content-Type" :"application/json",
                },
                body: JSON.stringify({email, password}),
            })
            console.log(response)

            if(response.status === 2000){
                const data = await response.json()
                setUser(data)
                console.log(data)
            }else{
                alert("Usuario no encontrado")
            }

        }catch(error) {
            console.error(error)
        } 
    }

    if (isLoggedIn) {
        return <Mostrar />
    }

    return(
        <>
        {
            user && (
                <section className="dataContainer">
                    {
                        showData && (
                            <>
                                <p>Correo: {user.user.email}</p>
                                <p>Nombre: {user.user.name}</p>
                                <p>Id: {user.user.id}</p>
                            </>
                        )
                    }
                </section>
            )
        }
            <Data email={email} password={password} showData={showData}/> 
            <section className="formContainer">
                <span className="inputContainer">
                    <label htmlFor="email">Correo:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)}></input>
                </span>
                <span>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)}></input>
                </span>
                <button onClick={handleOnClick}>
                    {showData ? "Ocultar datos" : "INICIAR SECION"}
                </button>
                {loginAttempt && (email !== loginData.email || password !== loginData.password) && (
                    <p style={{ color: 'red' }}>¡Datos incorrectos! Por favor, intenta de nuevo.</p>
                )}
            </section>
        </>       
    )
}

export default Form