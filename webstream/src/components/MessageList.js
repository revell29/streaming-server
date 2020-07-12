import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const MessageList = ({ message }) => {
    return (
        <div className="px-3" useAtBottom={false} useMode="bottom" style={{ height: "calc(var(--vh, 1vh) * 90)" }}>
            <div className="pb-10 h-full overflow-auto">
                {message.map((item, key) => (
                    <div key={key} className="mb-3">
                        <p className="whitespace-pre-line break-all text-md mt-3">{item.message}</p>
                        <small className="text-gray-800" style={{ fontSize: "10px" }}>
                            {item.from} - <strong>{item.time}</strong>
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageList;
