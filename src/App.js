import "./App.css";
import React from "react";
import { Note } from "./logic/Notes";
import DisplayData from "./components/DisplayData";
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
} from "firebase/firestore";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      db: {},
    };
    this.handleAddNote = this.handleAddNote.bind(this);
    this.loadDatabase = this.loadDatabase.bind(this);
  }

  componentDidMount() {
    const firebaseAppConfig = getFirebaseConfig();
    initializeApp(firebaseAppConfig);

    // Get our DB
    const db = getFirestore();
    this.setState({
      db: db,
    });

    this.loadDatabase();
  }

  async loadDatabase() {
    const data = [];
    // Request Data from our database.
    const querySnapshot = await getDocs(
      query(collection(getFirestore(), "resources"))
    );
    querySnapshot.forEach((resource) => {
      const rawData = resource.data();
      data.push(
        Note(rawData.title, rawData.description, rawData.source, rawData.id)
      );
    });

    // Update our state
    this.setState({
      notes: data,
    });
  }

  async handleAddNote(newNote) {
    try {
      await setDoc(doc(getFirestore(), "resources", newNote.id), {
        title: newNote.title,
        description: newNote.description,
        source: newNote.source,
        id: newNote.id,
      });
    } catch (error) {
      console.error("Error writing to database", error);
    }
    this.loadDatabase();
  }

  async handleDeleteNote(documentId) {
    await deleteDoc(doc(getFirestore(), "resources", documentId));
  }

  render() {
    return (
      <div className="App">
        <WebsiteTitle />
        <DisplayData
          notes={this.state.notes}
          handleDeleteNote={this.handleDeleteNote}
        />
        <AddNewResource handleAddNote={this.handleAddNote} />
      </div>
    );
  }
}

function WebsiteTitle() {
  return (
    <div className="App-title">
      <h1>Documentation & Resources</h1>
    </div>
  );
}

library.add(faWindowClose, faPlus, faTrashAlt);
export default App;
