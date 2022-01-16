import { Resource } from "../logic/Resource";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddNewResource(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");

  const handleSubmission = (e) => {
    e.preventDefault();

    // Validate Form - we do not allow empty form values.
    if (!isFormValid(title, description, source)) {
      alert("Fill All Fields To Continue");
      return;
    }

    // Construct a new note, then send it to parent:
    const newResource = Resource(title, description, source);
    props.handleAddResource(newResource);

    // Clear form value for future submissions, along with current state.
    e.target.form.title.value = "";
    e.target.form.description.value = "";
    e.target.form.source.value = "";
    setTitle("");
    setDescription("");
    setSource("");

    props.toggleForm();
  };
  const isFormValid = (title, description, source) => {
    if (title === "" || description === "" || source === "") {
      return false;
    }
    return true;
  };

  return (
    <div className="AddNewResource">
      <form className="addNewResource-form">
        <div className="form-title">
          <button
            className="form-title-closeBtn"
            onClick={(e) => props.toggleForm}
          >
            <FontAwesomeIcon icon="window-close" size="1x" />
          </button>
        </div>
        {/* BEGIN FORM INPUT */}
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          type="text"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <br />

        <label htmlFor="source">Source</label>
        <br />
        <input
          type="text"
          id="source"
          onChange={(e) => setSource(e.target.value)}
        />
        <br />
        <br />

        <input
          className="btn btn-form"
          id="newResource"
          type="submit"
          value="Submit"
          onClick={handleSubmission}
        />
        <br />
      </form>
    </div>
  );
}
