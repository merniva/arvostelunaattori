import React from 'react'
import {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings'



function TableDetails(props){
    console.log("tabledetails",props)
    return (
        <div className="border mb-4 rounded">
            <div className="p-3 items-center flex flex-wrap overflow-hidden">
                <h5 className="w-full overflow-hidden lg:w-1/4 xl:w-1/4 font-bold">
                    { props.tableItem.item_name }
                </h5>
                <div className="w-full overflow-hidden lg:w-1/4 xl:w-1/4 mb-2">
                    { props.tableItem.description }
                </div>
                <div className="w-full overflow-hidden lg:w-1/4 xl:w-1/4 mb-6">
                    { props.tableItem.rating &&
                    <StarRatings
                        rating={ props.tableItem.average || 0.0 }
                        starRatedColor="#F6AD55"
                        starDimension="20px"
                        numberOfStars={5}
                        name='rating'
                    />}
                </div>
                <div className="w-full lg:w-1/4 xl:w-1/4">
                    <Link 
                    to={`/addreview/table/${props.parentTableId}/item/${props.tableItem.id}`}
                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Arvostele kohde
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TableDetails

