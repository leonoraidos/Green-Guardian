import * as admin from 'firebase-admin';
import * as serviceAccount from '../green-guardian-6e142-firebase-adminsdk-qvj3u-e8392b1335.json';

const serviceAccountObject = JSON.parse(JSON.stringify(serviceAccount));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountObject)
});

const messaging = admin.messaging();

export default messaging;
