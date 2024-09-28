import { db } from '../../firebase/firebase'; // Adjust the path to point to firebase.js
import { collection, addDoc } from 'firebase/firestore';

// Define the function
export const addTimeCapsule = async () => {
    try {
      const docRef = await addDoc(collection(db, "timeCapsules"), {
        title: "My First Time Capsule",
        description: "This is a test capsule.",
        releaseDate: new Date("2025-01-01"), // Example release date
        createdBy: "userId123", // This should be replaced with the actual user ID
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };