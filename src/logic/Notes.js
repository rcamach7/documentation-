const Note = (description, source) => {
  const toString = () => {
    return `Description: ${description}. You can access this resource at ${source}`;
  };
  return {
    toString,
  };
};

export { Note };
