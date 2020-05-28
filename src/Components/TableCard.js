import React from "react"
import { Link } from "react-router-dom"

function TableCard(props) {
  return (
    <div className="border mb-4 rounded overflow-hidden">
      <div className="p-3">
        <h4 className="font-bold text-xl flex justify-center mb-3">
          <Link to={`/tables/table_id/${props.table.id}`}>
            {props.table.table_name}
          </Link>
        </h4>
        <div className="mb-3">{props.table.description}</div>
        <Link
          to={`/tables/table_id/${props.table.id}`}
          className="bg-orange-400 hover:bg-orange-500 text-white p-2 flex justify-center w-full font-bold py-2 px-4 rounded-full"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default TableCard;
