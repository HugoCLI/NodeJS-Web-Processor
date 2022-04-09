const Message = require('../modules/message');
const message = new Message();

class Client {

    static ip;
    static devices;
    constructor(ip) {
        this.ip = ip;
        this.devices = {};
        message.websocket(`Opening of the lease on ${ip}`);

    }

    getCountDevice() { return Object.keys(this.devices).length; }
    attach(device) {
        let id = this.getCountDevice();
        this.devices[this.getCountDevice()] = device;

        message.websocket(this.ip + ' new device (Conn '+ this.getCountDevice() +')');


        device.on('message', (msg) => this.message(msg));
        device.on('close', () => this.unattach(id));
    }

    unattach(id) {
        if(!this.devices[id]) return console.log('edrr');
        delete this.devices[id];
        message.websocket(this.ip + ' remove device (Conn '+ this.getCountDevice()+')');
    }

    message(msg) {
        msg = msg.toString();
        message.websocket(this.ip + ' : ' +msg);
    }

}
module.exports = Client;