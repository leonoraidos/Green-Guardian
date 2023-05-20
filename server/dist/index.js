"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const plant_1 = require("./models/plant");
const firebaseSetUp_1 = __importDefault(require("./services/firebaseSetUp"));
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
//schedule takes 3 param (expression, function, options)
//for more information on node-cron, check the npm page and
//https://www.freecodecamp.org/news/schedule-a-job-in-node-with-nodecron/
// to see it at work, change the expression so it runs more frequently and add some console.log
//to see it at work
// options: schedule (default true, if set to false, you will have to trigger it by calling the start method
//on the job object) and timezone
//currently schedule is running every minute for dev and debugging purposes but
//ideally would run perhaps twice a day
node_cron_1.default.schedule('* * * * *', async () => {
    //get all plants that have alerts enabled
    const plants = await plant_1.PLANT.find({ alerts: true }).populate('user');
    //loop through plants and determine if notif has to be sent
    for (const plant of plants) {
        const wateringInterval = plant.plant_details.watering.min * 24 * 60 * 60 * 1000;
        if (wateringInterval) {
            const lastWatered = plant.last_watered || plant.created_at;
            console.log(lastWatered);
            //calculate the time passed
            const timeSince = Date.now() - lastWatered.getTime();
            console.log(timeSince);
            //compare them
            const timeDifference = wateringInterval - timeSince;
            console.log(timeDifference);
            if (timeDifference <= 0) {
                const waterMessage = {
                    notification: {
                        title: 'Water Your Plant!',
                        body: `It's time to water your ${plant.plant_name}! 🌱`
                    },
                    token: plant.user.FCMUserToken,
                };
                firebaseSetUp_1.default.send(waterMessage)
                    .then((response) => {
                    console.log('Notification success :', response);
                })
                    .catch((error) => {
                    console.log('Notification error :', error);
                });
                // update the last watered time for the plant
                await plant_1.PLANT.findByIdAndUpdate(plant._id, { last_watered: Date.now() });
            }
            else {
                console.log("No notification to send yet");
            }
        }
    }
});
app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port}`);
});
