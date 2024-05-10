import Prueba from "./components/Form/Prueba"
import Header from "./components/Header"
import Tarjeta from "./components/Tarjeta/Tarjeta"
import LogIn from "./login"

function Mostrar(){

    return(
        <main>
            <Header title= "PELICULAS REGISTRADAS" />
            <Prueba />
        </main>
    )
}

export default Mostrar