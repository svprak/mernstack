import React, { Component } from 'react';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    //Intial state of app
    this.state = {
      username: '',
    };
    //Bind this to ours method
    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };
    console.log(user);
    this.setState({
      username: '',
    });
  }
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form action="">
          <div className="form-group">
            <label htmlFor="">Username:</label>
            <input
              type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
