const initialState = {
  profile: new Object()
}

const rootReducer = (state = initialState, action) => {


  switch (action.type) {
    case 'USER_LOGIN':
      state.profile[action.payload[0]] = action.payload[1];
      console.log('PAYLOAD', action.payload);
      return {
        profile: state.profile,
      };

    case 'CLEAR_LOGIN':
      state.profile = new Object();
      return {
        profile: state.profile,
      };
    default:
      return state;
  }

}
export default rootReducer