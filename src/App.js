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
  updateDoc,
} from "firebase/firestore";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faPlus,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.loadDatabase = this.loadDatabase.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
  }

  componentDidMount() {
    const firebaseAppConfig = getFirebaseConfig();
    initializeApp(firebaseAppConfig);

    this.loadDatabase();
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

  async handleEditNote(note) {
    const docReference = doc(getFirestore(), "resources", note.id);
    await updateDoc(docReference, {
      title: note.title,
      description: note.description,
      source: note.source,
    });
    // Reload database to container
    this.loadDatabase();
  }

  render() {
    return (
      <div className="App">
        <WebsiteTitle />
        <DisplayData
          notes={this.state.notes}
          handleDeleteNote={this.handleDeleteNote}
          handleEditNote={this.handleEditNote}
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

library.add(faWindowClose, faPlus, faTrashAlt, faEdit);
export default App;
