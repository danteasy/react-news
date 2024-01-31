import React from "react";
import { Button } from "../../exports";

export const NavBar: React.FC = () => {
    return (
        <nav className="flex items-center justify-between text">
            <ul className="flex items-center justify-between gap-2 text-[1.15rem]">
                <li>
                    <Button to="/">Home</Button>
                </li>
                <li>
                    <Button to="/about">About</Button>
                </li>
            </ul>
        </nav>
    );
};
