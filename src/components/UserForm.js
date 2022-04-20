import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormParcelDetails from "./FormParcelDetails";
import SenderFormDetails from "./SenderFormDetails";
import Confirm from "./Confirm";
import Success from "./Success";

export class UserForm extends Component {
  state = {
    step: 1,
    toAddress_name: "",
    toAddress_address: "",
    toAddress_city: "",
    toAddress_state: "",
    toAddress_zip: "",
    toAddress_country: "",
    toAddress_phone: "",
    toAddress_email: "",

    fromAddress_name: "",
    fromAddress_address: "",
    fromAddress_city: "",
    fromAddress_state: "",
    fromAddress_zip: "",
    fromAddress_country: "",
    fromAddress_phone: "",
    fromAddress_email: "",

    parcelLength: "",
    parcelWidth: "",
    parcelHeight: "",
    parcelWeight: "",
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
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
    } = this.state;
    const values = {
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
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <SenderFormDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <FormParcelDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 5:
        return <Success />;
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default UserForm;
