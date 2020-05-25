import React from 'react'
//import Loader from '../Components/Loader'
import TableCard from '../Components/TableCard'
import { useAxiosGet } from '../Hooks/HttpRequests'
import { Link } from "react-router-dom"

function Home(){


    let user_id = localStorage.getItem("userid");


    const url = `http://localhost:80/React/getboards.php?user_id=${user_id}`
    let tables = useAxiosGet(url, user_id)

    let content = null

    if(tables.error){
        content = <div>
            <div className="bg-red-300 p-3">
                Odottamaton ongelma. Ole hyvä ja päivitä tai sulje sivu.
            </div>
        </div>
    }

    if(tables.loading){
        content = <p>Ladataan...</p>//<Loader></Loader>
    }

    if(tables.data){
        content = 
        tables.data.tables.map((table) => 
            <div key={table.id} className="flex-no-shrink w-full md:w-1/4 md:px-3">
                <TableCard 
                    table={table}
                />
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            <h1 className="md:flex flex-wrap md:-mx-3 mb-4 justify-center">
                Tämä on profiilisivu
            </h1>
            <div className="md:flex flex-wrap md:-mx-3 mb-4 justify-center">
            <Link 
                to="/addboard"
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                >
                    Lisää uusi taulu täältä
            </Link>
            </div>
            <div className="md:flex flex-wrap md:-mx-3">
                { content } 
            </div>
        </div>
    )
}

export default Home