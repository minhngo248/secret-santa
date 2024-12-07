import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";

import { Fragment } from 'react';

// Pages
import HomePage from "/src/pages/homePage.jsx";

function App() {
    useLocation();
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Fragment>
    );
}

export default App;