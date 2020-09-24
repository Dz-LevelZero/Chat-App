import React, { useRef, useState } from 'react';
import './App.css';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// import SignIn from './SignIn';
// import ChatRoom from './ChatRoom';
// import SignOut from './SignOut';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }
  return (
      <div className="signIn">
          <button onClick={signInWithGoogle}>Sign in With Google</button>
      </div>
  )
}

function SignOut() {
    
  return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef()

  const messageRef = firestore.collection("messages")
  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, {idField : "id"});

  const [formeValue, setFormeValue] = useState("");

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messageRef.add({
      text: formeValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormeValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <div className="chatRoom">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
          <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage}>
      <input value={formeValue} onChange={(e) => setFormeValue(e.target.value)}/>
        <button type="submit">🕊</button>
      </form>
    </main>
  )
}

function ChatMessage(props) {

  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";
  
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt=""/>
      <p>{text}</p>
    </div>
  ) 
}









export default App;
