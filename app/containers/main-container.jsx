import React from 'react';
import { connect, } from 'react-redux';

/* actions */
import * as actionsGoalsList from './../actions/goals-list.js';
import * as actionsAddNewGoal from './../actions/add-new-goal.js';
import * as actionsViewGoal from './../actions/view-goal.js';
import * as actionsRateGoal from './../actions/rate-goal.js';
import * as actionsFeedback from './../actions/feedback.js';
import * as actionsGeneral from './../actions/general.js';

const actionsMainContainer = {
  ...actionsGoalsList,
  ...actionsAddNewGoal,
  ...actionsViewGoal,
  ...actionsRateGoal,
  ...actionsFeedback,
  ...actionsGeneral,
};

import router from './../router.js';

const MainContent = props => {

  const view = router(props);
  const navbarHeight = 90;
  const dynamicStyle = {
    height: window.innerHeight - navbarHeight,
  };

  if (!props.user.isAuthenticated && !props.user.authPending) {
    props.setAuthPending();
  }
  
  return (
      <div className="MainContent" style={ dynamicStyle }>
        { view }
      </div>
  );
};

MainContent.propTypes = {
  onReceiveData: React.PropTypes.func,
  setAuthPending: React.PropTypes.func,
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
  goals: state.goals,
  step: state.step,
  newGoal: state.newGoal,
  currentGoal: state.currentGoal,
});

export default connect(mapStateToProps, actionsMainContainer)(MainContent);
