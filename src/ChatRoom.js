import React from 'react'
import "./ChatRoom.css"

// import firebase, { firestore } from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import ChatMessage from './ChatMessage';

// function ChatRoom() {

//     const messageRef = firebase.firestore().collection("messages")
//     const query = messageRef.orderBy("createAt").limit(25);

//     const [message] = useCollectionData(query, {idField : "id"});

//     return (
//         <div className="chatRoom">
//             {message && message.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
//         </div>
//     )
// }

// export default ChatRoom
