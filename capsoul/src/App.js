import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import CapsulePage from './pages/CapsulePage';

import { db } from './firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const testFirestoreConnection = async () => {
  try {
    // Add a test document to the "testCollection" collection
    const docRef = await addDoc(collection(db, "testCollection"), {
      testField: "This is a test",
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);

    // Retrieve the document(s) to confirm it was added
    const querySnapshot = await getDocs(collection(db, "testCollection"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().testField}`);
    });

  } catch (e) {
    console.error("Error adding or retrieving document: ", e);
  }
};

function App() {
  useEffect(() => {
    // Test Firestore connection when the component mounts
    testFirestoreConnection();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Testing Firestore Connection</h1>
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/capsule" element={<CapsulePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
