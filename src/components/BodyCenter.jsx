import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Selector from './Selector'
import { Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import ImgMediaCard from './Card'


const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

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

  let [category, setCategory] = useState('top')
  let [country, setCountry] = useState('in')
  let [q, setQ] = useState('spacex')
  let [sortBy, setSortBy] = useState('popularity')
  let [page, setPage] = useState(1)
  let [totalPages, setTotalPages] = useState(10);
  const sortByArr = ['relevancy', 'popularity', 'publishedAt']

  const countryArr = { India: 'in', USA: 'us', Canada: 'ca', Australia: 'au', Japan: 'jp' }

  const headlineArr = ['top-headlines', 'everything']

  const categoryArr = ['business', 'entertainment', 'top', 'health', 'science', 'sports', 'technology']

  let date = new Date();
  let dateStr = date.getFullYear() + date.getMonth() + date.getDate();


  function handleClick(e) {
    setPage(e.target.innerText)
  }

  useEffect(() => {

    const ever = {
      method: 'GET',
      url: ``,
      headers: {
        accept: 'application/json',
      }
    };
    // https://newsdata.io/api/1/sources?country=${country}&category=${category}&language=en&&page=${page}&apiKey=${API_KEY}
    const topHead = {
      method: 'GET',
      url: `${proxyUrl}https://newsdata.io/api/1/news?country=${country}&category=${category}&language=en&page=${page}&apiKey=${API_KEY}`,
      headers: {
        accept: 'application/json',
      }
    };
    const sendReq = async () => {
      try {
        let response = await axios.request(topHead);
        console.log(response.data.results);
        setTotalPages(Math.ceil((response.data.totalResults) / 10));
        setTopHeadData(response.data.results)

      } catch (err) {
        console.error(err);
      }
    }
    sendReq();
  }, [country, category, page]);


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
          topHeadData.filter((data) => data.image_url
          ).map((item, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Box key={index} display="flex" alignItems="center" justifyContent="center" m={3} p={1}>
                  <ImgMediaCard key={index} img={item.image_url} title={item.title} url={item.link} date={item.pubDate} description={item.content} />
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
