import React,{Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import Index from './pages/index'
import Main from './pages/main'
import store from './store'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
            <Route path='/' exact  component={Index} ></Route>
            <Route path='/main' exact  component={Main} ></Route>
        </BrowserRouter>
     </Provider>
    )
  }
}

export default App;
