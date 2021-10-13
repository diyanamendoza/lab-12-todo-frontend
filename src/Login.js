import React, { Component } from 'react'
import { logIn } from './api-utils.js'

export default class Auth extends Component {
    state = {
        password: '',
        email: '',
        error: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
        const { token } = await logIn(this.state.email, this.state.password);
        this.props.handleTokenChange(token)
        this.props.history.push('./todolist')
        }
        catch(e) {
            this.setState({error: e.response.body.error})
            alert(this.state.error)
        }
    }

    setEmail = (e) => this.setState({ email: e.target.value })
    setPass = (e) => this.setState({ password: e.target.value })

    render() {
        return (
            <div>
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <label>Email
                        <input onChange={this.setEmail} />
                    </label>
                    <label>Password
                        <input onChange={this.setPass} />
                    </label>
                    
                    <button>Login</button>
                </form>
            </div>
        )
    }
}
