import firebase from 'firebase/app'
import  'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDxxeOTA6fwkYuzHMfpWa9wkCytTCb9i8A",
    authDomain: "crown-clothing-dd.firebaseapp.com",
    databaseURL: "https://crown-clothing-dd.firebaseio.com",
    projectId: "crown-clothing-dd",
    storageBucket: "crown-clothing-dd.appspot.com",
    messagingSenderId: "699638558140",
    appId: "1:699638558140:web:d062aecc916b921aa4cfb9",
    measurementId: "G-DJ2L2D813X"
  };

  export const createUserProfileDocument=async (userAuth,additionalData)=>{
    if(!userAuth) return;
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();
    if(!snapShot.exists) {
      const {displayName,email}=userAuth;
      const createdAt=new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
        ...additionalData
      })

      }catch(err){
        console.log(" error creating user ",err);

      }
    }
    return userRef;
  }


  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore=firebase.firestore();  

  const provider=new  firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle=()=>auth.signInWithPopup(provider)
export default firebase;