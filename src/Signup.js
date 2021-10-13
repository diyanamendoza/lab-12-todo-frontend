import React, { Component } from 'react'
import { signUp } from './api-utils.js';

export default class Signup extends Component {
    state = {
        password: '',
        email: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { token } = await signUp(this.state.email, this.state.password);
        this.props.handleTokenChange(token)
        this.props.history.push('./todolist')
    }

    setEmail = (e) => this.setState({ email: e.target.value })
    setPass = (e) => this.setState({ password: e.target.value })

    render() {
        return (
            <div>
                <form className='signup-form' onSubmit={this.handleSubmit}>
                    <label>Email
                        <input onChange={this.setEmail} />
                    </label>
                    <label>Password
                        <input onChange={this.setPass} />
                    </label>
                    
                    <button>Signup</button>
                </form>
            </div>
        )
    }
}
