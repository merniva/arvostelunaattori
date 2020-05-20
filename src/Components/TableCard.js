import React from 'react'
import {Link} from 'react-router-dom'

function TableCard(props){
    return (
        <div className="border mb-4 rounded overflow-hidden">
            <Link to={`/tables/${props.table.id}`}>
                <div 
                    style={{
                        'backgroundImage': `url('${props.table.images[0].imageUrl}')`,
                    }}
                    className="w-full h-64 bg-blue bg-cover"
                >
                </div>
            </Link>
            <div className="p-3">
                <h4 className="font-bold text-xl mb-3">
                    <Link to={`/tables/${props.table.id}`}>
                        { props.table.name }
                    </Link>    
                </h4>
                <div className="font-bold mb-3">
                    $ { props.table.price }
                </div>
                <div className="mb-3">
                    { props.table.description }
                </div>
                <Link 
                    to={`/tables/${props.table.id}`}
                    className="bg-teal-400 hover:bg-teal-600 text-white p-2 flex justify-center w-full font-bold py-2 px-4 rounded-full"
                >
                    View
                </Link>
            </div>
        </div>
    )
}

export default TableCard