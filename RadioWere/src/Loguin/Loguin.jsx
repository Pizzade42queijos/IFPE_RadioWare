import React from 'react';
import './Loguin.css';

function Loguin() {
  return (
    <div className="app">
      <div className="login-container">
        <h2>RADIOWARE</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Loguin
