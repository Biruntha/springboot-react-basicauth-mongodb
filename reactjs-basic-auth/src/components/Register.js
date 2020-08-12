import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

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

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

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

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}/>
        <Grid item xs={1}/>
        <Grid item xs={3}>
          <Card style={style.root}>
            <CardActionArea>
              <CardContent>
                <Form onSubmit={this.handleRegister}>
                  {!this.state.successful && (
                  <Grid container spacing={1}>
                      <Grid item xs={12} alignItems='center'>
                        <Face style={{ fontSize: 80 }}/>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <FormControl>
                          <label htmlFor="username">Username</label>
                          <Input type="text" name="username" value={this.state.username}
                            onChange={this.onChangeUsername}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <label htmlFor="email">Email</label>
                          <Input type="text" name="email" value={this.state.email}
                            onChange={this.onChangeEmail}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <label htmlFor="password">Password</label>
                          <Input type="password" name="password" value={this.state.password}
                            onChange={this.onChangePassword}/>
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
