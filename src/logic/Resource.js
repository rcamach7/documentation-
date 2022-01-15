import { v4 as uuidv4 } from "uuid";

const Resource = (title, description, source, idIn) => {
  let id = idIn;
  const generateId = () => {
    if (idIn == null) {
      id = uuidv4();
    } else {
      id = idIn;
    }
  };
  generateId();
  return {
    id,
    title,
    description,
    source,
    toString,
  };
};

export { Resource };
