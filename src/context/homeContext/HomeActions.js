//CREATE HOME TEXT
export const createHomeTextStart = () => ({
  type: "CREATE_HOMETEXT_START",
});

export const createHomeTextSuccess = (homeText) => ({
  type: "CREATE_HOMETEXT_SUCCESS",
  payload: homeText,
});

export const createHomeTextFailure = () => ({
  type: "CREATE_HOMETEXT_FAILURE",
});

//GET HOME TEXT
export const getHomeTextStart = () => ({
  type: "GET_HOMETEXT_START",
});

export const getHomeTextSuccess = (homeText) => ({
  type: "GET_HOMETEXT_SUCCESS",
  payload: homeText,
});

export const getHomeTextFailure = () => ({
  type: "GET_HOMETEXT_FAILURE",
});

//UPDATE HOME TEXT
export const updateHomeTextStart = () => ({
  type: "UPDATE_HOMETEXT_START",
});

export const updateHomeTextSuccess = (homeText) => ({
  type: "UPDATE_HOMETEXT_SUCCESS",
  payload: homeText,
});

export const updateHomeTextFailure = () => ({
  type: "UPDATE_HOMETEXT_FAILURE",
});

//DELETE HOME TEXT
export const deleteHomeTextStart = () => ({
  type: "DELETE_HOMETEXT_START",
});

export const deleteHomeTextSuccess = () => ({
  type: "DELETE_HOMETEXT_SUCCESS",
});

export const deleteHomeTextFailure = () => ({
  type: "DELETE_HOMETEXT_FAILURE",
});
