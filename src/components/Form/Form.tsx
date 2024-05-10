import {useState, useEffect} from "react"
import Data from "./Data"
import "./Form.css"
import Mostrar from "../../mostrar"

const API_URL = "http://localhost:3000/"

function Form(){

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<any>(null)
    const [categories, setCategory] = useState<Category[]>([])

    interface Category {
        id: string
        titulo: string
        genero: string
        sinopsis: string
    }

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user")
        if (userInStorageString) {
            const userInStorage = JSON.parse(userInStorageString)
            console.log(userInStorage)
            setUser(userInStorage)
        }
    }, [])
    
    const fetchCategory = async () => {
        try{
            const response = await fetch(`${API_URL}api/v1/categories/`,{
                headers:{
                    'Authorization' : `Bearer ${user.token}`
                }
            })

            if(response.status === 200){
                const data = await response.json()
                console.log(data)
                setCategory(data)
            }else{
                alert("Error")
            }

        }catch(error){
            console.log(error)
        }
    }

    const handleInputChange = (stateUpdate: (newState: string)=>void ) =>{
        return (event: any) =>{
            stateUpdate(event.target.value)
        }
    }

    const handleOnClick = () =>{
        
        logIn({email, password})
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

            if(response.status === 200){
                const data = await response.json()
                setUser(data)
                window.localStorage.setItem("user", JSON.stringify(data))
                alert("Usuario Encontrado!")
            }else{
                alert("Usuario no encontrado")
            }

        }catch(error) {
            console.error(error)
        } 
    }

    return(
        <>
        {
            user ? (
                <section className="dataContainer">
                    <>
                        <p>Id: {user.user.id}</p>
                        <p>Nombre: {user.user.name}</p>
                        <p>Correo: {user.user.email}</p>
                        
                        <button onClick={fetchCategory}>
                            Mostar Tabla
                        </button>

                        {
                            categories && (
                                <>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Título</th>
                                                <th>Género</th>
                                                <th>Sinopsis</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((category) => (
                                                <tr key={category.id}>
                                                    <td>{category.titulo}</td>
                                                    <td>{category.genero}</td>
                                                    <td>{category.sinopsis}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )
                        }
                    </>
                </section>
            ) : (
                <>
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
                            INICIAR SECION
                        </button>
                    </section>
                </>
            )
        }
        </>       
    )
}

export default Form