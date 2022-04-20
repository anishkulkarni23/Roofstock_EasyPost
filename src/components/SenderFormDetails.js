import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validator from "validator";

export class SenderFormDetails extends Component {
  validate = (e) => {
    console.log(e);
    if (
      validator.isEmpty(e.fromAddress_name) ||
      validator.isEmpty(e.fromAddress_address) ||
      validator.isEmpty(e.fromAddress_city) ||
      validator.isEmpty(e.fromAddress_state) ||
      validator.isEmpty(e.fromAddress_zip) ||
      validator.isEmpty(e.fromAddress_country) ||
      validator.isEmpty(e.fromAddress_phone) ||
      validator.isEmpty(e.fromAddress_email)
    ) {
      alert("Please fill all the details");
    } else if (!validator.isEmail(e.fromAddress_email)) {
      alert("Please enter a valid email address");
    } else if (!validator.isMobilePhone(e.fromAddress_phone)) {
      alert("Please Enter a Valid phone no.");
    } else if (!validator.isNumeric(e.fromAddress_zip)) {
      alert("Please Enter a Valid Zip ");
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
            <h2>Enter Sender Details</h2>
            <TextField
              placeholder="Enter Sender's Name"
              label="Name"
              onChange={handleChange("fromAddress_name")}
              defaultValue={values.fromAddress_name}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Sender's Address"
              label="Address"
              onChange={handleChange("fromAddress_address")}
              defaultValue={values.fromAddress_address}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter City"
              label="City"
              onChange={handleChange("fromAddress_city")}
              defaultValue={values.fromAddress_city}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter State"
              label="State"
              onChange={handleChange("fromAddress_state")}
              defaultValue={values.fromAddress_state}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Zip"
              label="Zip"
              onChange={handleChange("fromAddress_zip")}
              defaultValue={values.fromAddress_zip}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Country"
              label="Country"
              onChange={handleChange("fromAddress_country")}
              defaultValue={values.fromAddress_country}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Phone no."
              label="Phone"
              onChange={handleChange("fromAddress_phone")}
              defaultValue={values.fromAddress_phone}
              margin="normal"
              fullWidth
              required
            />
            <br />

            <TextField
              placeholder="Enter Your Email"
              label="Email"
              onChange={handleChange("fromAddress_email")}
              defaultValue={values.fromAddress_email}
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

export default SenderFormDetails;
