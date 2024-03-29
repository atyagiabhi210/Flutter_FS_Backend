"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const console_1 = require("console");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
// here I will config my dotenv file so that I can use the environment variables mainly to connect and config
// my database MONGODB
dotenv_1.default.config();
// here we are initializing the express server
const app = (0, express_1.default)();
//here we create our server and pass our Express app to it  
const server = http_1.default.createServer(app);
//Express Configuration
// here we are using cors basically we use cors so that any client can make a request to our server
app.use((0, cors_1.default)());
// we use body-parser to parse the incoming request body
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//here we set the port where my server will run
app.set("PORT", 3000);
// here we set our base url we can also modify it to our domain name
app.set("BASE_URL", "localhost");
console.log('Hello, world!');
//Routes
// Here we are using our router which we have defined in our routes folder mainly setting up our router
app.use("/api/V1", routes_1.default);
//MONGO URI CONNECTION
const mongoURI = process.env.MONGO_DB_URI;
if (!mongoURI) {
    console.error("Mongo URI is not defined");
    process.exit(1);
}
mongoose_1.default.connect(mongoURI, {}).then(() => {
    console.log("MongoDB connected");
})
    .catch((error) => {
    console.error("MongoDB connection failed");
    console.error(error);
    // process.exit(1);
});
// start the server
try {
    const port = app.get("PORT");
    const baseUrl = app.get("BASE_URL");
    server.listen(port, () => {
        console.log(`Server is running on http://${baseUrl}:${port} `);
        console.log('balle');
    });
}
catch (_a) {
    console.log(console_1.error);
}
// now we will export our server
exports.default = server;
