import { Request, Response } from "express";
import db from "../../utils/db.json";
import _ from "underscore";

class StreamController {
    static async listStream(req: Request, res: Response): Promise<void> {
        res.status(200).send(db);
    }

    static async detailStream(req: Request, res: Response): Promise<void> {
        const data = _.where(db, { id: parseInt(req.params.id) });
        res.status(200).send(data);
    }
}

export default StreamController;
