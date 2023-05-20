// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
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