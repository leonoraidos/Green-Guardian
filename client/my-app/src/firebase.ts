// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

let userToken: string | null = null;

export const getTokenWrapper = (setTokenFound: React.Dispatch<React.SetStateAction<boolean>>) => {
  return getToken(messaging, {vapidKey: process.env.FIREBASE_KEY}).then((currentToken) => {
    if (currentToken) {
      console.log('Client token retrieved successfully');
      userToken = currentToken;
      setTokenFound(true);
    } else {
      console.log('No registrations')
      setTokenFound(false);
    }
  }).catch((err) => {
    console.log('Firebase error: ', err);
  })
}

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});



export { userToken };