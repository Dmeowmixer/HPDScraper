var request = require('request');
var cheerio = require('cheerio');



function scrapingThePopo(hollaback){
  var url = 'http://www4.honolulu.gov/hpdtraffic/MainPrograms/frmMain.asp?sSearch=All+Incidents&sSort=I_tTimeCreate';

  request(url, hollaback);
}

function hollaback(error, response, html){
  if (!error){
    // on returned html we will use cheerio for jQuery like capabilities
    var $ = cheerio.load(html);

    // definition of what we're capturing
    var date, type, address, location, area;
    var json = { date: '', type: '', address:'', location: '', area: ''};
    
    //Using the tr as a 
    var arr = [];
    var theRowsWithColorAttr = $('tr[bgcolor=white],tr[bgcolor=lightblue]').map(function(){
      // store the data we flter into a var 
      var data = $(this);
      // console.log(data.children()[0]+":"+ data.children()[1]);
      date = new Date(data.children()[0].children[0].data +" "+ data.children()[1].children[0].data);
      type = data.children()[2].children[0].data;
      address = data.children()[3].children[0].data;
      location = data.children()[4].children[0].data;
      area = data.children()[5].children[0].data;

      json.date = date;
      json.type = type;
      json.address = address;
      json.location = location;
      json.area = area;
      arr.push(json);
      return json;
    });
      console.log(arr);
  } 
}

scrapingThePopo(hollaback);




