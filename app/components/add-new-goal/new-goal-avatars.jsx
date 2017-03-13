import React from 'react';

const Avatars = () => {

  const pathToAvatars = avatar => `./app/public/images/add-new-goal/${avatar}.png`;

  // could refactor to get avatars from state in case we want to load from DB?
  const availableAvatars = [
    'sprout',
    'pepper',
    'pumpkin',
    'flower',
  ];

  const createAvatarRow = arr =>
  arr.map(av => (
    <div className="newGoal_avatarBox" key={`avatar_${av}`}>
      <label id={`avatar_${av}`}>
        <input type="radio" name="avatar"/>
        <img src={ pathToAvatars(av) } />
      </label>
    </div>
  )
);

  const topRow = createAvatarRow(availableAvatars.slice(0, 2));
  const bottomRow = createAvatarRow(availableAvatars.slice(2));

  return (
    <div className="newGoal_avatarsContainer">
      <div className="newGoal_avatarsContainer-row">
        { topRow }
      </div>
      <div className="newGoal_avatarsContainer-row">
        { bottomRow }
      </div>
    </div>
  )
};

export default Avatars;
