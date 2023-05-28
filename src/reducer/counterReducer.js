import { CREATE_USER, EDIT_USER, DELETE_USER } from "../actions/actionType";

const initialState = {
  objectArray: [],
};

const counterReducer = (state = initialState, action) => {

  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        objectArray: [...state.objectArray, action.payload],
      };
    case "DELETE_USER":
      return {
        ...state,
        objectArray: state.objectArray.filter(
          (obj) => obj.id !== action.payload
        ),
      };
    case "EDIT_USER":
      return {
        ...state,
        objectArray: state.objectArray.map((obj) => {
          if (obj.id === action.payload.id) {
            return {
              ...obj,
              ...action.payload, // Update the object with the new values
            };
          }
          return obj;
        }),
      };
    // ... handle other actions
    default:
      return state;
  }
};
export default counterReducer;