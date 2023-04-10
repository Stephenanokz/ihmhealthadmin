const HomeReducer = (state, action) => {
  switch (action.type) {
    case "GET_HOMETEXT_START":
      return {
        homeText: null,
        isFetching: true,
        error: false,
      };
    case "GET_HOMETEXT_SUCCESS":
      return {
        homeText: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_HOMETEXT_FAILURE":
      return {
        homeText: null,
        isFetching: false,
        error: true,
      };
    case "DELETE_HOMETEXT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_HOMETEXT_SUCCESS":
      return {
        homeText: null,
        isFetching: false,
        error: false,
      };
    case "DELETE_HOMETEXT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_HOMETEXT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_HOMETEXT_SUCCESS":
      return {
        homeText: action.payload,
        isFetching: false,
        error: false,
      };
    case "CREATE_HOMETEXT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_HOMETEXT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_HOMETEXT_SUCCESS":
      return {
        homeText:  action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_HOMETEXT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default HomeReducer;