import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Note as NewNote } from "../logic/Notes";

const EditForm = (props) => {
  const [title, setTitle] = useState(props.note.title);
  const [description, setDescription] = useState(props.note.description);
  const [source, setSource] = useState(props.note.source);
  const editFormRef = useRef(null);

  useEffect(() => {
    if (props.display) {
      editFormRef.current.style.display = "block";
    } else {
      editFormRef.current.style.display = "none";
    }
  }, [props.display]);

  const cancelEdit = (e) => {
    e.preventDefault();

    props.handleDisableForm();
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    props.handleEditNote(NewNote(title, description, source, props.note.id));
    props.handleDisableForm();
  };

  return (
    <div className="EditForm">
      <form ref={editFormRef}>
        <div className="form-title">
          <button
            className="form-title-closeBtn"
            onClick={(e) => cancelEdit(e)}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <br />

        <label htmlFor="source">Source</label>
        <br />
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <br />
        <br />

        <input
          className="btn btn-form"
          id="newResource"
          type="submit"
          value="Save Changes"
          onClick={(e) => handleSubmitEdit(e)}
        />
        <br />
      </form>
    </div>
  );
};

export default EditForm;
