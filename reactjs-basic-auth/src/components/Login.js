import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Card, CardContent, Typography, CardActionArea, Grid, FormControl, CircularProgress } from '@material-ui/core';
import { Face } from '@material-ui/icons';

import AuthService from "../services/auth.service";

const style = {
  root: {
    minWidth: 275,
    backgroundColor:'#006064',
    marginTop: 20,
    color: '#e0f7fa'
  }
}


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    AuthService.login(this.state.username, this.state.password)
      .then(() => {
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={5}/>
        <Grid item xs={2}>
          <Card style={style.root}>
            <CardActionArea>
              <CardContent>
                <Form onSubmit={this.handleLogin}>
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
                          <label htmlFor="password">Password</label>
                          <Input type="password" name="password" value={this.state.password}
                            onChange={this.onChangePassword}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl marginTop='20'>
                          <button disabled={this.state.loading}>
                            {this.state.loading && (
                              <CircularProgress size='10'/>
                            )}
                            <span>Login</span>
                          </button>
                        </FormControl>
                      </Grid>
                  </Grid>
                  {this.state.message && (
                    <div>
                      <Typography color='error' variant="overline" display="block" gutterBottom>
                          <strong>{this.state.message}</strong>
                      </Typography>
                    </div>
                  )}
                </Form>
              </CardContent>
            </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={5}/>
      </Grid>
    );
  }
}
