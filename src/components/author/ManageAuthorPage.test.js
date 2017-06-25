/*
import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageAuthorPage} from './ManageAuthorPage';

xdescribe ('Manage Author Page', () => {
  it('sets error message when trying to save empty name', () => {
    const props = {
      actions: { saveAuthor: () => { return Promise.resolve(); }},
      author: {id: '', name: ''}
    };
    const wrapper = mount(<ManageAuthorPage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.name).toBe('Name must be at least 3 characters.');
  });
});

*/