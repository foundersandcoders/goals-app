const cookieParser = require('cookie');
const iron = require('iron');

/* database */
const getUserData = require('./database/get-user-data.js');
const handleGoalData = require('./database/handle-goal-data.js');

const authenticateCookie = (socket, callback) => {
  const cookie = cookieParser.parse(socket.request.headers.cookie)['grow-user'];
  iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, decodedCookie) => {
    if(err) callback(err);
    callback(null, decodedCookie.id);
  });
};

const socketManager = (socket) => {
  socket.on('authenticate', (_, clientCallback) => {
    authenticateCookie(socket, (err, id) => {
      if(err) {
        socket.emit('authentication_error');
        clientCallback('auth error');
      }
      getUserData(id, (data) => {
        clientCallback(null, id);
        socket.emit('userdata', data);
      });
    });
  });

  socket.on('goal', (data, clientCallback) => {
    const goalData = JSON.parse(data);

    handleGoalData(goalData, id, (err, result) => {
      if (err) {
        clientCallback(true);
      } else if (result === 'goal already exists') {
        return;
      } else {
        clientCallback(null, result.rows[0]);
      }
    });
  });
};

module.exports = socketManager;
