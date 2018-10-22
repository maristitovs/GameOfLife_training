import React from "react";
import "./styles.css";
import TextField from "@material-ui/core/TextField";

const SubmitForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="sizeX">Size X</label>
        <input type="number" name="sizeX" id="sizeX" />
      </div>
      <div>
        <label htmlFor="sizeY" />
        Size Y<input type="number" name="sizeY" id="sizeY" />
      </div>
      <div>
        <label htmlFor="speed">Speed</label>
        <input type="number" name="speed" id="speed" />
      </div>
      <div>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default SubmitForm;
