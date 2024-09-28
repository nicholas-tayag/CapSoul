import { db } from '../../firebase/firebase'; // Adjust the path to point to firebase.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const addTimeCapsule = async (timeCapsule) => {
  try {
    const docRef = await addDoc(collection(db, "timeCapsules"), {
      ...timeCapsule,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const fetchTimeCapsules = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "timeCapsules"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
};

const updateTimeCapsule = async (id, updatedData) => {
  try {
    const docRef = doc(db, "timeCapsules", id);
    await updateDoc(docRef, updatedData);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const deleteTimeCapsule = async (id) => {
  try {
    const docRef = doc(db, "timeCapsules", id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export { addTimeCapsule, fetchTimeCapsules, updateTimeCapsule, deleteTimeCapsule };