import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import Index from './pages/index'
import Main from './pages/main'
class App extends Component{
  render(){
    return (
     <BrowserRouter>
        <Route path='/' exact  component={Index} ></Route>
        <Route path='/main' exact  component={Main} ></Route>
     </BrowserRouter>
    )
  }
}

export default App;
