import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from './Home'
import HomeNoticia from "./HomeNoticia";

const Rotas = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/HomeNoticia" element={<HomeNoticia />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas