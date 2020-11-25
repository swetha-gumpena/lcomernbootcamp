export const addItemToCart = (item,next) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count:1
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productId) => {
        let cart = []
        if (typeof window !== undefined){
            if (localStorage.getItem("cart")){
                cart=JSON.parse(localStorage.getItem("cart"))
            }  //load all of the cart info on "cart"
            cart.map((product,index)=>{
                if(product._id===productId){
                    cart.splice(index,1)  //remove 1 item whose id matches passed id
                }
            })
            localStorage.setItem("cart",JSON.stringify(cart)) //update the cart
        }
        return cart; //throw the cart back
}

//whenever user makes payment, empty out cart and force reload,
//and then pop up a message saying everything was successful
export const cartEmpty = next => {
    if (typeof window !== undefined){
        localStorage.removeItem("cart")
        next();
    }
}