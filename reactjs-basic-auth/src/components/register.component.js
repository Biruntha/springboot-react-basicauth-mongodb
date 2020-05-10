import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { Card, CardContent, CardActionArea, Grid, FormControl, Typography } from '@material-ui/core';
import { Face } from '@material-ui/icons';

import AuthService from "../services/auth.service";

const style = {
  root: {
    minWidth: 275,
    backgroundColor:'#006064',
    marginTop: 20,
    color: '#e0f7fa'
  },
}
const required = value => {
  if (!value) {
    return (
      <Typography color='error' variant="overline" display="block" gutterBottom>
          <strong>This field is required!</strong>
      </Typography>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <Typography color='error' variant="overline" display="block" gutterBottom>
          <strong>This is not a valid email.</strong>
      </Typography>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <Typography color='error' variant="overline" display="block" gutterBottom>
          <strong>The username must be between 3 and 20 characters.</strong>
      </Typography>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <Typography color='error' variant="overline" display="block" gutterBottom>
          <strong>The password must be between 6 and 40 characters.</strong>
      </Typography>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}/>
        <Grid item xs={1}/>
        <Grid item xs={3}>
          <Card style={style.root}>
            <CardActionArea>
              <CardContent>
                <Form onSubmit={this.handleRegister}
                  ref={c => {
                    this.form = c;
                  }}
                >
                  {!this.state.successful && (
                  <Grid container spacing={1}>
                      <Grid item xs={12} alignItems='center'>
                        <Face style={{ fontSize: 80 }}/>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <FormControl>
                          <label htmlFor="username">Username</label>
                          <Input type="text" name="username" value={this.state.username}
                            onChange={this.onChangeUsername} validations={[required, vusername]}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <label htmlFor="email">Email</label>
                          <Input type="text" name="email" value={this.state.email}
                            onChange={this.onChangeEmail} validations={[required, email]}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <label htmlFor="password">Password</label>
                          <Input type="password" name="password" value={this.state.password}
                            onChange={this.onChangePassword} validations={[required, vpassword]}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <button>Sign Up</button>
                        </FormControl>
                      </Grid>
                  </Grid>
                  )}
                  {
                    this.state.message && (
                    <div>
                      <Typography color={this.state.successful ? 'primary' : 'error'} variant="overline" display="block" gutterBottom>
                          <strong>{this.state.message}</strong>
                      </Typography>
                    </div>
                  )
                  }
                  <CheckButton style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </CardContent>
            </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
    );
  }
}
