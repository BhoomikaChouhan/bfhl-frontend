import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const json = JSON.parse(jsonInput);
      const res = await axios.post('https://bfhl-backend-7p4a.onrender.com/bfhl', json);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setOptions(prevOptions => (
      prevOptions.includes(value)
        ? prevOptions.filter(opt => opt !== value)
        : [...prevOptions, value]
    ));
  };

  return (
    <div>
      <h2>BFHL Frontend</h2>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here...'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Response</h2>
          <select multiple onChange={handleOptionChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          <div>
            {options.includes('alphabets') && (
              <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
            )}
            {options.includes('numbers') && (
              <p>Numbers: {JSON.stringify(response.numbers)}</p>
            )}
            {options.includes('highest_lowercase_alphabet') && (
              <p>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
