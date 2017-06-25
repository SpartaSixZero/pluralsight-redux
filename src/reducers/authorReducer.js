import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  //debugger;
  switch(action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    case types.CREATE_AUTHOR_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.author)
      ];

    case types.DELETE_AUTHOR_SUCCESS:
      //debugger;
      return state.filter(author => author.id !== action.authorId);

    default:
      return state;
  }
}