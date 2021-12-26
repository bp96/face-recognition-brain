import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      showError: false
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value,
                          showError: false})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value,
                          showError: false})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => {
        if (response.ok) {return response.json()} 
        else {
          this.setState({showError: true})
          throw new Error('Sign in failed');}
      })
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  handleEnterKeyDown(event) {
    if(event.keyCode === 13) { 
      document.getElementById("submitBtn").click() // this needs to be updated to become more React-like
  }
}

  signInAsGuest = () => {
          this.props.onRouteChange('home');
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                  onKeyDown={this.handleEnterKeyDown} // press enter to submit - WIP
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  onKeyDown={this.handleEnterKeyDown}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                id="submitBtn"
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
              <input
                onClick={this.signInAsGuest}
                className="b ph3 pv2 input-reset ba b--black bg-blue grow pointer f6 dib"
                type="submit"
                value="Continue as guest"
              />
            </div>
            <div className="lh-copy mt3">
              {this.state.showError?
                <h3 className="b ph3 pv2 input-reset ba b--black bg-light-yellow f6 dib"> Invalid Email/Password. </h3>:""
              }
              </div> 
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;