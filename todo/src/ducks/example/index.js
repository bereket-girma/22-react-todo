// 1. imports
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// 2. action definitions
const ADD_TODO = "example/ADD_TODO";
const DELETE_TODO = "example/DELETE_TODO";
const COMPLETE_TODO = "example/COMPLETE_TODO";
// 3. initial state
const initialState = {
  example: null,
  list: [],
};

function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 4. reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: [
          ...state.list,
          { id: generateId(), text: action.payload, completed: false },
        ], // action.payload
      };
    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };
    case COMPLETE_TODO:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload) {
            item.completed = !item.completed;
          }
          return item;
        }),
      };

    
    default:
      return state;
  }
};

// 5. action creators
// todo action...
function addTheTodo(text) {
  return {
    type: ADD_TODO,
    payload: text,
  };
}

function deleteTheTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}

function completeTheTodo(id) {
  let completed = ADD_TODO.completed;
  if (completed === false) {
    return {
      completed: true,
      type: COMPLETE_TODO,
      payload: id,
    };
  } else {
    return {
      completed: false,
      type: COMPLETE_TODO,
      payload: id,
    };
  }
}

// 6. custom hook
export function useExample() {
  const dispatch = useDispatch();
  const example = useSelector((app) => app.exampleState.example);
  const list = useSelector((app) => app.exampleState.list);
  const addTodo = (text) => dispatch(addTheTodo(text));
  const deleteTodo = (id) => dispatch(deleteTheTodo(id));
  const completeTodo = (id) => dispatch(completeTheTodo(id));
  return {
    example,
    addTodo,
    deleteTodo,
    list,
    completeTodo,
  };
}


