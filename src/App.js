import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
     <TodoList />
  );
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', todoList: [], delIdx:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    if(this.state.value == '') {
      alert('title is empty')
    } else {
      this.state.todoList.push({'value': this.state.value, 'checked': false});
      this.state.value = '';
      this.newRender();
    }
  }

  handleDelete(i, event) {
    this.state.todoList.splice(i, 1)
    this.newRender();
  }

  handleCheck(item, i, event) {
    this.state.todoList[i].checked = !this.state.todoList[i].checked
    this.newRender();
  }

  newRender() {
    this.setState({ todoList: this.state.todoList, value: this.state.value })
  }

  render() {
    return (
        <div>
          <h1> TODO LIST </h1>
            <label>
              Title :
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="button" value="Submit" onClick={this.handleClick} />
            {
              this.state.todoList.map((item, i) => (
                  <div>
                    <input type="checkbox" checked={item.checked} onChange={this.handleCheck.bind(this, item, i)}/>
                    <span>{item.checked ? <del class='deleted'>{item.value}</del> : item.value}</span>
                    <input type="button" value="delete" onClick={this.handleDelete.bind(this, i)}/>
                  </div>
              ))
            }
        </div>
    );
  }
}

export default App;
