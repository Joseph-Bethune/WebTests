import express from "express";
import path from "path";
import fileURLToPath from "url";
import morgan from "morgan";
import os from 'os';

const __dirname = path.dirname(fileURLToPath.fileURLToPath(import.meta.url));
const port = 8080;

const serverIpAddress = '0.0.0.0';
const app = express();

//#region host ip address

function getIPAddresss() {
    // Iterate through network interfaces to find the desired IP address
    let networkInterfaces = os.networkInterfaces();
    if (networkInterfaces) {
        for (const interfaceName in networkInterfaces) {
            let interfaces = networkInterfaces[interfaceName];
            for (const iface of interfaces) {
                // Filter for IPv4 addresses that are not internal (loopback)
                if (iface.family === 'IPv4' && !iface.internal) {
                    //console.log(`Local IP Address (${interfaceName}): ${iface.address}`);
                    return `${iface.address}`;
                }
            }
        }
    }
    return null;
}

//#endregion


function startServer() {
    app.listen(port, serverIpAddress, () => {
        let ipAddress = getIPAddresss();
        console.log(`Server is running at addresss ${ipAddress} on port ${port}.`); 
        console.log(`>>>> http://${ipAddress}:${port} <<<<`);       
    });
}

function setupMiddleware() {
    if (false) {
        app.use(morgan((tokens, req, res) => {
            var output = [
                "Morgan HTTP Request and Response Data",
                "method: " + tokens.method(req, res),
                "url: " + tokens.url(req, res),
                "status: " + tokens.status(req, res),
                tokens.res(req, res, 'content-length') + '-',
                "response time: " + tokens['response-time'](req, res) + ' ms'
            ].join('\n ');
            return output;
        }));
    } else if (false) {
        app.use(morgan('tiny'));
    }

    //app.use(ml);        
}

function setupStaticPaths() {
    app.use(express.static(path.join(__dirname , 'views', 'Home', 'public')));
    app.use(express.static(path.join(__dirname , 'views', 'DrumKit', 'public')));
    app.use(express.static(path.join(__dirname , 'views', 'SimonGame', 'public')));
    app.use(express.static(path.join(__dirname , 'views', 'links', 'public')));
}

function bindRoutes() {
    app.get('/', (req, res) => {
        res.render("./Home/homePage.ejs", {});
    });

    app.get('/drumkit', (req, res) => {
        res.render("./DrumKit/drumKit.ejs", {});
    });

    app.get('/simongame', (req, res) => {
        res.render("./SimonGame/simonGame.ejs", {});
    });
}

function main() {
    startServer();
    setupMiddleware();
    setupStaticPaths();
    bindRoutes();
}

main();
