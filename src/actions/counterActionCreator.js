import { CREATE_USER, EDIT_USER, DELETE_USER } from "./actionType";


export const addObject = (object) => {
  return {
    type: "CREATE_USER",
    payload: object,
  };
};

export const removeObject = (objectId) => {
  return {
    type: "DELETE_USER",
    payload: objectId,
  };
};

export const editObject = (object) => {
  return {
    type: "EDIT_USER",
    payload: object,
  };
};