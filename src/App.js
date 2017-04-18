import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Button, Header, Image } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Container fluid className="App">
        <Container fluid className="App-header">
          <Image centered src={logo} className="App-logo" alt="logo"/>
          <Header as='h2' style={{color:'#fff'}}>Welcome to React</Header>
        </Container>
        <Container fluid>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Button>
            Click Here
          </Button>
        </Container>
      </Container>
    );
  }
}

export default App;
