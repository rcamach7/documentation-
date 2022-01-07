import { useRef } from "react";
import { Note } from "../logic/Notes";
import { useState } from "react";

export default function AddNewResource(props) {
  const [title, setTitle] = useState("");
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

    // Validate Form - we do not allow empty form values.
    if (!isFormValid(title, description, source)) {
      alert("Fill All Fields To Continue");
      return;
    }

    // Construct a new note, then send it to parent:
    const newNote = Note(title, description, source);
    props.handleAddNote(newNote);

    // Clear form value for future submissions, along with current state.
    e.target.form.title.value = "";
    e.target.form.description.value = "";
    e.target.form.source.value = "";
    setTitle("");
    setDescription("");
    setSource("");

    // Re-display our Add New Resource button previously hidden.
    formRef.current.style.display = "none";
    toggleRef.current.style.display = "block";
  };

  const isFormValid = (title, description, source) => {
    if (title === "" || description === "" || source === "") {
      return false;
    }
    return true;
  };

  return (
    <div className="AddNewResource">
      <button ref={toggleRef} onClick={(e) => handleToggle(e)}>
        Add New Resource
      </button>
      <form ref={formRef}>
        <p>Add New Resource</p>
        <br />
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          type="text"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
        <br />

        <label htmlFor="source">Source</label>
        <br />
        <input
          type="text"
          id="source"
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          id="newResource"
          type="submit"
          value="Add Resource"
          onClick={handleSubmission}
        />
        <br />
      </form>
    </div>
  );
}
