const c = require('colors');


const prefix_info = `${c.cyan('(System)')} `;
const prefix_erro = `${c.red('(Error)')} `;
const prefix_server = `${c.yellow('(Server)')} `;
const prefix_websocket = `${c.yellow('(Websocket)')} `;

class Message {
    info(message) { console.log(prefix_info+message); }
    erro(message) { console.log(prefix_erro+message); }
    server(message) { console.log(prefix_server+message); }
    websocket(message) { console.log(prefix_websocket+message); }
    status(message, length = 7) {
        let space = "";
        for(let i = 0; i < length; i++) space += " ";

        console.log(space +  message + ' => ' + c.green('OK'));
    }
}

module.exports = Message;