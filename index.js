var cheerio = require("cheerio");
var axios = require("axios");
var info = require('./info');
var Twit = require('twit')
let page = 1

var T = new Twit({
        consumer_key: info.consumer_key,
        consumer_secret: info.consumer_secret,
        access_token: info.access_token,
        access_token_secret: info.access_token_secret,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
})


async function price() {
        await axios.get(`https://bensbargains.com/${page}`).then(function (response) {
                // Load the HTML into cheerio

                var $ = cheerio.load(response.data);
                $(".deal-header").each(function (i, element) {
                        let dealTitle = $(element).find('a').text()
                        let dealLink = $(element).find('a').attr('href')
                        let msrp = $(element).find('del').text().replace(/[$,]+/g, "");
                        let salePrice = $(element).find('div.column-three.pull-right > div.deal-price').text().replace(/[$,]+/g, "");
                        var result = parseFloat(msrp).toFixed(2);
                        var result2 = parseFloat(salePrice).toFixed(2);
                        let dollarsOff = result - result2;
                        let percentageOff = dollarsOff / result * 100;


                        if (dollarsOff & percentageOff > 80) {
                                dealName = dealTitle.replace(/\s\s+/g, ' ');
                                console.log('hello')
                                T.post('statuses/update', { status: `${dealName}, Link: ${dealLink}` }, function (err, data, response) {
                                        console.log(data)
                                })
                        }
                })
        })
}


setInterval(price, 2000)