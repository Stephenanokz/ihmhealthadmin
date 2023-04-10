//CREATE SERVICE
export const createServiceStart = () => ({
  type: "CREATE_SERVICE_START",
});

export const createServiceSuccess = (service) => ({
  type: "CREATE_SERVICE_SUCCESS",
  payload: service,
});

export const createServiceFailure = () => ({
  type: "CREATE_SERVICE_FAILURE",
});

//GET SERVICES
export const getServicesStart = () => ({
  type: "GET_SERVICES_START",
});

export const getServicesSuccess = (services) => ({
  type: "GET_SERVICES_SUCCESS",
  payload: services,
});

export const getServicesFailure = () => ({
  type: "GET_SERVICES_FAILURE",
});

//UPDATE SERVICE
export const updateServiceStart = () => ({
  type: "UPDATE_SERVICE_START",
});

export const updateServiceSuccess = (service) => ({
  type: "UPDATE_SERVICE_SUCCESS",
  payload: service,
});

export const updateServiceFailure = () => ({
  type: "UPDATE_SERVICE_FAILURE",
});

//DELETE SERVICE
export const deleteServiceStart = () => ({
  type: "DELETE_SERVICE_START",
});

export const deleteServiceSuccess = (id) => ({
  type: "DELETE_SERVICE_SUCCESS",
  payload: id,
});

export const deleteServiceFailure = () => ({
  type: "DELETE_SERVICE_FAILURE",
});
