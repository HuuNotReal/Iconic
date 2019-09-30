const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
listimg_product = [];

axios.get('https://www.theiconic.com.au/gel-nimbus-21-women-s-834404.html').then(response => {
    const getproduct = (new JSDOM(response.data)).window; 
    //console.log(response)
    imglist = getproduct.document.querySelectorAll("#product > div.row.product-content > section.small-12.columns.product-views.large-8.product-views-grid > div.row.product-gallery > div.small-12.columns.product-images.show-for-large-up > div > div > div >a")
    
    detail = getproduct.document.querySelector("#productDetails > div > div");
    for(let i =0;i<imglist.length;i++)
    { test = imglist[i].href
    listimg_product[i] ="https://static.theiconic.com.au/p/" + test.substring(test.indexOf("%2Fp%2F")+7,test.length) 
    //console.log("imglist "+listimg_product[i])
    }
    bodytext = detail.innerHTML.replace(/\r?\n|\r/g, "") 
    response = 
    [
        {
        "img": listimg_product,
        "bodytext": bodytext,
        },
        {
            "img": listimg_product,
            "bodytext": bodytext,
        },
    ]
    var res2=[]
    res2.push({
        "img": listimg_product,
        "bodytext": bodytext,
        })

    console.log(res2)
  }).catch(error => {
    console.log(error);
  });