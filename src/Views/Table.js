import React from 'react'
import { useParams, Link } from 'react-router-dom'
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
        table.data.details.reduce((all, current, idx, source) => {
            
            const exists = all.find(detail => detail && detail.id === current.id)
            if(exists) {
                return all;
            }

            const result = {...current}
            const filteredResults = source
                .filter(detail => detail.id === current.id)
            result.average = filteredResults
                .reduce((numbers, currentNumber) => {
                    if (!currentNumber.rating) {
                        return numbers;
                    }
                    let parsedCurrentNumber = parseInt(currentNumber.rating)
                    let sum = numbers + parsedCurrentNumber
                    console.log("average", numbers, currentNumber, parsedCurrentNumber, sum)
                    return sum;
                }, 0)
            result.average = result.average / filteredResults.length;
            console.log('result average', result)
            return [...all, result]
        }, []).map((tableItem) => 
            <div key={tableItem.id}>
                <TableDetails 
                    tableItem={tableItem}
                    parentTableId={table.data.table.id}
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
        <div className="container mx-auto justify-center mb-6">
            <h4 className="block font-bold text-xl flex justify-center mb-3">
                {header}
            </h4>
            {content}
            <Link 
                    to={`/additem/${tableId}`}
                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded-full"
                    >
                        Lisää uusi kohde
            </Link>
        </div>
    )
}

export default ShowTable