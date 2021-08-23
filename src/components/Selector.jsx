import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import { Container, Grid, Button, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EmojiObjects } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Selector = ({ name, list, selection, value }) => {

  const classes = useStyles();

  const handleChange = (event) => {
    selection(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box variant="div">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {
            Array.isArray(list) ? (
              list.map((item, index) => {
                return <MenuItem key={index} value={item}>{item}</MenuItem>
              })) : Object.keys(list).map((item, index) => {
                return <MenuItem key={index} value={list[item]}>{item}</MenuItem>
              })
          }
        </Select>
      </FormControl>
    </Box >
  )
}

export default Selector
// {
//   Array.isArray(list) ? list.map((item, index) => {
//     return <MenuItem key={index} value={item}>{item}</MenuItem>
//   }) : Object.keys(list).map((item, index) => {
//     return <MenuItem key={index} value={list[item]}>{item}</MenuItem>
//   })
// }