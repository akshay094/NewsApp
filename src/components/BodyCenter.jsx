import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { EventEmitter } from 'eventemitter3';
import Selector from './Selector'


const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const BodyCenter = () => {
  let [topHeadData, setTopHeadData] = useState([]);

  let [category, setCategory] = useState('general')
  let [country, setCountry] = useState('in')
  let [q, setQ] = useState('spacex')
  let [sortBy, setSortBy] = useState('popularity')
  let [page, setPage] = useState(2)

  const sortByArr = ['relevancy', 'popularity', 'publishedAt']
  const countryArr = ['in', 'us', 'cn', 'ca', 'is', 'nz', 'kr', 'au', 'fr', 'de', 'ru', 'jp']
  const headlineArr = ['top-headlines', 'everything']
  const categoryArr = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

  let date = new Date();
  let dateStr = date.getFullYear() + date.getMonth() + date.getDate();

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
        setTopHeadData(response.data.articles)

      } catch (err) {
        console.error(err);
      }
    }
    sendReq();
  }, [country, category, page]);


  return (
    <></>
  )
}

export default BodyCenter
