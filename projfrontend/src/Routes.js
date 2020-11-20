import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./core/Home";
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import AdminRoute from "./auth/helper/AdminRoutes"
import PrivateRoute from "./auth/helper/PrivateRoutes"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
import AddCategory from "./admin/AddCategory";

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path = "/" exact component = {Home}/>
                <Route path = "/signup" exact component = {Signup}/>
                <Route path = "/signin" exact component = {Signin}/>
                <AdminRoute path = "/admin/dashboard" exact component = {AdminDashBoard}/>
                <PrivateRoute path = "/user/dashboard" exact component = {UserDashBoard}/>
                <AdminRoute path = "/admin/create/category" exact component = {AddCategory}/>
            </Switch>
        </Router>
    )
}

export default Routes;