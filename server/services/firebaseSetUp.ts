import * as admin from 'firebase-admin';
//include JSON file that is provided by firebase when you set up adminsdk
import * as serviceAccount from '../firebase.json';

const serviceAccountObject = JSON.parse(JSON.stringify(serviceAccount));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountObject)
});

const messaging = admin.messaging();

export default messaging;
