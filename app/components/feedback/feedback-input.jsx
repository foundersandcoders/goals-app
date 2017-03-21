import React from 'react';

class FeedbackInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
     this.props.onInputFeedback(event.target.value);
  }

  render() {
    return (
      <div className="feedback-input-container">
        <textarea
          name="new-feedback"
          id="newFeedbackInput"
          maxLength="1000"
          value={ this.props.comment}
          placeholder="I gave my goal this reason because..."
          className="feedback-input"
          type="text"
          onKeyUp={ this.handleChange }
          onChange={ this.handleChange }
          autoFocus
        />
      </div>
    );
  }
}

export default FeedbackInput;