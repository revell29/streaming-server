/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import SocketIo from "socket.io-client";
import MessageList from "../../components/MessageList";
import { fetchStream } from "../../utils/api";
import VideoPlayer from "../../components/VideoPlayer";
let socket;

function Show(props) {
    const videoRef = useRef();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [dataStream, setDataStream] = useState({});
    const id = String(props.match.params.id);
    const streamingURL = `${process.env.REACT_APP_STREAM_URL}/hls_720p/${id}/index.m3u8`;
    let player;

    function buildPlayer() {}

    function sendMessage() {
        socket.emit("send message", {
            from: "anonymous",
            streamId: String(props.match.params.id),
            message: message,
        });

        setMessage("");
    }

    function incomingMessage() {
        socket.on("new message", (data) => {
            setMessages((dataMessages) => [...dataMessages, data]);
        });

        socket.on("received", (data) => {
            setMessages((dataMessages) => [...dataMessages, data]);
        });
    }

    function typing(event) {
        if (event.key === "Enter") {
            if (!event.nativeEvent.shiftKey) {
                sendMessage(event);
            }
        }
    }

    function socketChat() {
        socket = SocketIo.connect(`${process.env.REACT_APP_SOCKET_URL}`, {
            transports: ["websocket"],
            query: {
                streamId: String(props.match.params.id),
            },
        });
    }

    async function detailsStream() {
        const id = String(props.match.params.id);
        await fetchStream(id).then((res) => {
            setDataStream(res);
        });
    }

    useEffect(() => {
        detailsStream();
        buildPlayer();
        socketChat();
        socket.emit("join", String(props.match.params.id));
        incomingMessage();
    }, []);

    return (
        <div className="flex flex-grow">
            <aside className="w-1/4 relative border-r-2 border-gray-200 min-h-full absolute">
                <MessageList message={messages} />
                <div className="w-full h-15 bg-white shadow-lg border-t absolute bottom-0 p-4">
                    <input type="text" className="w-full rounded-full bg-gray-200 p-2 pl-3 focus:outline-none" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={typing} />
                </div>
            </aside>
            <div className="p-10 w-full h-full">
                <div className="mb-3">
                    <h1 className="text-4xl font-semibold">{dataStream.title}</h1>
                    <VideoPlayer source={streamingURL} />
                </div>
            </div>
        </div>
    );
}

export default Show;
