import { useState } from "react"

const API_URL = "http://localhost:3000/"

interface RegistrationCategoryProps {
    user: any
    setIsAddingMovie: (isAddingMovie: boolean) => void
}

function RegistrationCategory({ user, setIsAddingMovie }: RegistrationCategoryProps) {
    const [titulo, setTitulo] = useState<string>("")
    const [genero, setGenero] = useState<string>("")
    const [sinopsis, setSinopsis] = useState<string>("")

    const handleInputChange = (stateUpdate: (newState: string) => void) => {
        return (event: any) => {
            stateUpdate(event.target.value)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await fetch(`${API_URL}api/v1/categories/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify({ titulo, genero, sinopsis }),
            })

            if (response.status === 201) {
                alert("Película registrada con éxito!")
                setIsAddingMovie(false)
            } else {
                alert("Error al registrar la película")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="registrationForm">
            <h2>Registrar Película</h2>
            <div className="inputContainer">
                <label htmlFor="titulo">Título:</label>
                <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleInputChange(setTitulo)} />
            </div>
            <div className="inputContainer">
                <label htmlFor="genero">Género:</label>
                <input type="text" id="genero" name="genero" value={genero} onChange={handleInputChange(setGenero)} />
            </div>
            <div className="inputContainer">
                <label htmlFor="sinopsis">Sinopsis:</label>
                <textarea id="sinopsis" name="sinopsis" value={sinopsis} onChange={handleInputChange(setSinopsis)} />
            </div>
            <button type="submit">Registrar</button>
        </form>
    )
}

export default RegistrationCategory
