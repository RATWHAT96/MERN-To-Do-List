import React from 'react';
import AppNavBar from './components/AppNavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal'
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authAction';
import { Component } from 'react';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>    
    );
    }
}

export default App;
