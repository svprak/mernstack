import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props); //Bind this to ours method
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //Intial state of app
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post(
        `http://localhost:5000/exercise/update/${this.props.match.params.id}`,
        exercise
      )
      .then((response) => console.log(response.data));
    window.location = '/';
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.username,
          duration: response.data.username,
          date: new Date(response.data.date),
        });
      })
      .catch((err) => console.log(err));

    axios.get(`http://localhost:5000/users/`).then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username),
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usrname:</label>
            <select
              className="form-control"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Duration (in minutes):</label>
            <input
              type="text"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
