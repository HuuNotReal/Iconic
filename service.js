const url = require('url');
var request = require("request");
const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function alertFinished(){

    console.log('Finished add data');
}
async function parseData(error, response, body) {
    if (error) throw new Error(error);
  
    //console.log(body);
    const getproduct = (await new JSDOM(body)).window; 
    vip = getproduct.document.querySelectorAll("#product > div.row.product-content > section.small-12.columns.product-views.large-8.product-views-grid > div.row.product-gallery > div.small-12.columns.product-images.show-for-large-up > div > div > div >a")
    for(let i =0;i<vip.length;i++)
    { test = vip[i].href
    listimg_product[i] =await "https://static.theiconic.com.au/p/" + test.substring(test.indexOf("%2Fp%2F")+7,test.length) 
    console.log(listimg_product[i])
    }
    console.log("done parse")
    //console.log(listimg_product)
    return listimg_product;
  }
function getimg (get_products,callback){

    request(get_products,parseData)
      
    callback();
    
}

exports.sampleRequest = async function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    var altname = 'heyhey'
    var link = 'nolink'
    var b;
    var get_products
    var listimg_product=[];
    if (reqUrl.query.link) {
        console.log(reqUrl.query.link)
        link = reqUrl.query.link
        //link = "https://www.theiconic.com.au/womens-shoes-boots/?page=1&sort=popularity&brand=blundstone"
        console.log(link)
        axios.get(link).then(response => {
            const getproduct = (new JSDOM(response.data)).window; 
            console.log("getproduct "+getproduct)
            getlink = getproduct.document.querySelectorAll("#catalog-images-wrapper > div > div > figure > a:nth-child(1)")
            var listlink = []
            for(let i =0;i<getlink.length;i++)
            { listlink[i] = "https://www.theiconic.com.au"+getlink[i].href}
            response = 
            {
                "link": listlink,
        
            }
            var dem=1;
            var res2=[]
            //let a = listlink.map(result =>{console.log(result)})
            axios.all(listlink.map(result =>axios.get(result)))
            .then(axios.spread((...data)=>{
                data.forEach(element => {
                    console.log(dem++)
                    var listimg_product = [];
                    const getproduct = (new JSDOM(element.data)).window; 
                    imglist = getproduct.document.querySelectorAll("#product > div.row.product-content > section.small-12.columns.product-views.large-8.product-views-grid > div.row.product-gallery > div.small-12.columns.product-images.show-for-large-up > div > div > div >a")
                    detail = getproduct.document.querySelector("#productDetails > div > div");
                    nameproduct = getproduct.document.querySelector("#product > div.row.product-content > section.small-12.columns.product-information.large-4 > div > div:nth-child(1) > div:nth-child(1) > h1")

                    if(getproduct.document.querySelector("#product > div.row.product-content > section.small-12.columns.product-information.large-4 > div > div:nth-child(1) > div:nth-child(2) > div > span.price.original"))
                    {
                        originalprice = getproduct.document.querySelector("#product > div.row.product-content > section.small-12.columns.product-information.large-4 > div > div:nth-child(1) > div:nth-child(2) > div > span.price.original").textContent;
                        finalprice = getproduct.document.querySelector("#product > div.row.product-content > section.small-12.columns.product-information.large-4 > div > div:nth-child(1) > div:nth-child(2) > div > span.price.final").textContent;
                        console.log(originalprice);
                        for(let i =0;i<imglist.length;i++)
                        { test = imglist[i].href
                        listimg_product[i] ="https://static.theiconic.com.au/p/" + test.substring(test.indexOf("%2Fp%2F")+7,test.length) 
                        //console.log("imglist "+listimg_product[i])
                        }
                        bodytext = detail.innerHTML.replace(/\r?\n|\r/g, "") 
                        res2.push({
                            "name":nameproduct.innerHTML.replace(/\r?\n|\r/g, "") ,
                            "originalprice" : originalprice, 
                            "finalprice" : finalprice.replace(/\r?\n|\r/g, ""),
                            "img": listimg_product,
                            "bodytext": bodytext,
                            })
                    }
                    else{
                        price = getproduct.document.querySelector("#product > div.row.product-content > section.small-12.columns.product-information.large-4 > div > div:nth-child(1) > div:nth-child(2) > div > span").textContent;
                        console.log(price)
                        for(let i =0;i<imglist.length;i++)
                        { test = imglist[i].href
                        listimg_product[i] ="https://static.theiconic.com.au/p/" + test.substring(test.indexOf("%2Fp%2F")+7,test.length) 
                        //console.log("imglist "+listimg_product[i])
                        }
                        bodytext = detail.innerHTML.replace(/\r?\n|\r/g, "") 
                        res2.push({
                            "name":nameproduct.innerHTML.replace(/\r?\n|\r/g, "") ,
                            "price" : price, 
                            "img": listimg_product,
                            "bodytext": bodytext,
                            })
                    }

                });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(res2));
                console.log(res2)
            })).catch(error => {
                console.log(error);
                });
            //console.log(response)
        }).catch(error => {
        console.log(error);
        });
      // await request(get_products,parseData)
       //b= item;

    

    }
    
    //console.log(b)
};