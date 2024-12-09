import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";

import { Fragment } from 'react';

// Pages
import HomePage from "/src/pages/homePage.jsx";
import MerryChristmasImage from "./assets/merry_christmas.png";
import ListUsers from "./components/user/listUsers.jsx";
import NotFound from "./pages/notFound.jsx";

function App() {
    useLocation();
    return (
        <Fragment>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <img
                    src={MerryChristmasImage}
                    alt="Merry Christmas"
                    style={{width: '50%', height: '25%'}}
                />
            </div>
            <Routes>
                <Route path="/" element={
                    <>
                        <HomePage/>
                        <ListUsers />
                    </>
                }/>
                <Route path="*" element={<NotFound />} />
            </Routes>

        </Fragment>
    );
}

export default App;