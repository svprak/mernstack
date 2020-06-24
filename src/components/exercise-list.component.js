import React, { Component } from 'react';
import axios from 'axios';

import Exercises from '../components/exercises';
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercise: [] };
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/exercises')
      .then((response) => {
        this.setState({ exercise: response.data });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise(id) {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    //remove data from table
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
  exerciseList() {
    return this.state.exercise.map((currentExercise) => {
      return (
        <Exercises
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h2>Logged Exercises</h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
