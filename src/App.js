import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const largeColumn = { width: '40%',
};
const midColumn = { width: '30%',
};
const smallColumn = { width: '10%',
};

//组件外部的高阶函数，无法访问组件内部状态，于是传递一个参数searchTerm出来返回一个函数
const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
    };

    //想在onDismiss这个类方法中访问this这个关键字 就需要把this绑定到类方法上
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    //filter()遍历整个List，作为参数的箭头函数中，会将满足条件的item返回
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  } 

  render() {
    const { searchTerm,list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onChange}
          >
            Search
          </Search>        
        </div>

        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Table = ({ list,pattern,onDismiss }) =>
  <div className="table">
      {
      list.filter( isSearched(pattern) ).map( (item) =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
                <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>
              {item.author}
            </span>
            <span style={smallColumn}>
              {item.num_comments}
            </span>
            <span tyle={smallColumn}>
              {item.points}
            </span>
            <span tyle={smallColumn}>
                <Button 
                onClick={ () => this.onDismiss(item.objectID) }
                className="button-inline"
                >
                  Dismiss
                </Button>
            </span>
          </div>
      )
      }                 
  </div>

const Search = ({ value,onChange,children }) =>
  <form>
    {children}<input 
              type="text" 
              value={value}
              onChange={onChange}
      />
  </form>  

const Button = ({ onClick,className,children }) =>
  <button 
  onClick={onClick}
  className={className}
  type="button"
  >
    {children}
  </button>  

export default App;
