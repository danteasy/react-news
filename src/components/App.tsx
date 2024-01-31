import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { About, Home } from "../exports";
import { Container } from "../exports";

export const App: React.FC = () => {
    return (
        <>
            <Container>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Router>
            </Container>
        </>
    );
};
