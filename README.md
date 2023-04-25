# Green-Guardian

Green Guardian allows users to identify plants through pictures uploaded, save the images to their personal 'garden' and set alerts to be reminded to water as many as plants as desired.

## Installation

Run npm install on both the server folder and client/my-app folder.

You will a few things before being able to run this project. As you may see on the env
sample files, you will need several personal key and details and place them in your own
env file.

# Plant.id API

Visit https://web.plant.id/ and get your own api key. Plant.id API allows you to make
100 requests for free. Set it up just for the plant identification feature.

After obtaining the key, put this in your .env file in your server folder. We will use
it when an user request an idPlant request.

# Firebase

Next, you need to create a Firebase account. If you need at any point to follow a
tutorial and want to better understand what is happening, feel free to reference the
following:

    https://firebase.google.com/
    https://blog.logrocket.com/push-notifications-react-firebase/
    https://dev.tojeremytenjohow-to-send-push-notifications-with-firebase-and-react-1pol

# NODE-CRON

Reference these two if you need help understanding Cron and how to play with it: https://www.npmjs.com/package/node-cron and

Once everything is set-up, start both the client and the server:

Server - uses concurrently and nodemon to automatically detect changes to yoru file and compile to TS

```bash
npm run dev
```

Client

```bash
npm start
```

The app's UI is currently designed to be used on a phone so open your inspector tools and choose one
of the phone options for your window dimensions.

Unfortunately it seems Service Workers connections on localhost are no longer supported and do
require an https conenction, therefore I could not make this a valid PWA just yet. 

