export type DataProps = {
    email: String,
    password: String,
    showData: boolean
}

function Data({email, password, showData}: DataProps){
    return (
        <section className="dataContainer">
            {
                showData && (
                    <>
                        <p>Correo: {email}</p>
                        <p>Contraseña: {password}</p>
                    </>
                )
            }
        </section>
    )
}

export default Data