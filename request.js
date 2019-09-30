const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
listimg_product = [];
axios.all([
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-03'),
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-02')
]).then((data)=>{console.log(data[0])}
).catch(error => {
  console.log(error);
});
