const http =require('http');
const fs= require('fs')
const requests = require('requests');


const homeFile = fs.readFileSync('index.html','utf-8');

const replaceVal=(tempVal,newVal)=>{
    let temperature = tempVal.replace("{%tempval%}",newVal.main.temp);
     temperature = temperature.replace("{%tempmin%}",newVal.main.temp_min);
     temperature = temperature.replace("{%tempmax%}",newVal.main.temp_max);
     temperature = temperature.replace("{%city%}",newVal.sys.country);
return temperature;
};

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        
        requests(
            "http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=9180a40d0b36487930fbb80888336b29"
            )
        // requests(
        //     "http://localhost:4000/getUserData"
        //     )
            .on("data", (chunk)=> {
                //console.log(chunk)
                const objData = JSON.parse(chunk);
                const arrData = [objData];
               console.log(arrData);
                const realTime = arrData.map((val) => replaceVal(homeFile,val));
               res.write(realTime.join(""));
            })
            .on("end", (err)=> {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
       });
    }
})

server.listen(8000,"127.0.0.1");



