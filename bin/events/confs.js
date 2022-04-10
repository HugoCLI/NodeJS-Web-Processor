const Message = require('../modules/message');
const message = new Message();
const fs = require("fs");


const path = "/apps/NodeJS-Web-Processor/bin/configs/sites-available/";
class Confs {

    static exportConfigurations;

    constructor() {
        message.info('Importing website configurations');

        this.confs = [];
        fs.readdirSync(path).forEach((elm) => {
            this.confs.push(elm);
        })
        if(this.confs.length === 0) return message.erro('Configuration folder is empty !', true);
        this.index = 0;
        this.import();
    }

    import() {
        let error = false;
        if(this.index < this.confs.length) {
            let data = fs.readFileSync(path+this.confs[this.index], 'utf8');
            data = data.split("\r\n");

            for(let i = 0; i < data.length; i++) {
                data[i] = data[i].trim();
                if (data[i] === "")
                    data.splice(i, 1);

            }

            if(!data[0].match(/(conf )(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9](:)/g)) {
                message.erro(this.confs[this.index] + ` --- "conf domain_url:" Missing on line 0`);
                error = true;
            }

            if(data[data.length - 1] !== "endconf;") {
                message.erro(this.confs[this.index] + ` --- "endconf;" Missing on line ${data.length}`);
                error = true;
            }

            if(!error) {
                message.status(this.confs[this.index]);
            }

            this.index+=1;
            this.import();
        }
    }
}
module.exports = Confs;