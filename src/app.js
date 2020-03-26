const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gecode = require('./utils/gecode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

//Define path for express config

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        // title:'weather app',
         name:'Anubhav Pratap Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Name:-Anubhav Pratap Singh',
        mobileNo:'Mobile No:-7240317747'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
        error :'you must have to provide search' 
    })
    }
    res.send({
        product: [],
    })
})
app.get('/weather',(req,res)=>{
    const address=req.query.search
    if(!req.query.search){
        return res.send({
            error:'you must have provide address'
            
        })
    }
        gecode(address,(error,{latitude,longitude,location}={})=>{
            if(error){
        
                return res.send('error') 
        
            }
        
            forecast(latitude,longitude,(error,foreCastData)=>{
                if(error){
                return res.send('error')
                }
                
                res.send({
                location,
                foreCastData,
                address,
                })
                
            })
        
        
    })
})
app.get('/title',(req,res)=>{
    res.send('<h1>title</h1>')
})

//404 page

app.get('*',(req,res)=>{
    res.render('err',{
        title:'anubahv',
    })
})

app.listen(3000,()=>{
    console.log("server is set")
})