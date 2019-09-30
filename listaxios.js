const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


axios.get('https://www.theiconic.com.au/womens-shoes-ankle-boots-sale/?category=560').then(response => {
    const getproduct = (new JSDOM(response.data)).window;
    console.log("getproduct " + getproduct)
    getlink = getproduct.document.querySelectorAll("#catalog-images-wrapper > div > div > figure > a:nth-child(1)")
    var listlink = []
    for (let i = 0; i < getlink.length; i++) { listlink[i] = "https://www.theiconic.com.au" + getlink[i].href }
    response =
        {
            "link": listlink,

        }
    var dem = 1;
    var res2 = []
    let a = listlink.map(result =>{console.log(result)})
    axios.all(listlink.map(result => axios.get(result)))
        .then(axios.spread((...data) => {
            data.forEach(element => {
                console.log(dem++)
                var listimg_product = [];
                const getproduct = (new JSDOM(element.data)).window;
                imglist = getproduct.document.querySelectorAll("#product > div.row.product-content > section.small-12.columns.product-views.large-8.product-views-grid > div.row.product-gallery > div.small-12.columns.product-images.show-for-large-up > div > div > div >a")
                detail = getproduct.document.querySelector("#productDetails > div > div");
                nameproduct = getproduct.document.querySelector("#product > div.row.product-content > section.small-12.columns.product-information.large-4 > div > div:nth-child(1) > div:nth-child(1) > h1")
                for (let i = 0; i < imglist.length; i++) {
                    test = imglist[i].href
                    listimg_product[i] = "https://static.theiconic.com.au/p/" + test.substring(test.indexOf("%2Fp%2F") + 7, test.length)
                    //console.log("imglist "+listimg_product[i])
                }
                bodytext = detail.innerHTML.replace(/\r?\n|\r/g, "")
                res2.push({
                    "name": nameproduct.innerHTML.replace(/\r?\n|\r/g, ""),
                    "img": listimg_product,
                    "bodytext": bodytext,
                })
            });
            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            // res.end(JSON.stringify(response));
            console.log(res2)
        }));
    //console.log(response)
}).catch(error => {
    console.log(error);
});