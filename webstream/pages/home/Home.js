import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(props) {
    useEffect(() => {
        props.fetchStreams();
    }, []);

    return (
        <div className="p-5 lg:p-20">
            <h1 className="text-2xl font-semibold">Live Streams</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                {props.streams.map((item, key) => (
                    <div className="shadow" key={key}>
                        <Link to={"/streams/" + item.id}>
                            <img src="https://i.ya-webdesign.com/images/play-button-image-png-4.png" alt="" />
                        </Link>
                        <div className="p-4">
                            <h4>{item.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
