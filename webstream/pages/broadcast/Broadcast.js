import React, { useRef, useEffect } from "react";

function Broadcst(props) {
    const videoRef = useRef();
    const vendorUrl = window.URL || window.webkitURL;

    async function buildCam() {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(function (stream) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    console.log(videoRef);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        buildCam();
        console.log(videoRef);
    }, []);

    return (
        <div>
            <div>
                <h1>Broadcaster</h1>
                <div className="w-full">
                    <video ref={videoRef} controls={true} style={{ width: "50%" }}></video>
                </div>
            </div>
        </div>
    );
}

export default Broadcst;
