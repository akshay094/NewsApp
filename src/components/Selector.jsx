import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
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
  )
}

export default Selector
