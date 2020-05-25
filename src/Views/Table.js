import React from 'react'
import { useParams } from 'react-router-dom'
//import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'
import TableDetails from '../Components/TableDetails'

function ShowTable(){
    const { tableId } = useParams()
    const url = `http://localhost:80/React/getboarddetails.php?table_id=${tableId}`
    let table = useAxiosGet(url, tableId)

    //${table_id}

    let content = null;
    let header = null;

    if(table.error){
        content = <div>
            <div className="bg-red-300 p-3">
                Odottamaton ongelma. Ole hyvä ja päivitä tai sulje sivu.
            </div>
        </div>
    }

    if(table.loading){
        content = <p>Ladataan...</p>//<Loader></Loader>
    }

    if(table.data){
        content = 
        table.data.details.map((table) => 
            <div key={table.id} className="flex-no-shrink w-full">
                <TableDetails 
                    table={table}
                />
            </div>
        )
        header = table.data.table.table_name;
        {/*<div>
            <h1 className="text-2xl font-bold mb-3">
                {table.data.table.table_name}
            </h1>
            <div>
                {table.data.table.description}
            </div>
        </div>*/}
    }

    return (
        <div className="container mx-auto justify-center">
            <h4 className="block font-bold text-xl flex justify-center mb-3">
                {header}
            </h4>
            {content}
        </div>
    )
}

export default ShowTable