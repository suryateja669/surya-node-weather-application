const path=require('path');
const hbs=require('hbs');
const request=require('request');
const geocode=require('../utils/geocode');
const forecast=require('../utils/forecast');
const express=require('express');
const app=express();

const port=process.env.PORT ||3000;


const partialDirectory=path.join(__dirname,'../partials');


app.use(express.static(path.join(__dirname,'../static')));

app.set('view engine','hbs');
hbs.registerPartials(partialDirectory);


//app.set('views',path.join(__dirname,'../newFolderName));//used for changing the view files location.

app.get('',(req,res)=>{
    res.render("index",{
        title:"My title",
        message:"This is a weather app!",
        name:"Surya"
    });
});

app.get('/help',(req,res)=>{
    res.render("help",{
      title:"Help!",
      name:"Surya"  
    })
});

app.get('/help/*',(req,res)=>{
    res.send("Help not found!");
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address!"
        })  
    }
const address=req.query.address;
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error);
        }
    forecast(latitude,longitude,(error,forecastData)=>{
         if(error){
            return res.send(error);
        }
        res.send({forecast:forecastData,
                location:location,
                address:address})
            })
        }
    )



    // res.send({
    //     forecast:"It is snowing",
    //     location:"Hyderabad",
    //     address:req.query.address
    // })
})

app.get('*',(req,res)=>{
    res.send("My 404 page!");
})



app.listen(port,(err,res)=>{
    console.log("Server is up and running at port 3000!");
})