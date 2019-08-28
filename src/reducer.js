const clearUser = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  avatar: "",
  channels: []
};

export const reducer = (
  state = { user: clearUser, allchannels: [], messages: [] },
  action
) => {
  switch (action.type) {
    case "USER_AUTH":
      return { ...state, user: { ...action.payload } };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
          avatar: action.payload.avatar
        }
      };
    case "LOGOUT":
      return { ...state, user: clearUser };
    case "UPDATE_CHANNELS":
      return { ...state, user: { ...state.user, channels: action.payload } };
    case "ALL_CHANNELS":
      return { ...state, allchannels: action.payload };
    case "ADD_TO_ALL_CHANNELS":
      return { ...state };
    case "LOAD_MESSAGES":
      return { ...state, messages: action.payload };
    case "PUSH_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};
