import React from 'react';
import { db } from './firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import logo from './assets/images/logo.svg';
import './assets/styles/App.css';

const addTestData = async () => {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      name: "Test User",
      age: 30
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>Hello, CapSoul!</h1>
          <button onClick={addTestData}>Add Test Data</button>
        </div>
      </header>
    </div>
  );
}

export default App;