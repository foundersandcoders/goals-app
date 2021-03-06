import React from 'react';
import PropTypes from 'prop-types';

class NewGoalInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onInputEditGoal(event.target.value);
  }

  render() {
    return (
      <div className="new-goal-input-container-inner">
        <textarea
          name="new-goal"
          id="newGoalInput"
          maxLength="50"
          value={ this.props.newGoal.name }
          placeholder="My goal is..."
          className="new-goal-input"
          type="text"
          onKeyUp={ this.handleChange }
          onChange={ this.handleChange }
          autoFocus={ window.innerHeight > 600 }
        />
      </div>
    );
  }
}

NewGoalInput.propTypes = {
  onInputEditGoal: PropTypes.func,
  onInputGoal: PropTypes.func,
  newGoal: PropTypes.object,
};

export default NewGoalInput;
