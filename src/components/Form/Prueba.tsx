import React, { useState, useEffect } from "react"
import './Prueba.css'

const API_URL = "http://localhost:3000/"

function Prueba() {

    const [category, setCategory] = useState<any>(null)

    useEffect(()=>{
        fetch(`${API_URL}api/v1/categories/findThirdCategory`)
        .then((res) => res.json())
        .then((data)=>setCategory(data))
    }, [])

    return (
        <div>
            <h1>Tabla Películas</h1>
            {category &&(
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Genero</th>
                            <th>Sinopsis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category && (
                            <tr>
                                <td>{category.titulo}</td>
                                <td>{category.genero}</td>
                                <td>{category.sinopsis}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}   
        </div>
    )
}

export default Prueba