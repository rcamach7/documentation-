import "./App.css";
import React, { useEffect, useState } from "react";
import { Resource } from "./logic/Resource";
import ResourceContainer from "./components/ResourceContainer";
import AddNewResource from "./components/AddNewResource";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./logic/config";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faPlus,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const firebaseAppConfig = getFirebaseConfig();
    initializeApp(firebaseAppConfig);

    loadDatabase();
  }, []);

  const loadDatabase = async () => {
    const data = [];
    // Request Data from our database.
    const querySnapshot = await getDocs(
      query(collection(getFirestore(), "resources"))
    );
    querySnapshot.forEach((resource) => {
      const rawData = resource.data();
      data.push(
        Resource(rawData.title, rawData.description, rawData.source, rawData.id)
      );
    });

    // Update our state
    setResources(data);
  };

  const handleAddResource = async (newResource) => {
    try {
      await setDoc(doc(getFirestore(), "resources", newResource.id), {
        title: newResource.title,
        description: newResource.description,
        source: newResource.source,
        id: newResource.id,
      });
    } catch (error) {
      console.error("Error writing to database", error);
    }
    loadDatabase();
  };

  const handleDeleteResource = async (documentId) => {
    await deleteDoc(doc(getFirestore(), "resources", documentId));
    loadDatabase();
  };

  const handleEditResource = async (resource) => {
    const docReference = doc(getFirestore(), "resources", resource.id);
    await updateDoc(docReference, {
      title: resource.title,
      description: resource.description,
      source: resource.source,
    });

    loadDatabase();
  };

  return (
    <div className="App">
      <WebsiteTitle />
      <ResourceContainer
        resources={resources}
        handleDeleteResource={handleDeleteResource}
        handleEditResource={handleEditResource}
      />
      <AddNewResource handleAddResource={handleAddResource} />
    </div>
  );
}

function WebsiteTitle() {
  return (
    <div className="App-title">
      <h1>Documentation & Resources</h1>
    </div>
  );
}

library.add(faWindowClose, faPlus, faTrashAlt, faEdit);
export default App;
