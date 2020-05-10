import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

const required = value => {
  if (!value) {
    return (
      <Typography color='error' variant="overline" display="block" gutterBottom>
          <strong>This field is required!</strong>
      </Typography>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
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
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={5}/>
        <Grid item xs={2}>
          <Card style={style.root}>
            <CardActionArea>
              <CardContent>
                <Form onSubmit={this.handleLogin}
                  ref={c => {
                    this.form = c;
                  }}
                >
                  <Grid container spacing={1}>
                      <Grid item xs={12} alignItems='center'>
                        <Face style={{ fontSize: 80 }}/>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <label htmlFor="username">Username</label>
                          <Input type="text" name="username" value={this.state.username}
                            onChange={this.onChangeUsername} validations={[required]} />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl>
                          <label htmlFor="password">Password</label>
                          <Input type="password" name="password" value={this.state.password}
                            onChange={this.onChangePassword} validations={[required]}/>
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
        <Grid item xs={5}/>
      </Grid>
    );
  }
}
