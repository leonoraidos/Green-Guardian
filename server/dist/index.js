"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsConfig));
//has to have these settings or else the body will be too large
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(router_1.default);
app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port}`);
});
