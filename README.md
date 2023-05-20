# Green-Guardian

Green Guardian allows users to identify plants through pictures uploaded, save the images to their personal 'garden' and set alerts to be reminded to water as many as plants as desired. It aims to connect people with nature and aid in the nurture of their home garden.

<img width="308" alt="Screenshot 2023-05-20 122445" src="https://github.com/leonoraidos/Green-Guardian/assets/109923328/f45f03cb-6a71-4bad-8539-6b454a3aef7b">

<img width="304" alt="Screenshot 2023-05-20 122409" src="https://github.com/leonoraidos/Green-Guardian/assets/109923328/5d7fbc90-4945-4467-90a4-2caada60ff2f">

<br>
<img width="237" alt="Screenshot 2023-05-20 122834" src="https://github.com/leonoraidos/Green-Guardian/assets/109923328/12686e74-95c4-4170-b4c5-6a934b0e72d0">


## Installation

Run ```npm install``` on both the server folder and client/my-app folder.
You will need a few things before being able to run this project. As you may see on the env
sample files, you will need several personal key and details and to place them in your own
env file.

# Plant.id API

Visit https://web.plant.id/ and get your own api key. Plant.id API allows you to make
100 requests for free. Set it up just for the plant identification feature.

After obtaining the key, put this in your .env file in your server folder. We will use
it when an user requests an idPlant request.

# Firebase

Next, you need to create a Firebase account. If you need at any point to follow a
tutorial and want to better understand what is happening, feel free to reference the
following:

    https://firebase.google.com/
    https://blog.logrocket.com/push-notifications-react-firebase/
    https://dev.tojeremytenjohow-to-send-push-notifications-with-firebase-and-react-1pol


In summary, you will need to register your project and get 3 main things. The WEB push certificates key value pair (on the client
side seen and FIREBASE_KEY), the firebase config properties seen in the client and the Service Account admin credentials seen on the
backend as a json file that will be available to you on your project setting under Service Accounts. This json file is then imported on file firebaseSetUp line 3.

# Node-Cron

Reference this if you need help understanding Cron and how to play with it: https://www.npmjs.com/package/node-cron


## Start 
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

So for next steps in my vision the project needs to either abandon the PWA appraoch and refactor the UI to funtion on desktop OR
debug the issues with registering a service worker and the server requests so these work on the phone as well.

