import { getDatabase, ref } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAC_LDUblsZ9I1KZXKp-Ep3SU30r9i5dU",
  authDomain: "scrum-board-8a112.firebaseapp.com",
  databaseURL: "https://scrum-board-8a112-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrum-board-8a112",
  storageBucket: "scrum-board-8a112.firebasestorage.app",
  messagingSenderId: "732472906212",
  appId: "1:732472906212:web:68f0c80ef48980548177f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const scrumBoardRef = ref(database, '/scrumboard');
const membersRef = ref(database, '/scrumboard/members');
const tasksRef = ref(database, '/scrumboard/tasks');
const taskRef = (taskId) => ref(database, `/scrumboard/tasks/${taskId}`);





export { database, scrumBoardRef, membersRef, tasksRef, taskRef};



