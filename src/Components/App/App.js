import React, { Component } from 'react';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm'

import './App.css'

export default class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newTodoData = [
        ...todoData,
        newItem
      ]

      return {
        todoData: newTodoData
      }
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id); {
    
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newTodoData = [...before, ...after];

      return {
        todoData: newTodoData,
        }
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
  }
  
  onToggleDone  = (id) => {

    this.setState(({ todoData }) => {

      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    });
  };

  onToggleImportant = (id) => {
          this.setState(({ todoData }) => {
      
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      }
    });
  };

  render() {

    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return(     
      <div className="todo-app">
        <AppHeader todos={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

        <TodoList 
        todos={ todoData } 
        onDeleted={ this.deleteItem } 
        onToggleDone={ this.onToggleDone }
        onToggleImportant={ this.onToggleImportant } />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    )
  };
}; 
