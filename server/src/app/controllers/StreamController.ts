import { Request, Response } from "express";
import Streaming from "../models/Streaming";
import sha256 from "crypto-js/sha256";

class StreamController {
    /**
     * listing all live streaming
     */
    static async listStream(req: Request, res: Response): Promise<void> {
        const data = await Streaming.find();
        res.status(200).send(data);
    }

    /**
     * Create live streaming
     *
     * @param req
     * @param res
     */
    static async create(req: Request, res: Response): Promise<void> {
        const newStreaming = new Streaming({
            title: req.body.title,
            description: req.body.description,
            uuid: sha256(req.body.title),
        });

        newStreaming.save((error: any) => {
            if (error) res.status(500).send({ message: error });

            res.status(200).send({ message: "streaming has been created" });
        });
    }

    /**
     * Show live streaming
     *
     * @param req
     * @param res
     */
    static async detailStream(req: Request, res: Response): Promise<void> {
        const data = await Streaming.findOne({ _id: req.params.id });
        res.status(200).send(data);
    }
}

export default StreamController;
