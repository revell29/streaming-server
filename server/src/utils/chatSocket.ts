import moment from "moment-timezone";
import Logger from "./logger";

export function chatSocket(io: any) {
    io.on("connection", function (socket: any) {
        socket.on("join", (streamId: string) => {
            socket.join(streamId);
            Logger.log(`join into room ${streamId}`);
        });

        socket.on("send message", (data: any) => {
            data.time = moment().tz("Asia/Jakarta").format("HH:m");
            io.to(data.streamId).emit("new message", data);

            socket.on("received", (data: any) => {
                io.to(data.from).emit("received", data);
            });
            Logger.log(data);
        });

        socket.on("disconnect", () => {
            Logger.log(`User has been disconnect`);
        });
    });
}
