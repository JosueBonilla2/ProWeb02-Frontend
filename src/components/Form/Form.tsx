import { useState, useEffect } from "react"
import "./Form.css"
import Header from "../Header"
import RegistrationCategory from "./RegistrationCategory"

const API_URL = "http://localhost:3000/"

function Form() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<any>(null)
    const [categories, setCategory] = useState<Category[]>([])
    const [viewed, setViewed] = useState<{ [key: string]: boolean }>({})
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    const [isAddingMovie, setIsAddingMovie] = useState<boolean>(false)

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
        try {
            const response = await fetch(`${API_URL}api/v1/categories/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                setCategory(data)

                const initialViewedState: { [key: string]: boolean } = {}
                data.forEach((category: Category) => {
                    initialViewedState[category.id] = false
                })
                setViewed(initialViewedState)
            } else {
                alert("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (stateUpdate: (newState: string) => void) => {
        return (event: any) => {
            stateUpdate(event.target.value)
        }
    }

    const handleOnClick = () => {
        logIn({ email, password })
    }

    const logIn = async ({ email, password }: { email: string, password: string }) => {
        try {
            const response = await fetch(`${API_URL}api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            console.log(response)

            if (response.status === 200) {
                const data = await response.json()
                setUser(data)
                window.localStorage.setItem("user", JSON.stringify(data))
                alert("Usuario Encontrado!")
            } else {
                alert("Usuario no encontrado")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const toggleViewed = (id: string) => {
        setViewed((prevViewed) => ({
            ...prevViewed,
            [id]: !prevViewed[id]
        }))
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem("user")
    }

    return (
        <>
            {user ? (
                <section className="dataContainer">
                    <div className="topRightButtons">
                        <button onClick={() => setIsAddingMovie(!isAddingMovie)}>
                            {isAddingMovie ? 'Cancelar Registro de Película' : 'Registrar Película'}
                        </button>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                    {isAddingMovie ? (
                        <RegistrationCategory user={user} setIsAddingMovie={setIsAddingMovie} />
                    ) : (
                        <>
                            <div className="userInfoContainer">
                                <div className="userIcon">
                                    <img src="/img/user-icon.png" alt="User Icon" />
                                </div>
                                <div className="userInfo">
                                    <p>Hola, {user.user.name}</p>
                                    <p>Email: {user.user.email}</p>
                                </div>
                            </div>
                            
                            <button onClick={fetchCategory}>
                                Mostrar Tarjetas
                            </button>

                            {categories && (
                                <div className="cardContainer">
                                    {categories.map((category) => (
                                        <div className="card" key={category.id}>
                                            <img src={`/img/${category.titulo}.jpg`} alt={category.titulo} className="cardImage" />
                                            <div className="cardContent">
                                                <h3>{category.titulo}</h3>
                                                <p><strong>Género:</strong> {category.genero}</p>
                                                <p><strong>Sinopsis:</strong> {category.sinopsis}</p>
                                                <button onClick={() => toggleViewed(category.titulo)}>
                                                    {viewed[category.titulo] ? 'Ya la vi' : 'No la he visto'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </section>
            ) : (
                <>
                    <Header title="FORMULARIO LOGIN" />
                    {isRegistering ? (
                       <RegistrationCategory user={user} setIsAddingMovie={setIsAddingMovie} />
                    ) : (
                        <section className="formContainer">
                            <span className="inputContainer">
                                <label htmlFor="email">Correo:</label>
                                <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)} />
                            </span>
                            <span>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)} />
                            </span>
                            <button onClick={handleOnClick}>
                                INICIAR SESION
                            </button>
                            <p className="registerLink" onClick={() => setIsRegistering(true)}>No tienes cuenta? Regístrate</p>
                        </section>
                    )}
                </>
            )}
        </>
    )
}

export default Form
