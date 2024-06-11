import { useState } from "react"

const API_URL = "http://localhost:3000/"

interface RegistrationFormProps {
    setIsRegistering: (value: boolean) => void
}

function RegistrationForm({ setIsRegistering }: RegistrationFormProps) {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleInputChange = (stateUpdate: (newState: string) => void) => {
        return (event: any) => {
            stateUpdate(event.target.value)
        }
    }

    const handleRegister = async () => {
        try {
            const response = await fetch(`${API_URL}api/v1/users/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            })
            console.log(response)

            if (response.status === 404) {
                alert("Error en el registro")
            } else {
                alert("Usuario registrado exitosamente!")
                setIsRegistering(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="formContainer">
            <span className="inputContainer">
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleInputChange(setName)} />
            </span>
            <span className="inputContainer">
                <label htmlFor="email">Correo:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)} />
            </span>
            <span className="inputContainer">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)} />
            </span>
            <button onClick={handleRegister}>
                REGISTRARSE
            </button>
            <p className="registerLink" onClick={() => setIsRegistering(false)}>Ya tienes cuenta? Inicia sesión</p>
        </section>
    )
}

export default RegistrationForm
