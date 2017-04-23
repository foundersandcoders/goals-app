const dbClient = require('./db_connection.js');

/* queries */
import * as queries from './queries.js';

/* helper functions */
const createTimestamp = date =>
  require('moment')(date).format('YYYY-MM-DD HH:mm:ss');

const getNewGoalData = (goal, userId) => [
  goal.id, userId, goal.name, goal.avatar, createTimestamp(goal.date_created),
];

const getRatingData = (rating, { user_id, goal_id, }) => [
  user_id, goal_id, rating.score, rating.comment, rating.time,
];

const findNewRatings = (oldRatings, newRatings) => {
  const oldRatingsById = oldRatings.map(rating => rating.rating_id);
  return newRatings.filter(rating => oldRatingsById.indexOf(rating) < 0);
};

// move this to own file for reusability??
const addRatings = (ratings, dbGoal, finalCallback) => {
  let count = 0;
  let errCount = 0;

  ratings.forEach(rating => {
    dbClient.query(queries.insertRating, getRatingData(rating, dbGoal), (createRatingErr) => {
      if (createRatingErr) {
        errCount += 1;
      } else {
        count += 1;
      }
      if (errCount + count === ratings.length) {
        if (errCount > 0) return finalCallback('failed to add some ratings to database');
        return finalCallback(null, dbGoal.goal_id);
      }
    });
  });
};

// compares new goal from client with old goal from DB
const updateGoal = (dbGoal, clientGoal, callback) => {

  // check for new ratings
  dbClient.query(queries.getRatings, [ clientGoal.id, ], (dbRatingsErr, dbRatingsRes) => {

    if (dbRatingsErr) {
      return callback('error getting ratings from database');
    }

    const dbRatings = dbRatingsRes.rows;

    if (dbRatings.length >= clientGoal.ratings.length) {
      return callback(null, clientGoal.id);
    }

    const newRatings = findNewRatings(dbRatings, clientGoal.ratings);

    addRatings(newRatings, dbGoal, callback);
  });
};

module.exports = (goal, user_id, callback) => {
  const goalId = goal.id;

  dbClient.query(queries.getGoal, [ goalId, ], (getGoalErr, getGoalResult) => {
    if (getGoalErr) {
      return callback('error data from database');
    }

    if (getGoalResult.rows.length) {
      // adapt this for new ratings / when we have editing and deleting functionality
      updateGoal(getGoalResult.rows[0], goal, callback);
      return;
    }

    // adapt to also handle ratings for these new goals!
    dbClient.query(queries.insertGoal, getNewGoalData(goal, user_id), (addGoalErr) => {
      if (addGoalErr) {
        return callback('error adding new goal to database ' + addGoalErr);
      }
      return callback(null, goal.id);
    });
  });
};
