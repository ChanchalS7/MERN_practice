const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000
app.use(express.json());
app.use(cors());
//Function to print prime numbers
const isPrime=(num)=>{
    if(num <=1){
        return false;
    }
    for(let i=2; i*i<=num;i++){
        if(num % i === 0){
            return false;
        }
    }
    return true;
}
//POST to get the prime numbers
app.post('/api/prime-numbers', (req,res)=>{
    const {number} = req.body;
    const primes =[];
    for(let i=0; i <= number; i++){
        if(isPrime(i)){
            primes.push(i)
        }
    }
    res.json({primes})
})
//Function to calculate factorial numbers
const factorial = (n)=>{
    if(n<=0){
        return ;
    }
    if(n==1){
        return n;
    }
    let result=n*factorial(n-1)
    return result;
}
//POST to calculate factorial
app.post('/api/factorial', (req,res)=>{
    const {number} = req.body;
    const result = factorial(number)
    res.json({result})
})
//function to check if a number is armStrong or not
const isArmstrong = (num) =>{
    const numStr = num.toString();
    const n = numStr.length;
    let sum = 0;
    let temp = num;
    while (temp > 0){
        const digit = temp % 10;
        sum +=  Math.pow(digit, n);
        temp = Math.floor(temp / 10);

    }
    const bigintSum = BigInt(sum);
    const bigintNum = BigInt(num);

    return bigintSum === bigintNum;

}
//POST to check Armstrong number
app.post('/api/armstrong', (req,res)=>{
    const {number} = req.body;
    const isArm = isArmstrong(number);
    res.json({isArmstrong:isArm})
});

//function to check palindrome
const isPalindrome = (num) =>{
    const strNum = num.toString();
    return strNum === strNum.split('').reverse().join('');
}
//POST to check palindrome
app.post('/api/palindrome',(req,res)=>{
    const {number} = req.body;
    const isPalin = isPalindrome(number)
    res.json({isPalindrome:isPalin})
})

//function to print fibonacci series
const fibonacci = (n)=>{
    const fib =[0,1];
    for(let i=2; i < n; i++){
        fib.push(fib[i-1] + fib[i-2]);
    }
    return fib;
}

//POST to print fibonacci series
app.post('/api/fibonacci', (req,res)=>{
    const {number} = req.body;
    const fibSeries = fibonacci(number);
    res.json({fibonacci:fibSeries})
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})