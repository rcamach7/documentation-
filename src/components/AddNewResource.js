import { useRef } from "react";
import { Note } from "../logic/Notes";
import { useState } from "react";

export default function AddNewResource(props) {
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const formRef = useRef(null);
  const toggleRef = useRef(null);

  const handleToggle = (e) => {
    if (
      formRef.current.style.display === "" ||
      formRef.current.style.display === "none"
    ) {
      formRef.current.style.display = "block";
    } else {
      formRef.current.style.display = "none";
    }

    // Hide Button while form is being filled out
    e.target.style.display = "none";
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    // Construct a new note, then send it to parent:
    const newNote = Note(description, source);
    props.handleAddNote(newNote);

    // Clear form value for future submissions, along with current state.
    e.target.form.description.value = "";
    e.target.form.source.value = "";
    setDescription("");
    setSource("");

    // Re-display our Add New Resource button previously hidden.
    formRef.current.style.display = "none";
    toggleRef.current.style.display = "block";
  };

  return (
    <div className="AddNewResource">
      <button ref={toggleRef} onClick={(e) => handleToggle(e)}>
        Add New Resource
      </button>
      <form ref={formRef}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="source">Source:</label>
        <input
          type="text"
          id="source"
          onChange={(e) => setSource(e.target.value)}
          required
        />

        <input
          id="newResource"
          type="submit"
          value="Add Resource"
          onClick={handleSubmission}
        />
      </form>
    </div>
  );
}
