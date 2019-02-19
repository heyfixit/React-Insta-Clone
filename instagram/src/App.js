import React, { Component } from 'react';
import shortid from 'shortid';
import './App.css';
import dummyData from './dummy-data';
import fuzzyFilterFactory from 'react-fuzzy-filter';
import Header from './components/Header/Header';
import PostContainer from './components/PostContainer/PostContainer';

const { FilterResults, changeInputValue } = fuzzyFilterFactory();

const fuseConfig = {
  keys: ['username', 'comments.text', 'comments.username']
};

const initialState = {
  posts: [],
  filterTerms: ''
};

class App extends Component {
  static defaultProps = initialState;

  state = {
    ...initialState,
    posts: dummyData.map(p => ({ ...p, id: shortid.generate() }))
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      posts: dummyData.map(p => ({ ...p, id: shortid.generate() }))
    });
  }

  onLike = id => {
    const { posts } = this.state;
    const foundIndex = posts.findIndex(p => p.id === id);
    const newArray = [...this.state.posts];
    newArray[foundIndex].likes += 1;

    this.setState({ posts: newArray });
  };

  onSearchChange = e => {
    this.setState({ filterTerms: e.target.value });
    changeInputValue(e.target.value);
  };

  render() {
    const { posts, filterTerms } = this.state;
    return (
      <div className="App">
        <Header
          onSearchChange={this.onSearchChange}
          filterTerms={filterTerms}
        />
        <FilterResults items={posts} fuseConfig={fuseConfig}>
          {filteredPosts =>
            filteredPosts.map(post => (
              <PostContainer key={post.id} post={post} onLike={this.onLike} />
            ))
          }
        </FilterResults>
      </div>
    );
  }
}

export default App;
