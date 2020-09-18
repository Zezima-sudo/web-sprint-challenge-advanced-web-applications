import React, { useState, useEffect } from "react";
import axios from "axios";
import {axiosWithAuth} from '../utils/useApi'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    getData()
  },[])

  const getData = () => {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
      console.log('get req response ', res)
      setColorList(res.data)
    })
    .catch(err => {
      console.log('get data error ', err)
    })
  }
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getData={getData}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
