import { Component } from 'react';
import '../UserSettings/UserSettings.css'
import { Link } from 'react-router-dom';

import { Container, Typography, TextField, MenuItem } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    // Initialize state to hold user settings
    this.state = {
      selectedCorrectionSource: '',
      corsSettings: '',
    };
  }

  // Function to handle changes in the correction source dropdown
  handleCorrectionSourceChange = (event) => {
    this.setState({ selectedCorrectionSource: event.target.value });
  }

  // Function to handle changes in CORS settings input
  handleCorsSettingsChange = (event) => {
    this.setState({ corsSettings: event.target.value });
  }

  // Function to save user settings (you can customize this to save to your backend)
  saveUserSettings = () => {
    const { selectedCorrectionSource, corsSettings } = this.state;

    // Here, you would send the user settings to your backend for storage and processing
    // You can use an API call, Redux, or other state management tools for this.

    console.log('User settings saved:', {
      selectedCorrectionSource,
      corsSettings,
    });
  }

  render() {
    const { selectedCorrectionSource, corsSettings } = this.state;

    return (
      <div style={{display:'flex',width:'100%',paddingRight:'240px'}}>
      <Sidebar/>
      <Container className="container">
      <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <span>User Settings</span>
        </div>
    
        <center style={{marginTop:'34px'}}>
        <div className="UserSettings"> {/* Apply the UserSettings class to the container */}
        <label>
        <p style={{marginRight:'570px'}}> Select Correction Source:</p>
          <select value={selectedCorrectionSource} onChange={this.handleCorrectionSourceChange} className="SelectInput">
            <option value="">Select a source</option>
            <option value="source1">Source 1</option>
            <option value="source2">Source 2</option>
            {/* Add more options as needed */}
          </select>
        </label> 
  
        <br />
  
        <label>
          <p style={{marginRight:'640px'}}>CORS Settings:</p>
          <input
            type="text"
            value={corsSettings}
            onChange={this.handleCorsSettingsChange}
            className="TextInput"
          />
        </label>
  
        <br />
  
        <button style={{marginRight:'600px'}} className="SaveButton" onClick={this.saveUserSettings}>Save Settings</button>
      </div>
      </center>
      </Container>
      </div>
    );
  }
}

export default UserSettings;
