import React, { useState } from "react";
import { Button, Modal, TextField, Container, Typography, Box } from "@mui/material";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [meaning, setMeaning] = useState({
    word: "",
    definition: []
  });
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    setSearchText(e.target.value);
    setErr(false);
  };

  const retriveData = data => {
    const definition = [];
    data.meanings.forEach(ele => {
      ele.definitions.forEach(element => {
        definition.push(element.definition);
      });
    });
    setMeaning({
      word: data.word,
      definition
    });
    setShowModal(true);
  };

  const handleClick = () => {
    if (searchText.length) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 404) {
          setErr(true);
          setErrMessage(`Could not find meaning of ${searchText}`);
          return
        } else {
          return response.json();
        }
      }).then(response => {
        retriveData(response[0]);
      }).catch(error => {
        console.log(error);
      });
    } else {
      setErr(true);
      setErrMessage("Please provide some input");
    }
  };

  const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, 10%)',
    width: '70%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <h1> Dictionary </h1>
        <TextField
          error={err}
          id="standard-basic"
          label="Search"
          variant="standard"
          helperText={err ? errMessage : ""}
          onChange={handleChange}
        />
      <div style={{ margin: "10px" }}>
        <Button variant="contained" onClick={handleClick}>Search</Button>
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Meaning for word {meaning.word}
          </Typography>
          {meaning.definition.map((ele , index) => (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {index+1} : {ele}
            </Typography>
          ))}
        </Box>
      </Modal>
    </Container>
  )
};

export default App