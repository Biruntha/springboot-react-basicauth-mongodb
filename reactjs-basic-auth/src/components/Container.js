import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const style = {
    root: {
      minWidth: 275,
      backgroundColor:'#006064',
      marginTop: 20,
      height: 200,
      color: '#e0f7fa'
    },
    title: {
      fontSize: 24,
      textAlign:'center'
    },
}

function Container(props) {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={2}/>
          <Grid item xs={8}>
            <Paper>
              <Card style={style.root} variant="outlined">
                <CardContent>
                  <Typography variant="overline" display="block" style={style.title} gutterBottom>
                    {props.content}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={2}/>
        </Grid>
      </React.Fragment>
    )
}

export default Container
