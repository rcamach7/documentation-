const Note = (title, description, source) => {
  const toString = () => {
    return `Description: ${description}. You can access this resource at ${source}`;
  };
  return {
    title,
    description,
    source,
    toString,
  };
};

export { Note };
