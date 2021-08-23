import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Selector from './Selector'
import { Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import ImgMediaCard from './Card'

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

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

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  let [topHeadData, setTopHeadData] = useState([]);

  let [category, setCategory] = useState('general')
  let [country, setCountry] = useState('in')
  let [q, setQ] = useState('spacex')
  let [sortBy, setSortBy] = useState('popularity')
  let [page, setPage] = useState(1)
  let [totalPages, setTotalPages] = useState(10);
  const sortByArr = ['relevancy', 'popularity', 'publishedAt']

  const countryArr = { India: 'in', USA: 'us', China: 'cn', Canada: 'ca', Israel: 'is', 'New Zealand': 'nz', 'South Korea': 'kr', Australia: 'au', France: 'fr', Germany: 'de', Russia: 'ru', Japan: 'jp' }

  const headlineArr = ['top-headlines', 'everything']

  const categoryArr = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

  let date = new Date();
  let dateStr = date.getFullYear() + date.getMonth() + date.getDate();


  function handleClick(e) {
    setPage(e.target.innerText)
  }

  useEffect(() => {

    const ever = {
      method: 'GET',
      url: `https://newsapi.org/v2/everything?q=${q}&from=${dateStr}&to=${dateStr}&sortBy=${sortBy}&pageSize=10&page=${page}&apiKey=${API_KEY}`,
      headers: {
        accept: 'application/json',
      }
    };

    const topHead = {
      method: 'GET',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&page=${page}&apiKey=${API_KEY}`,
      headers: {
        accept: 'application/json',
      }
    };
    const sendReq = async () => {
      try {
        let response = await axios.request(topHead);
        console.log(response.data.articles);
        setTotalPages(Math.ceil((response.data.totalResults) / 10));
        setTopHeadData(response.data.articles)

      } catch (err) {
        console.error(err);
      }
    }
    sendReq();
  }, [country, category, page]);

  useEffect(() => {
    setPage(1)
  }, [country, category])

  return (
    <>
      <Grid container justifyContent="center" className={classes.root} setSpacing={2} align="center">
        <Grid item xs={6}>
          <Box variant="div">
            <Typography variant="p">Country</Typography>
          </Box>
          <Selector name="Country" list={countryArr} selection={setCountry} value={country} />
        </Grid>
        <Grid item xs={6}>
          <Box variant="div">
            <Typography variant="p">Category</Typography>
          </Box>
          <Selector name="Category" list={categoryArr} selection={setCategory} value={category} />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" className={classes.root} setSpacing={2} align="center">

        <Grid item xs={12}>
          <Box m={3}>
            <Typography variant="h5" m>Top Headlines</Typography>
          </Box>
        </Grid>
        {
          topHeadData.filter((data) => data.urlToImage).map((item, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Box key={index} display="flex" alignItems="center" justifyContent="center" m={3} p={1}>
                  <ImgMediaCard key={index} img={item.urlToImage} title={item.title} url={item.url} date={item.publishedAt.slice(0, 10)} description={item.content} />
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
