import React, { Component } from 'react'
import { signUp } from './api-utils.js';
import { Link } from 'react-router-dom'

export default class Signup extends Component {
    state = {
        password: '',
        email: '',
        error: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
        const { token } = await signUp(this.state.email, this.state.password);
        this.props.handleTokenChange(token)
        this.props.history.push('./todolist')
        }
        catch(e) {
            this.setState({error: e.response.body.error})
            this.state.error === 'email and password required' && alert('Please provide both an email and password.')
            this.state.error === 'email already exists' && alert(`This profile already exists. Please go to login instead or create a new user.`)
            console.log(this.state.error)
        }
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
