import React, { useState,useCallback,useEffect } from 'react';
import './App.css'; // Add a CSS file for styling
import Copy from './assets/copy.png'
import Flash from './assets/flash.png'
function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(6);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);

  const copyPassword = () => {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    // You can provide user feedback, e.g., by displaying a message
    alert('Password copied to clipboard!');
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  const generateRandomCharacter = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  const createPassword = useCallback(() => {
    let newPassword = '';
    const length = parseInt(passwordLength, 10);

    for (let i = 0; i < length; i++) {
      if (includeNumbers && includeCharacters) {
        const choice = Math.random() < 0.5; // 50% chance for number or character
        newPassword += choice ? generateRandomNumber() : generateRandomCharacter();
      } else if (includeNumbers) {
        newPassword += generateRandomNumber();
      } else if (includeCharacters) {
        newPassword += generateRandomCharacter();
      } else {
        console.error('Please select at least one option (Numbers or Characters).');
        return;
      }
    }

    setPassword(newPassword);
  }, [passwordLength, includeNumbers, includeCharacters]);


  const handleSliderChange = (event) => {
    setPasswordLength(event.target.value);
  };

  const handleNumberCheckboxChange = () => {
    setIncludeNumbers(!includeNumbers);
  };

  const handleCharacterCheckboxChange = () => {
    setIncludeCharacters(!includeCharacters);
  };

  useEffect(() => {
    // This useEffect will be triggered whenever there's a change in the dependencies
    createPassword();
  }, [ passwordLength,includeNumbers,includeCharacters]);

  return (
    <div className="container">
      <h1>
        Generate a <span>Random Password</span>
      </h1>
      <div className="display">
        <input type="text" id="password" value={password} readOnly />
        <img src={Copy} alt="copy" onClick={copyPassword} />
      </div>
      <div>
        <label>Password Length: {passwordLength}</label>
        <input
          type="range"
          min="6"
          max="20"
          value={passwordLength}
          onChange={handleSliderChange}
        />
      </div>
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={handleNumberCheckboxChange}
          />
          Include Numbers
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={includeCharacters}
            onChange={handleCharacterCheckboxChange}
          />
          Include Characters
        </label>
      </div>
      <button className="generate" onClick={createPassword}>
        <img src={Flash} alt="flash" />
        Generate Password
      </button>
    </div>
  );
}

export default App;
