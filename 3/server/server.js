const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 5000
app.use(express.json());
app.use(cors());
app.post('/api/fizzBuzz', (req,res)=>{
    const inputValue=req.body.value;
    let result='';
    if(inputValue % 15 === 0){
        result='FizBuzz';
    }else if(inputValue % 5 === 0){
        result = "Buzz";
    }else if(inputValue % 3 === 0){
        result = "Fizz";
    }
    console.log("Result:",result)
    res.json({result})
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})