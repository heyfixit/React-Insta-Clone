import React, { Component } from 'react';
import PostPage from './components/PostContainer/PostPage';
import './App.css';

class App extends Component {

  state = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <PostPage />
      </div>
    );
  }
}

export default App;
