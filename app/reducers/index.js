/* reducers */
// import reducers here

const defaultState = {
  // app state here
  goals: [
    {
      id: 0,
      name: 'Eat more pizza and chips and burgers and döner kebabs',
      created: 1488984810654,
      avatar: 'sprout',
      status: 0,
      currentRating: 7,
      ratings: [],
    },
    {
      id: 1,
      name: 'Drink more champagne',
      created: 1488984810658,
      avatar: 'pumpkin',
      status: 0,
      currentRating: 8,
      ratings: [],
    },
  ],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    // cases here
    default:
    return state;
  }
};
