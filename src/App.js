import "./App.css";
import React from "react";
import DisplayData from "./components/DisplayData";
import AddNewResource from "./components/AddNewResource";
import { Note } from "./logic/Notes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.handleAddNote = this.handleAddNote.bind(this);
  }

  componentDidMount() {
    const defaultNotes = [];
    defaultNotes.push(
      Note("CSS Cheat Sheet", "https://htmlcheatsheet.com/css/")
    );
    defaultNotes.push(
      Note(
        "Complete Guide To Flexbox",
        "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
      )
    );
    defaultNotes.push(
      Note(
        "Webpack - Getting Started",
        "https://webpack.js.org/guides/asset-management/"
      )
    );

    this.setState({
      notes: defaultNotes,
    });
  }

  handleAddNote(newNote) {
    const newCollection = this.state.notes;
    newCollection.push(newNote);

    this.setState({
      notes: newCollection,
    });
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
      <h1>Documentations & Resources</h1>
    </div>
  );
}

export default App;
