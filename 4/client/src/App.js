import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useState} from "react";
function App() {
  const [number, setNumber] = useState("");
  const [results, setResults] = useState({});
  const [error, setError] = useState("");
  const handleChange = (e) =>{
    setNumber(e.target.value);
  }
  const fetchData = async (endpoint)=>{
    try {
      const response = await axios.post(
        `http://localhost:5000/api${endpoint}`,
        {number}
      );

      if(response.status !== 200) {
        throw new Error("Network response error")
      }

        const data = response.data;
        setResults(data);
        setError('');
        //        
      
    } catch (error) {
      console.log("Error", error );
      
    }
  }
  return (
    <div className="App">
     <h1>Math Operations</h1>
     <input
     type='number'
     placeholder='Enter a number'
     value={number}
     onChange={handleChange}
     />
     <br/>
     <button onClick={()=>fetchData('/prime-numbers')}>Get prime number</button>
     <button onClick={()=>fetchData('/factorial')}>Calculate Factorial</button>
     <button onClick={()=>fetchData('/armstrong')}>Check Armstrong Number</button>
     <button onClick={()=>fetchData('/palindrome')}>Check Palindrome Number</button>
     <button onClick={()=>fetchData('/fibonacci')}>Generate Fibonacci Number</button>
    </div>
  );
}

export default App;
