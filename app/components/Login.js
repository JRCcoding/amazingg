import React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { app, auth, firebaseUIConfig } from '../../firebase'
import './components.css'

const Login = () => {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  )
}

export default Login
