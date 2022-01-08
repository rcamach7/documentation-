import { v4 as uuidv4 } from "uuid";

const Note = (title, description, source, idIn) => {
  let id = idIn;
  const generateId = () => {
    if (idIn == null) {
      id = uuidv4();
    } else {
      id = idIn;
    }
  };
  const toString = () => {
    return `Description: ${description}. You can access this resource at ${source}`;
  };
  // Will check to see if we need to generate an ID or if we were given one in initialization.
  generateId();
  return {
    id,
    title,
    description,
    source,
    toString,
  };
};

export { Note };
