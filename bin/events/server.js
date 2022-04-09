const Message = require('../modules/message');
const Client = require('./client');
const message = new Message();


const yargs = require("yargs");
const WebSocket = require('ws');


const http = require('http');
const url = require("url");
const fs = require("fs");



class Server {
    constructor() {
        message.info('Starting system...');

        this.startServer();
        this.startWebsocket();
        if(!this.openPort()) return message.erro('Failed to start listening (ERR 0)');

    }

    startServer() {
        this.server = http.createServer((req, socket, res) => this.actionServer(req, socket, res));
        message.status('Server');
    }



    startWebsocket() {
        this.websocket = new WebSocket.Server({ port: 3050, address: 'localhost'});
        message.status('Websocket');
        message.status(`localhost:3050`);

        this.clients = {};
        this.websocket.on('connection', (ws, req) => {

            const ip = req.socket.remoteAddress;
            if(!ip) return ws.close('Eject for security reasons');

            if(!this.clients[ip]) this.clients[ip] = new Client(ip);
            this.clients[ip].attach(ws);
        })
    }



    async openPort() {
        await this.server.listen(2050, "localhost", () => {
            message.status(`localhost:${this.server.address().port}`);

            return true;
        });


        return false;
    }


    actionServer(req, res) {
        let route = url.parse(req.url).pathname;
        const servername = req.headers['host'];
        if (!servername) return res.write('Identity verification failed');
        if (route === '/') route = '/index';


        message.server('GET '+route+' by '+servername);

        if (fs.existsSync('/apps/website/' + servername + '/'+route+'.html')) {
            console.log('GET 200 ' + route);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(fs.readFileSync('/apps/website/' + servername + '/'+route+'.html', 'utf8'));
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write('GET 404 / No Found');
        }


        res.end();
    }


}
module.exports = Server;