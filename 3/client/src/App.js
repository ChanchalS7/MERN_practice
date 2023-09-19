import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from "axios"
function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
    const handleFizzBuzz = async () =>{
      try {
        const response = await axios.post('http://localhost:5000/api/fizzBuzz',{
          value:inputValue,
        })
        setResult(response.data.result);
        
      } catch (error) {
          console.error('Error:',error);
      }
    }
  return (
    <div className="App">
      <h1>fizzBuzz Checker</h1>
      <input
        type='number'
        placeholder='Enter a number'
        value={inputValue}
        onChange={(e)=>{setInputValue(+ e.target.value)}}/>
        <button onClick={handleFizzBuzz}>Check FizzBuzz</button>
        <br/>
        <strong>Result :</strong>{result}
    </div>
  );
}

export default App;
