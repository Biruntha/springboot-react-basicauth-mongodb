import React from 'react'
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor:'#1a237e',
      color: '#c5cae9'
    },
});

function Footer() {
    const classes = useStyles();
    let fullYear = new Date().getFullYear();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Typography variant="overline" align="center">
                {fullYear}-{fullYear+1}, All Rights Reserved by Biruntha
            </Typography>
        </AppBar>
    )
}

export default Footer