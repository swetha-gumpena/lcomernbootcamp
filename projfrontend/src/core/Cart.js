import React,{useEffect,useState} from "react";
import "../styles.css"
import {API} from "../backend";
import Base from "./Base"
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";


const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)   
   //reload ultimately happend from card. When an item is removed should automatically
   //get removed from the cart page

    useEffect(()=>{
        setProducts(loadCart())
    },[reload])   //if at any time, change happens it should update

    const loadAllProducts = () => {
        return (
            <div>
                <h2>Load all products</h2>
                {products.map((product,index)=>(
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addToCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckOut = () => {
        return (
            <div>
                <h2>Section for checkout</h2>
            </div>
        )
    }

    return (
        <Base title="Cart page" description="Ready to check out">
            <div className="row text-center">
                <div className="col 6">{loadAllProducts()}</div>
                <div className="col 6">{loadCheckOut()}</div>
            </div>
        </Base>
    )
}

export default Cart