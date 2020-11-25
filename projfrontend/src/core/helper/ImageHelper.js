import React from 'react'
import {API} from '../../backend'

const ImageHelper = ({product}) => {
    const imageurl = product ? `${API}/product/photo/${product._id}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_UurqPj0MYOEuzknQU_W_dISV0KxgSfMDxxe5IGmL9VDcPg54eeC_Retxtw&usqp=CAc`
    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageurl}
                alt="photo"
                style={{maxHeight:"100%",maxWidth:"100%"}}
                className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageHelper