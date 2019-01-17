var cheerio = require("cheerio");
var axios = require("axios");
var info = require('./info');
var Twit = require('twit')
let page = 1
 
var T = new Twit({
  consumer_key:         'XDNZzQKJtpiLGAeuSrKSaTE25',
  consumer_secret:      'EIY5Smx8Wadjpq12njJnbr8aPqYyEokpKOTqZpFZkYrH923A1B',
  access_token:         '1084573960799436800-3PIOpEYqYIxP7CgNgC0pKGE0kyr43D',
  access_token_secret:  'DInikMb348yo52EHFnoK24OH2hjro4IM3geim8b6z5NSh',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})




async function price() {
        await axios.get(`https://slickdeals.net/`).then(function (response) {
                // Load the HTML into cheerio
         
                var $ = cheerio.load(response.data);
                $("div.fpItem").each(function (i, element) {
                   
                        let dealTitle = $(element).find('a').text()
                        let dealLink = $(element).find('.itemTitle').attr('href')
                        let msrp = $(element).children('div').find('span.oldListPrice').text();
                        let salePrice = $(element).find('div.itemPrice').text().replace(/\s+/g, " ").match(/\$\d+(\.\d+)?/g)            
                        if (salePrice === null) {
                        } else if (salePrice) {
                            // console.log(salePrice)
                            // console.log(msrp)
                            // console.log('https://slickdeals.net' + dealLink)
                            // console.log(dealTitle)
                            console.log(emptryArr)

                        }
                        
                        var result = parseFloat(msrp).toFixed(2);
                        var result2 = parseFloat(salePrice).toFixed(2);
                        let dollarsOff = result - result2;
                        let percentageOff = dollarsOff / result * 100;
                     
                        
                        // if (dollarsOff & percentageOff > 80) {
                        //         dealName = dealTitle.replace(/\s\s+/g, ' ');
                        //         console.log('hello')
                        //         T.post('statuses/update', { status: `${dealName}, Link: ${dealLink}` }, function(err, data, response) {
                        //                 console.log(data)
                        //               })            
                        // }
                })
        })
}

price();
