import http from "http";
import express, { Application } from "express";
import path from "path";
import * as bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "../routes";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import socketio from "socket.io";
import { chatSocket } from "./chatSocket";
import rtmpServer from "./rtmpServer";
import Logger from "./logger";

export default class Server {
    private application: Application;
    private port: number | string;
    private server: any;

    constructor() {
        dotenv.config();
        this.port = process.env.PORT || 3005;
        this.application = express();
        this.server = http.createServer(this.application);
        this.socket();
        this.plugins();
        this.rtmp();
        this.routes();
    }

    private plugins(): void {
        this.application.use(cors());
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use(bodyParser.json());
        this.application.use(morgan("common"));
        this.application.use(helmet());
    }

    private socket(): void {
        const io = socketio(this.server);
        chatSocket(io);
    }

    private rtmp(): void {
        rtmpServer();
    }

    private routes(): void {
        this.application.use("/api/", router);
        this.application.use("/api*", (req, res, next) => {
            res.status(400).send({ message: "Ooops! not found." });
        });
    }

    public run(): void {
        this.server.listen(this.port, () => {
            Logger.log(`Server running on port ${this.port}`);
        });
    }
}
