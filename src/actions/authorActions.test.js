import expect from 'expect';
import * as authorActions from './authorActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
xdescribe('Author Actions', () => {
  describe('createAuthorSuccess', () => {
    it('should create a CREATE_AUTHOR_SUCCESS action', () => {
      //arrange
      const author = {id: 'mark-sun', name: 'Mark Sun'};
      const expectedAction = {
        type: types.CREATE_AUTHOR_SUCCESS,
        author: author
      };

      //act
      const action = authorActions.createAuthorSuccess(author);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_AUTHORS_SUCCESS when loading authors', (done) => {
    // Here's an example call to nock.
    // nock('http://example.com/')
    //    .get('/courses)
    //    .reply(200, { body: { course: [{ id: 1, firstName: 'Cory', lastName: 'House}] }});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_AUTHORS_SUCCESS, body: {authors: [{id: 'clean-code', title: 'Clean Code'}]}}
    ];

    const store = mockStore({authors: []}, expectedActions);
    store.dispatch(authorActions.loadAuthors()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_AUTHORS_SUCCESS);
      done();
    });
  });
});