import NodeMediaServer from "node-media-server";
import createPlaylist from "../lib/createPlaylist";
import { isEmpty } from "lodash";
import { config } from "../lib/config";
import http from "../lib/http";

function rtmpServer() {
    var nms = new NodeMediaServer(config);
    var tokens = {};

    const parseStreamName = (streamPath: string) => {
        return streamPath.replace("/hls_1080", "").replace("/hls_720p", "").replace("/hls_480p/", "").replace("/hls_360p/", "").replace("/stream/", "");
    };

    nms.on("prePublish", async (id: any, StreamPath: any, args: { streamKey: any; streamToken: any }) => {
        const streamName = parseStreamName(StreamPath);
        console.log(`${streamName} has started streaming`);
        if (args.streamKey && args.streamToken) {
            tokens[streamName] = {
                app: "stream",
                streamKey: args.streamKey,
                streamToken: args.streamToken,
            };
        }

        if (tokens[streamName]) {
            let session = nms.getSession(id);
            if (!isEmpty(process.env.PUBLISH_START_NOTIFY_URL)) {
                await http.post(`${process.env.PUBLISH_START_NOTIFY_URL}`, tokens[streamName]).catch((err) => {
                    console.error(err.message);
                    session.reject();
                });
            }
        }
    });

    nms.on("postPublish", async (_id: any, StreamPath: string, _args: any) => {
        if (StreamPath.indexOf("hls_") != -1) {
            const name = StreamPath.split("/").pop();
            createPlaylist(name);
        }
        console.log("Create playlist", StreamPath);
    });

    nms.on("donePublish", async (id: any, StreamPath: any, _args: any) => {
        const streamName = parseStreamName(StreamPath);
        console.log(`${streamName} has stopped streaming...`);
        if (tokens[streamName]) {
            let session = nms.getSession(id);
            if (!isEmpty(process.env.PUBLISH_STOP_NOTIFY_URL)) {
                await http.post(`${process.env.PUBLISH_STOP_NOTIFY_URL}`, tokens[streamName]).catch((err) => {
                    console.error(err.message);
                    session.reject();
                });
            }
        }
    });

    nms.run();
}

export default rtmpServer;
