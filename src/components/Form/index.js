import React, { useState } from "react";
import "./styles.css";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import SimpleDialog from "../SimpleDialog";
import api from "../../services/api";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([]);
  const [dialog, setDialog] = useState(false);

  const getBook = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.get(
        `${inputValue}&key=${process.env.REACT_APP_API_KEY}`
      );
      setBooks(data.items);
      console.log(data.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="md" className="container">
      <form onSubmit={getBook}>
        <TextField
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label="Book related"
          variant="outlined"
          style={{ margin: "25px 0" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginBottom: "25px" }}
        >
          Search
        </Button>
      </form>

      {dialog && <SimpleDialog dialog={dialog} setDialog={setDialog} />}

      <GridList cellHeight="auto" cols={4} spacing={2}>
        {books.map((book) => (
          <GridListTile key={book.id} cols={1} className="book">
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              style={{ opacity: "0.7" }}
            />
            <GridListTileBar
              title={book.volumeInfo.title}
              subtitle={
                <span>
                  by: {book.volumeInfo.authors && book.volumeInfo.authors[0]}
                </span>
              }
              actionIcon={
                <IconButton
                  aria-label={`buy ${book.volumeInfo.title}`}
                  onClick={() =>
                    book.saleInfo.saleability === "FOR_SALE" && setDialog(book)
                  }
                >
                  {book.saleInfo.saleability === "FOR_SALE" && (
                    <ShoppingCartIcon style={{ color: "#fff" }} />
                  )}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
};

export default Form;
