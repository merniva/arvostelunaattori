import React, { Component } from 'react';
//import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import List from './List';

export default class TodoList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        term: '',
        items: [],
        jauheliha: 1
      };
    }


  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  
  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  } 

  remove = (item) => {
      const filteredItems = this.state.items.filter(listItem => item !== listItem);
      this.setState({ items: filteredItems })
  }

  render() {
    return (
      <div><h1>Ostoslista</h1>
        <form className="TodoList" onSubmit={this.onSubmit}>
            <input value={this.state.term} onChange={this.onChange} />
            <Button>Päivitä</Button>
            <button type="button" className="btn btn-primary">Primary</button>
        </form>
        <List remove={this.remove} items={this.state.items} jauheliha={this.state.jauheliha}/>
      </div>
    );
  }
}

