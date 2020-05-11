import React from 'react'
//import Loader from '../Components/Loader'
//import ProductCard from '../Components/ProductCard'
import { useAxiosGet } from '../Hooks/HttpRequests'

function Home(){
    let content = <p>
        Tämä on contenttia
        </p>
    /*const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products?page=1&limit=10`
    let products = useAxiosGet(url)

    if(products.error){
        content = <div>
            <div className="bg-red-300 p-3">
                Odottamaton ongelma. Ole hyvä ja päivitä tai sulje sivu.
            </div>
        </div>
    }

    if(products.loading){
        content = <Loader></Loader>
    }

    if(products.data){
        content = 
        products.data.map((product) => 
            <div key={product.id} className="flex-no-shrink w-full md:w-1/4 md:px-3">
                <ProductCard 
                    product={product}
                />
            </div>
        )
    } */

    return (
        <div className="container mx-auto">
            <h1>
                Tämä on etusivu
            </h1>
            <div>
                { content } 
            </div>
        </div>
    )
}

export default Home