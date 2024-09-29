import { db } from '../../firebase/firebase'; // Adjust the path to point to firebase.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from '../../firebase/firebase';

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
    // Fetch the capsule document from Firestore
    const docRef = doc(db, "timeCapsules", id);
    const capsuleDoc = await getDoc(docRef);

    if (capsuleDoc.exists()) {
      const capsuleData = capsuleDoc.data();

      // Get the URLs of images and videos stored in Firebase Storage
      const { images = [], videos = [] } = capsuleData;

      // Delete each file from Firebase Storage
      const deleteFile = async (url) => {
        try {
          // Create a reference to the file in Firebase Storage
          const fileRef = ref(storage, url);
          // Delete the file
          await deleteObject(fileRef);
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      };

      // Delete all images
      await Promise.all(images.map(deleteFile));

      // Delete all videos
      await Promise.all(videos.map(deleteFile));

      // Finally, delete the document from Firestore
      await deleteDoc(docRef);
      console.log('Capsule and associated files deleted successfully');
    } else {
      console.error('Capsule not found');
    }
  } catch (e) {
    console.error("Error deleting document and files: ", e);
  }
};

const uploadFiles = async (files, folder) => {
  const urls = [];
  for (const file of files) {
    const fileRef = ref(storage, `${folder}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    urls.push(downloadUrl);
  }
  return urls;
}; 

export { addTimeCapsule, fetchTimeCapsules, updateTimeCapsule, deleteTimeCapsule, uploadFiles };