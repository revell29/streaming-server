import fs from "fs";
import mkdirp from "mkdirp";

const template = (name: any) => {
    let line = `#EXTM3U\n#EXT-X-VERSION:3\n`;
    line += `#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n./../../hls_360p/${name}/${name}.m3u8\n`;
    line += `#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480\n./../../hls_480p/${name}/${name}.m3u8\n`;
    line += `#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720\n./../../hls_720p/${name}/${name}.m3u8\n`;
    line += `#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080\n./../../hls_1080p/${name}/${name}.m3u8`;
    return line;
};

function createPlaylist(name: any) {
    return new Promise((resolve, reject) => {
        mkdirp(`${process.env.MEDIA_ROOT}/${name}`).then((made) => {
            const playlist = `${process.env.MEDIA_ROOT}/${name}/${name}.m3u8`;
            fs.open(playlist, "w", (err, fd) => {
                if (err) {
                    reject(err.message);
                } else {
                    fs.writeFile(fd, template(name), (errWrite) => {
                        if (errWrite) {
                            reject(errWrite.message);
                            return;
                        } else {
                            fs.close(fd, () => {
                                resolve();
                            });
                        }
                    });
                }
            });
        });
    });
}

export default createPlaylist;
