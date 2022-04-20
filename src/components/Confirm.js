import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import backServer from "../config";

export class Confirm extends Component {
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  getResponse = () => {
    console.log(this.props.values);
    Axios.get(`${backServer}/getLabel`, {
      params: {
        values: this.props.values,
      },
    })

      .then((response) => {
        console.log("response: ", response.data.postage_label);
        this.openInNewTab(response.data.postage_label.label_pdf_url);
        this.props.nextStep();
      })
      .then(() => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  render() {
    const {
      values: {
        toAddress_address,
        toAddress_city,
        toAddress_country,
        toAddress_email,
        toAddress_name,
        toAddress_phone,
        toAddress_state,
        toAddress_zip,
        fromAddress_address,
        fromAddress_city,
        fromAddress_country,
        fromAddress_email,
        fromAddress_name,
        fromAddress_phone,
        fromAddress_state,
        fromAddress_zip,
        parcelHeight,
        parcelLength,
        parcelWeight,
        parcelWidth,
      },
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog open fullWidth maxWidth="sm">
            <AppBar title="Confirm User Data" />
            <h2>Confirm Details</h2>

            <h3>Reciever's Info</h3>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={toAddress_name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address" secondary={toAddress_address} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={toAddress_email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="City" secondary={toAddress_city} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Country" secondary={toAddress_country} />
              </ListItem>
              <ListItem>
                <ListItemText primary="State" secondary={toAddress_state} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone No." secondary={toAddress_phone} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Zip Code" secondary={toAddress_zip} />
              </ListItem>
            </List>
            <br />
            <h3>Sender's Info</h3>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={fromAddress_name} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={fromAddress_address}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={fromAddress_email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="City" secondary={fromAddress_city} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Country"
                  secondary={fromAddress_country}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="State" secondary={fromAddress_state} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Phone No."
                  secondary={fromAddress_phone}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Zip Code" secondary={fromAddress_zip} />
              </ListItem>
            </List>
            <br />
            <h3>Parcel Info</h3>
            <List>
              <ListItem>
                <ListItemText primary="Height" secondary={parcelHeight} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Length" secondary={parcelLength} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Weight" secondary={parcelWeight} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Width" secondary={parcelWidth} />
              </ListItem>
            </List>
            <br />
            <Button color="secondary" variant="contained" onClick={this.back}>
              Edit
            </Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.getResponse}
            >
              Confirm & Continue
            </Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
