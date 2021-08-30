import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Selector from './Selector'
import { Grid, Typography, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import ImgMediaCard from './Card'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const BodyCenter = () => {

  let date = new Date();
  let dateStr = (date.getMonth() < 10) ? date.getFullYear() + '-0' + date.getMonth() + '-' + date.getDate() : date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + " " + "00:00:00";


  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  let [topHeadData, setTopHeadData] = useState([]);
  let [from, setFrom] = useState(dateStr);
  let [to, setTo] = useState(dateStr);
  let [category, setCategory] = useState('news')
  let [country, setCountry] = useState('IN')
  // let [q, setQ] = useState('news')
  let [sortBy, setSortBy] = useState('popularity')
  let [page, setPage] = useState(1)
  let [totalPages, setTotalPages] = useState(10);
  const sortByArr = ['relevancy', 'popularity', 'publishedAt']

  // const countryArr = { India: 'IN', USA: 'US', France: 'FR', 'United Kingdom': 'GB', Australia: 'AU', Japan: 'JP', Russia: 'RU' }
  // date format = YYYY/MM/DD
  // const headlineArr = ['top-headlines', 'everything']

  const categoryArr = ['news', 'sport', 'tech', 'finance', 'politics', 'business', 'economics', 'entertainment', 'beauty', 'gaming']

  function handleClick(e) {
    setPage(e.target.innerText)
  }

  function handleToDate(e) {
    let val = e.target.value;
    let result = val.split('-').join('/') + " " + "00:00:00";
    console.log(result);
    setTo(result);
  }

  function handleFromDate(e) {
    let val = e.target.value;
    let result = val.split('-').join('/') + " " + "00:00:00";
    console.log(result);
    setFrom(result);
  }

  useEffect(() => {
    console.log(to);
    console.log(from);
    const ever = {
      method: 'GET',
      url: ``,
      headers: {
        accept: 'application/json',
      }
    };
    // , from: `${from}`, to: `${to}`
    var topHead = {
      method: 'GET',
      url: 'https://free-news.p.rapidapi.com/v1/search',
      params: { q: `${category}`, lang: 'en', page: `${page}`, page_size: '10' },
      headers: {
        'x-rapidapi-host': 'free-news.p.rapidapi.com',
        'x-rapidapi-key': '1272c6971bmsh34e8d3c1bf22d59p14bc93jsn4b0e37fc06b2'
      }
    };

    const sendReq = async () => {
      try {
        let response = await axios.request(topHead);
        console.log(response.data.articles);
        // console.log(response.data.total_pages);
        setTotalPages(Math.ceil((response.data.total_pages) / 10));
        setTopHeadData(response.data.articles)

      } catch (err) {
        console.error(err);
      }
    }
    sendReq();
  }, [country, category, page]);


  return (
    <>
      <br />
      <br />
      <Grid container justifyContent="center" className={classes.root} setSpacing={2} align="center">

        <Grid item xs={6}>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="From"
              type="date"
              onChange={handleToDate}
              defaultValue={dateStr}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <br />
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="To"
              type="date"
              onChange={handleFromDate}
              defaultValue={dateStr}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
        <Grid item xs={6}>
          <Box variant="div">
            <Typography variant="p">Category</Typography>
          </Box>
          <Selector name="Category" list={categoryArr} selection={setCategory} value={category} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container justifyContent="center" className={classes.root} setSpacing={2} align="center">

        <Grid item xs={12}>
          <Box m={3}>
            <Typography variant="h5" m>Top Headlines</Typography>
          </Box>
        </Grid>
        {
          topHeadData.map((item, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Box key={index} display="flex" alignItems="center" justifyContent="center" m={3} p={1}>
                  <ImgMediaCard key={index} img={item.media} title={item.title} url={item.link} date={item.published_date} description={item.summary} />
                </Box>
              </Grid>
            )
          }
          )
        }

      </Grid>

      {/* Pagination Component Start*/}
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center" p={4}>
            <Pagination size="medium" count={totalPages} onClick={handleClick} color="primary" />
          </Box>
        </Grid>
      </Grid>
      {/* Pagination Component End*/}


    </>
  )
}

export default BodyCenter
