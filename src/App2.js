import React from 'react';
import './App.css';

function App() {
  return (
      <TodoListContainer />
  );
}

class DumbComponent extends React.Component { }
class SmartComponent extends React.Component { }

class TodoListContainer extends SmartComponent {
  constructor(props) {
    super(props)
    this.state = {
      todoList: []
    };
  }

  updateTodoList() {
    this.setState({ todoList: this.state.todoList })
  }

  handleInputNewItem(event) {
    if (event.key === "Enter") {
      var inputTitle = event.target.value
      if (inputTitle.length > 0) {
        this.state.todoList.unshift({
          title: inputTitle, isChecked: false, isClosed: false, time: new Date().toLocaleTimeString()
        })
        event.target.value = ""
        this.updateTodoList()
      } else {
        alert("error : empty input")
      }
    }
  }

  handleOnCheckedItem(event, item) {
    item.isChecked = event.target.checked
    this.updateTodoList()
  }

  handleOnCloseItem(event, item) {
    item.isClosed = true
    this.updateTodoList()
  }

  render() {
    return <div className="App">
      <h1>TODO</h1>
      <TodoInputLayout handleInputNewItem={this.handleInputNewItem.bind(this)} />
      {
        this.state.todoList.map((item, i) => {
          return <TodoItemLayout item={item} key={i}
                                 handleOnCheckedItem={this.handleOnCheckedItem.bind(this)}
                                 handleOnCloseItem={this.handleOnCloseItem.bind(this)} />
        })
      }
    </div>
  }

}

class TodoInputLayout extends DumbComponent {
  render() {
    return <input className="TextBlack" type="text" onKeyUp={this.props.handleInputNewItem} />
  }
}

class TodoItemLayout extends DumbComponent {
  render() {
    if (this.props.item.isClosed) {
      return null
    }

    return <div>
      <input
          type="checkbox"
          checked={this.props.item.isChecked}
          onChange={(event) => this.props.handleOnCheckedItem(event, this.props.item)} />
      <span
          className={this.props.item.isChecked ? "TextGray" : "TextBlack"}>
        {this.props.item.title}
      </span>
      <button
          className="CloseButton"
          onClick={(event) => this.props.handleOnCloseItem(event, this.props.item)}>
        close
      </button>
    </div>
  }
}


export default App;