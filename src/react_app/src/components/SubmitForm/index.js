import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SubmitForm = ({ handleSubmit, handleClick, pauseText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField label="Size X" name="sizeX" id="sizeX" type="number" />
      </div>
      <div>
        <TextField label="Size Y" name="sizeY" id="sizeY" type="number" />
      </div>
      <div>
        <TextField label="Speed" name="speed" id="speed" type="number" />
      </div>
      <div>
        <Button type="submit" variant="contained">
          Update
        </Button>
        <Button variant="contained" onClick={handleClick} type="button" id="pause">
          {pauseText}
        </Button>
      </div>
    </form>
  );
};

export default SubmitForm;
