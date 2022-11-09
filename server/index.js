const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const fs = require('fs');
app.use(express.json());
app.listen(port, ()=>console.log(`Server is running on ${port}`));
const cors = require('cors');
app.use(cors());

const Orders = mongoose.model('Orders', new mongoose.Schema({items:{type: Object, required: true}}));

// do not use the below url it is instead use yours atlas cluster url
const url = "mongodb+srv://nitesh4dev:Nite$h2oo3@cluster0.camzdu1.mongodb.net/Food_website?retryWrites=true&w=majority"
mongoose.connect(url , {
    UseNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>console.log("connection succesfull")).catch((err)=>console.log(`An error occured ${err}`));


app.get('/getFoods',(req, res)=>{
    fs.readFile('./foods.json', 'utf-8', (err, data)=>{
        res.send(data);
        if (err) console.log(err);
    })
})

app.post('/orders',async(req, res)=>{
    const items = req.body.items;
    try{
        const order = new Orders({items});
        const placed = await order.save();
        if(placed){
            res.json({message:"Order placed"})
        }
        else{
            res.json({message: "Something went wrong"})
        }
    }
    catch(err){
       console.log(err)
    }
})