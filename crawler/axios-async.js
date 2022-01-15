// 加 .default 讓 intellisense / autocomplete 作用
const axios = require('axios').default;

// URL: https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20211201&stockNo=2330&_=1642037057924
// Status: 200
// Source: Network
// Address: 122.147.34.152:443
// Initiator:
// main.js:8:82719

const request = {
    domain: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
    type: 'json',
    year: '2010', // min 2010
    month: '01',
    stockNo: 2330,
    get url() {
        return `${this.domain}?resopnse=${this.type}&date=${this.year}${this.month}01&stockNo=${this.stockNo}&_=1631716312720`;
    },
}(async function () {
    try {
        const response = await axios.get(request.url);
        // console.log('status: ', response.status);
        // console.log('status-text: ', response.statusText);
        // console.log('header: ', response.headers);
        console.log('data: ', response.data);
    } catch (error) {
        console.error(error);
    }
})();
