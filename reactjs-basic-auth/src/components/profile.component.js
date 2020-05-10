import React, { Component } from "react";
import { Typography, Card, CardContent, Paper, Grid } from '@material-ui/core';

import AuthService from "../services/auth.service";

const style = {
  root: {
    minWidth: 275,
    backgroundColor:'#006064',
    marginTop: 20,
    height: 400,
    color: '#e0f7fa'
  },
  title: {
    fontSize: 14,
  },
  paper: {
    spacing: 2,
    textAlign: 'left',
    backgroundColor: '#006064',
    color: '#e0f7fa'
  },
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <Paper>
              <Card style={style.root} variant="outlined">
                <CardContent>
                  <Typography style={style.title} gutterBottom>
                    <h1>Profile : {currentUser.username}</h1>
                  </Typography>
                </CardContent>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper style={style.paper} elevation={0}>
                        <strong>Token:</strong>{" "}
                        {currentUser.basicToken}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper style={style.paper} elevation={0}>
                        <strong>Id:</strong>{" "}
                        {currentUser.id}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper style={style.paper} elevation={0}>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper style={style.paper} elevation={0}>
                        <strong>Authorities:</strong>
                        <ul>
                          {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={4}/>
        </Grid>
      </React.Fragment>
    );
  }
}
