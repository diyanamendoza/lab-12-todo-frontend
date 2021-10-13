import './App.css';
import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    NavLink,
    Redirect
} from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import ToDoList from './ToDoList.js';

export default class App extends Component {
    state = {
        token: localStorage.getItem('TOKEN') || ''
    }

    handleTokenChange = token => {
        localStorage.setItem('TOKEN', token)
        this.setState({ token: token })
    }

    logout = () => {
        localStorage.clear()
        this.setState({ token: '' })
    }

    render() {
        return (
            <div>
                <Router>
                    <header>
                        <h2>To Do</h2>
                        <nav>
                        <NavLink exact activeClassName='active-nav' to='/'>Home</NavLink>
                        <NavLink exact activeClassName='active-nav' to='/login'>Login</NavLink>
                        <NavLink exact activeClassName='active-nav' to='/signup'>Signup</NavLink>
                        <NavLink exact activeClassName='active-nav' to='/todolist'>To Dos</NavLink>
                        {this.state.token && <span className='logout' onClick={this.logout}>Logout</span>}
                        </nav>
                        <img className="header-image" src='./header-image.png'alt='Cafe. by MIKI Yoshihito. (#mikiyoshihito) is licensed under CC BY 2.0'/>
                    </header>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <Home {...routerProps} />} 
                        />
                        <Route 
                            path="/login" 
                            exact
                            render={(routerProps) => <Login 
                                handleTokenChange={this.handleTokenChange}
                                {...routerProps} />} 
                        />
                        <Route 
                            path="/signup" 
                            exact
                            render={(routerProps) => <Signup 
                                handleTokenChange={this.handleTokenChange}
                                {...routerProps} />} 
                        />
                        <Route 
                            path="/todolist" 
                            exact
                            render={(routerProps) => 
                            //if there is a token
                            this.state.token ? 
                            // pass the token to this page
                            <ToDoList 
                                token={this.state.token}
                                {...routerProps} />
                            //else redirect to signup
                                : <Redirect to='/signup'/>
                                
                            } 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}