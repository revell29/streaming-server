import React, { useRef, useEffect } from "react";

import videojs from "video.js";
import "video.js/dist/video-js.css";

//import 'videojs-contrib-hls/dist/videojs-contrib-hls.js';
// Workaround for webworkify not working with webpack
window.videojs = videojs;
require("videojs-contrib-hls/dist/videojs-contrib-hls.js");

function VideoPlayer(props) {
    const videoRef = useRef();
    let player;
    function startVideo() {
        player = videojs(videoRef.current, { autoplay: true }, () => {
            player.src(props.source);
        });
    }

    useEffect(() => {
        startVideo();
        return () => {
            player.dispose();
        };
    }, []);

    return (
        <video ref={videoRef} className="video-js vjs-default-skin w-full" style={{ height: "50rem" }} controls>
            <source src={props.source} type="application/x-mpegURL" />
        </video>
    );
}

export default VideoPlayer;
