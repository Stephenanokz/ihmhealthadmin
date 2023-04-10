const ServiceReducer = (state, action) => {
  switch (action.type) {
    case "GET_SERVICES_START":
      return {
        services: [],
        isFetching: true,
        error: false,
      };
    case "GET_SERVICES_SUCCESS":
      return {
        services: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_SERVICES_FAILURE":
      return {
        services: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_SERVICE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_SERVICE_SUCCESS":
      return {
        services: state.services.filter((service) => service._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_SERVICE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_SERVICE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_SERVICE_SUCCESS":
      return {
        services: [...state.services, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_SERVICE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_SERVICE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_SERVICE_SUCCESS":
      return {
        services: state.services.map(
          (service) => service._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_SERVICE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default ServiceReducer;