import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validator from "validator";

export class FormParcelDetails extends Component {
  validate = (e) => {
    console.log(e);
    if (
      validator.isEmpty(e.parcelHeight) ||
      validator.isEmpty(e.parcelLength) ||
      validator.isEmpty(e.parcelWeight) ||
      validator.isEmpty(e.parcelWidth)
    ) {
      alert("Please fill all the details");
    } else if (
      !validator.isNumeric(e.parcelHeight) ||
      !validator.isNumeric(e.parcelLength) ||
      !validator.isNumeric(e.parcelWeight) ||
      !validator.isNumeric(e.parcelWidth)
    ) {
      alert("Please valid details ");
    } else {
      this.props.nextStep();
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog open fullWidth maxWidth="sm">
            <h2>Enter Parcel Details</h2>

            <TextField
              placeholder="Enter Parcel Length"
              label="Length"
              onChange={handleChange("parcelLength")}
              defaultValue={values.parcelLength}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Parcel Width"
              label="Width"
              onChange={handleChange("parcelWidth")}
              defaultValue={values.parcelWidth}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Parcel Height"
              label="Height"
              onChange={handleChange("parcelHeight")}
              defaultValue={values.parcelHeight}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Parcel Weight"
              label="Weight"
              onChange={handleChange("parcelWeight")}
              defaultValue={values.parcelWeight}
              margin="normal"
              fullWidth
              required
            />
            <br />

            <Button color="secondary" variant="contained" onClick={this.back}>
              Back
            </Button>

            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.validate(values);
              }}
            >
              Continue
            </Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormParcelDetails;
