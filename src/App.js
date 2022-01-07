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
} from "firebase/firestore";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.handleAddNote = this.handleAddNote.bind(this);
    this.loadDatabase = this.loadDatabase.bind(this);
  }

  componentDidMount() {
    const firebaseAppConfig = getFirebaseConfig();
    initializeApp(firebaseAppConfig);

    this.loadDatabase();
  }

  async loadDatabase() {
    const data = [];

    // Reference the database that you want to work with.
    const allResources = collection(getFirestore(), "resources");
    // Perform a query search against that database.
    const q = query(allResources);
    // Retrieve results from your query.
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((resource) => {
      // Convert back to Note object before we insert into our state.
      const rawData = resource.data();
      data.push(Note(rawData.title, rawData.description, rawData.source));
    });

    // Update our state
    this.setState({
      notes: data,
    });
  }

  handleAddNote(newNote) {
    try {
      addDoc(collection(getFirestore(), "resources"), {
        title: newNote.title,
        description: newNote.description,
        source: newNote.source,
      });
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
    this.loadDatabase();
  }

  render() {
    return (
      <div className="App">
        <WebsiteTitle />
        <DisplayData notes={this.state.notes} />
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

export default App;
