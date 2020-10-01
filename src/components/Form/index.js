import React, { useState } from "react";
import api from "../../services/api";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([]);

  const getBook = async () => {
    try {
      const { data } = await api.get(
        `${inputValue}&key=${process.env.REACT_APP_API_KEY}`
      );
      setBooks(data.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => getBook()}>Click</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Form;
