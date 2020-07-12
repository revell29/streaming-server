export function streamSocket(io: any) {
    let broadcaster: any;
    io.sockets.on("error", (e: string) => console.log(e));
    io.sockets.on("connection", (socket: any) => {
        socket.on("broadcaster", () => {
            broadcaster = socket.id;
            console.log(broadcaster);
            socket.broadcast.emit("broadcaster");
        });
        socket.on("watcher", () => {
            socket.to(broadcaster).emit("watcher", socket.id);
        });
        socket.on("offer", (id: string, message: string) => {
            socket.to(id).emit("offer", socket.id, message);
        });
        socket.on("answer", (id: string, message: string) => {
            socket.to(id).emit("answer", socket.id, message);
        });
        socket.on("candidate", (id: string, message: string) => {
            socket.to(id).emit("candidate", socket.id, message);
        });
        socket.on("disconnect", () => {
            socket.to(broadcaster).emit("disconnectPeer", socket.id);
        });
    });
}
