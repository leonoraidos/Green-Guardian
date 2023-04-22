"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("./controllers/user"));
const plantController = __importStar(require("./services/plantidAPI"));
const authmiddleware_1 = __importDefault(require("./middleware/authmiddleware"));
const router = (0, express_1.Router)();
//USER REQUESTS
router.get('/', (req, res) => {
    res.send('Hello, world!');
});
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authmiddleware_1.default, userController.profile);
//to save plant to own guarden
router.post('/save');
//to get own plants
//router.get('/myguarden', authMiddleware, userController);
//router.post('/removeplant', authMiddleware, )
//API REQUESTS
router.post('/idplant', plantController.getPlant);
router.get('/ownplantdetails');
module.exports = router;
