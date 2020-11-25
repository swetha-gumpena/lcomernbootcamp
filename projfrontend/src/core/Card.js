import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'
import ImageHelper from './helper/ImageHelper'

const Card = ({
    product,
    addToCart=true,
    removeFromCart=false,
    setReload = f => f,   //anonymous function-throwback whatever received
                          //this is for reloading the page (lambda function)
    //setReload = function(f){return f},
    reload=undefined
}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const additemstoCart = () => {
        addItemToCart(product,()=>setRedirect(true))
    }

    const getARedirect = (redirect) => {
        if (redirect){
            return <Redirect to = "/cart" />
        }
    }
    console.log(product)
    const cartTitle = product ? product.name : "default title";
    const cartDescription = product ? product.description : "default description";
    const cartPrice = product ? product.price : "default price";
    console.log(product.name)

    const showAddToCart = addToCart => {
        return(
            addToCart && (
                <button onClick={additemstoCart} className="btn btn-block btn-outline-success mt-2 mb-2">
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = removeFromCart => {
        return(
            removeFromCart && (
                <button onClick={() => {
                    removeItemFromCart(product._id)
                    setReload(!reload)  //if false makes it true..
                }} className="btn btn-block btn-outline-danger mt-2 mb-2">
                    Remove from Cart
                </button>
            )
        )
    }
    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
            {getARedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cartDescription}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">Rs {cartPrice}</p>
                <div className="row">
                    <div className="col-12">{showAddToCart(addToCart)}</div>
                    <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;