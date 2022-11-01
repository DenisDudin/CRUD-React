import { Component } from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: "Den Sm.", salary: 1000, increase: false, rise: false, id:1},
        {name: "Viktor C.", salary: 1200, increase: false, rise: true, id:2},
        {name: "Alex V.", salary: 3000, increase: true, rise: false, id:3}
      ],
      term: '',
      filter: 'all'
    }
    this.nextId = 4;
  }

  deleteEmployee = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addEmployee = (name, salary) => {
    const newEmployee = {
        name, 
        salary,
        increase: false,
        rise: false,
        id: this.nextId++
    }

    this.setState(({data}) => {
        return {
            data: [...data, newEmployee]
        }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  searchEmployees = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    });
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterData = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'more1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }
  
  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterData(this.searchEmployees(data, term), filter);

    return (
      <div className="app">
          <AppInfo employees={employees} increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel onUpdateSearch={this.onUpdateSearch} />
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.deleteEmployee}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm onAdd={this.addEmployee}/>
      </div>
    );
  }
}

export default App;
