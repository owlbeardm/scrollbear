const fs = require('fs');
const http = require('http');
const parse = require('node-html-parser').parse;

const site = "http://www.d20pfsrd.com/magic/all-spells/b/boneshaker/";
const yql = "select * from htmlstring where url='" + site + "' AND xpath='//article'";
const resturl = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(yql) + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
// console.log(resturl);
http.get(resturl, (res) => {
  // console.log(res.data);
  const {
    statusCode
  } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
      `Status Code: ${statusCode}`);
  }
  //  else if (!/^text\/html/.test(contentType)) {
  //   error = new Error('Invalid content-type.\n' +
  //     `Expected text/html but received ${contentType}`);
  // }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });
  res.on('end', () => {

    // console.log(rawData);
    try {
      const parsedData = JSON.parse(rawData);
      const rootVar = parse(parsedData.query.results.result);
      // console.log(rootVar.toString());
      console.log(rootVar.querySelector('h1').text);


      fs.writeFileSync('test.html', rootVar.toString(), 'utf8');
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});

//
// const rootVar = parse('<ul id="list"><li>Hello World</li></ul>');
//
// console.log(rootVar.querySelector('#list'));
// console.log(rootVar.toString());
//
// rootVar.set_content('<li>Hello World</li>');
// rootVar.toString();
