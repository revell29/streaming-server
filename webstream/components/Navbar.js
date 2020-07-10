import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <div className="bg-white p-5 flex shadow relative w-full">
            <Link to="/">
                <h1 className="text-2xl font-semibold">STREAMKU</h1>
            </Link>
        </div>
    );
}

export default Navbar;
