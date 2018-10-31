import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const SubmitForm = ({ handleSubmit, handleClick, pauseText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField label="Size X" name="sizeX" type="number" />
      </div>
      <div>
        <TextField label="Size Y" name="sizeY" type="number" />
      </div>
      <div>
        <TextField label="Speed" name="speed" type="number" />
      </div>
      <Grid container spacing={16}>
        <Grid item>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleClick} type="button">
            {pauseText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubmitForm;
