# Live Video Streaming Client and Server

This project was bootstrapped with

-   React Redux
-   Node Media Server
-   SocketIo

# How to use

Make sure you have git and node installed on your machine

-   Clone this repo
-   move to project repo
-   run `yarn` or `npm install` to install all dependencies
-   then run `yarn both` to run server and web app

Runs the app in the development mode.
Open `http://localhost:3005` to view client in the browser.
Open `http://localhost:3005/api/streams` to view api in the browser.

for start streaming you can use rtmp server.
URL: `rtmp://localhost/live` or `yourdoomain.com/live`

from OBS go to setting > Streams > Select Custom > and enter the RTMP Server with your key.
Stream key: 1 (or whatever http://localhost:3005/streams/4 id you are looking at the client page after /streams)

-   `Todos`:
    -   Create stream server [done]
    -   Create chat server [done]
    -   Create Web App with React [done]
    -   Improve Web App [on progress]
    -   Streaming from webcam [none]
    -   Create beautifull documentation
    -   Scalling up Server
    -   Dockerizing app [done]
