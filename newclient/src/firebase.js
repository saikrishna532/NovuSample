import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


var firebaseConfig = {
    apiKey: "AIzaSyDNBgoG2JlD2g9vrDkzEt7FEjbTXSju_nQ",
    authDomain: "test-novu-26b5c.firebaseapp.com",
    projectId: "test-novu-26b5c",
    storageBucket: "test-novu-26b5c.appspot.com",
    messagingSenderId: "298283082736",
    appId: "1:298283082736:web:2f2374c9978970e4603335",
    measurementId: "G-QS9HTYYQHK",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: `BETaNc8zYdeqahY05588Iu5kqMnCTtNBT237M3DoeP2IsVMsx4uH4-q9HqfMYL6ByFXuZwZxIq4txMP0BSWTUDU` })
      .then(async (currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // await novu.subscribers.update('123', {
          //     firstName: 'Saurabh', // new first name
          //     lastName: 'Sumit', // new last name
          //   });
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };
  
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
  export const onMessageListener = () =>
    new Promise((resolve) => {    
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });