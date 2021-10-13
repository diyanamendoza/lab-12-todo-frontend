import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div className='welcome-container'>
                <h2>Why, hello!</h2>
                <p>Are you new here? <Link to='/signup'>Sign up.</Link></p>
                <p>Have creds? Let's <Link to='/login'>log you in.</Link></p>
            </div>
        )
    }
}
