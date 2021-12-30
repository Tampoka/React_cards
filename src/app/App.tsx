import React from 'react';
import AppRoutes, {Path} from "./AppRoutes";
import Header from "../common/components/Header/Header";
import {Route, Routes} from "react-router-dom";
import TestingComponents from "../pages/Test/TestingComponents";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error404 from "../pages/Error404/Error404";

function App() {
    return (
        <div>
            <Header/>
            <AppRoutes/>

        </div>
    );
}

export default App;
