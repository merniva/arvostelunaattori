import React from 'react'
import {Link} from 'react-router-dom'


function TableDetails(props){
    return (
        <div className="border mb-4 rounded overflow-hidden max-w-xl">
            <div className="p-3 md:flex md:items-center mb-6">
                <h5 className="md:w-1/3 font-bold">
                    { props.table.item_name }
                </h5>
                <div className="md:w-2/3">
                    { props.table.description }
                </div>
                <div className="md:w-3/3">
                    { props.table.rating }
                </div>
            </div>
        </div>
    )
}

export default TableDetails

