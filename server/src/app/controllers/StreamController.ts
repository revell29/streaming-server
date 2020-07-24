import { Request, Response } from "express";
import db from "../../utils/db.json";
import _ from "underscore";
import Streaming from "../models/Streaming";

class StreamController {
    static async listStream(req: Request, res: Response): Promise<void> {
        const data = await Streaming.find();
        res.status(200).send(data);
    }

    static async detailStream(req: Request, res: Response): Promise<void> {
        const data = await Streaming.findOne({ _id: req.params.id });
        res.status(200).send(data);
    }
}

export default StreamController;
