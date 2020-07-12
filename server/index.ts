import Server from "./utils/server";
import cluster from "cluster";
import os from "os";

if (cluster.isMaster) {
    var cpuCount = os.cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
        cluster.on("exit", function () {
            cluster.fork();
        });
    }
} else {
    const server = new Server();
    server.run();
}
