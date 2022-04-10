const c = require('colors');


const prefix_info = `${c.cyan('(System)')} `;
const prefix_erro = `${c.red('(Error)')} `;
const prefix_server = `${c.yellow('(Server)')} `;
const prefix_websocket = `${c.yellow('(Websocket)')} `;

class Message {
    info(message) { console.log(prefix_info+message); }
    erro(message, exit = false) {
        console.log(prefix_erro+message);
        if(exit) {

            console.log("\n\t" + c.bgRed(" System shutdown for error "));
            console.log("\tReason: "+message+"\n");
            process.exit();
        }
    }
    server(message) { console.log(prefix_server+message); }
    websocket(message) { console.log(prefix_websocket+message); }
    status(message, length = 9, error = false) {
        let space = "";
        for(let i = 0; i < length; i++) space += " ";

        if(!error) return console.log(space +  message + ' => ' + c.green('OK'));
        console.log(' ');
        return console.log(space +  message + ' => ' + c.red('ERROR'));
    }
    clearLastLine() {
        process.stdout.moveCursor(0, -1) // up one line
        process.stdout.clearLine(1) // from cursor to end
    }

    errorTable(path, reason) {
        console.log("\t" + c.gray(path));
        console.log("\t"+reason);
    }
}

module.exports = Message;