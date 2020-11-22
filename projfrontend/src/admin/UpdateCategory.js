import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { getCategory, updateCategory } from './helper/adminapicall';

const UpdateCategory = ({match}) => {

    const [value,setName] = useState({
        name:"",
    });
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const {name} = value;

    const {user,token} = isAuthenticated();
    const preload = (categoryId) => {
        getCategory(categoryId).then(data=>{
            if(data.error){
                setError({
                    error:true
                })
            }
            else{
                setName({
                    name:data.name,
                })
            }
        })
    }

    const errorMessage = () => {
        if(error){
            return <h3 className="text-danger m-2">Error in creating category </h3>
        }
    };

    const successMessage = () => {
        if(success){
            return <h3 className="text-success m-2">Success in creating category </h3>
        }
    };

    useEffect(() => {
        preload(match.params.categoryId);
      },[])
      
    const handleChange = (e) => {

        setError("");
        setName({
            name:e.target.value,
        });

    };

    const onSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        //backend call 
        updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data =>{
        if(data?.error){
            setError(true);
        }else{
            setError("");
            setSuccess(true);
        }
    })
        .catch(err => console.log("category not created"));
    }

    const goBack = () => {
      return <div className="mt-4 mb-3">
            <Link className="btn-sm btn-success" to="/admin/dashboard">Admin Home</Link>
        </div>
    }

    const myCategoryForm = () => (
        
        <form>
            <div>
                <p className="lead">Update the Category</p>
                <input 
                type="text" 
                className="form-control my-3" 
                onChange = {handleChange}
                autoFocus 
                required 
                placeholder="Eg.Summer"
                value = {name}
                />
                <button className="btn btn-outline-info rounded" onClick={onSubmit} >Update Category</button>
            </div>
        </form>
    );

    return ( 
        <div>
           <Base title = "Update Category"
           description="Update an old category"
           className = "container bg-info p-4">
                          <div className="row bg-white rounded">
               <div className="col-md-8 offset-md-2">
                   {successMessage()}
                   {errorMessage()}
                   {myCategoryForm()}
                   {goBack()}
               </div>
           </div>

           </Base>        
        </div>
     );
}
 
export default UpdateCategory;