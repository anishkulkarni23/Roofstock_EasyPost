import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validator from "validator";

export class FormUserDetails extends Component {
  validate = (e) => {
    console.log(e);
    if (
      validator.isEmpty(e.toAddress_name) ||
      validator.isEmpty(e.toAddress_address) ||
      validator.isEmpty(e.toAddress_city) ||
      validator.isEmpty(e.toAddress_state) ||
      validator.isEmpty(e.toAddress_zip) ||
      validator.isEmpty(e.toAddress_country) ||
      validator.isEmpty(e.toAddress_phone) ||
      validator.isEmpty(e.toAddress_email)
    ) {
      alert("Please fill all the details");
    } else if (!validator.isEmail(e.toAddress_email)) {
      alert("Please enter a valid email address");
    } else if (!validator.isMobilePhone(e.toAddress_phone)) {
      alert("Please Enter a Valid phone no.");
    } else if (!validator.isNumeric(e.toAddress_zip)) {
      alert("Please Enter a Valid Zip ");
    } else {
      this.props.nextStep();
    }
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog open fullWidth maxWidth="sm">
            <h2>Enter Reciever's Details</h2>
            <TextField
              placeholder="Enter Reciever's Name"
              label="Name"
              onChange={handleChange("toAddress_name")}
              defaultValue={values.toAddress_name}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Reciever's Address"
              label="Address"
              onChange={handleChange("toAddress_address")}
              defaultValue={values.toAddress_address}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter City"
              label="City"
              onChange={handleChange("toAddress_city")}
              defaultValue={values.toAddress_city}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter State"
              label="State"
              onChange={handleChange("toAddress_state")}
              defaultValue={values.toAddress_state}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Zip"
              label="Zip"
              onChange={handleChange("toAddress_zip")}
              defaultValue={values.toAddress_zip}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Country"
              label="Country"
              onChange={handleChange("toAddress_country")}
              defaultValue={values.toAddress_country}
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Enter Phone no."
              label="Phone"
              onChange={handleChange("toAddress_phone")}
              defaultValue={values.toAddress_phone}
              margin="normal"
              fullWidth
              required
            />
            <br />

            <TextField
              placeholder="Enter Your Email"
              label="Email"
              onChange={handleChange("toAddress_email")}
              defaultValue={values.toAddress_email}
              margin="normal"
              fullWidth
              required
            />
            <br />
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

export default FormUserDetails;
