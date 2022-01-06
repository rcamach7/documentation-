import "./App.css";
import React from "react";
import DisplayData from "./components/DisplayData";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <WebsiteTitle />
        <AddNewResource />
        <DisplayData />
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

function AddNewResource() {
  return (
    <div className="AddNewResource">
      <button onClick={() => alert("Hello World")}>Add New Resource</button>
    </div>
  );
}

export default App;
