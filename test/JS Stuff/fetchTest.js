const fetch = require('whatwg-fetch');

fetch('https://supremenewyork.com/mobile_stock.json', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B179 Safari/7534.48.3',
  }
})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.log(err);
});