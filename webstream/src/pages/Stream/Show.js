/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import flv from "flv.js";
import SocketIo from "socket.io-client";
import MessageList from "../../components/MessageList";
import { fetchStream } from "../../utils/api";

let socket;

function Show(props) {
    const videoRef = useRef();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [dataStream, setDataStream] = useState({});
    let player;

    function buildPlayer() {
        const id = String(props.match.params.id);
        player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`,
        });

        player.attachMediaElement(videoRef.current);
        player.load();
    }

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

        return () => {
            player.destroy();
        };
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
                </div>
                <video ref={videoRef} style={{ width: "100%" }} controls={true} />
            </div>
        </div>
    );
}

export default Show;
