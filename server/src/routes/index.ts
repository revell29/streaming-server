import { Router, Request, Response } from "express";
import StreamController from "../app/controllers/StreamController";
const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.send({ test: "test" });
});

router.get("/streams", StreamController.listStream);
router.get("/streams/:id", StreamController.detailStream);

export default router;
