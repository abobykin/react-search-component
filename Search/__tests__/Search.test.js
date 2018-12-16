import React from 'react';
import { shallow, mount } from 'enzyme';

import Search from '../';

describe('Search ', () => {
  let tree;

  beforeEach(() => {
    tree = shallow(<Search search={''} setSearch={() => {}} />);
  });

  it('opens successfully by click on the toggle', () => {
    tree.find('.btn-search').simulate('click');

    expect(tree.state().openedSearchBar).toEqual(true);
    expect(tree.find('.search-bar').hasClass('opened')).toEqual(true);
  });

  it('hides successfully by click on the toggle', () => {
    tree.find('.btn-search').simulate('click');
    tree.find('.btn-remove').simulate('click');

    expect(tree.state().openedSearchBar).toEqual(false);
    expect(tree.find('.search-bar').hasClass('opened')).toEqual(false);
  });

  it('sets the current value for the search', () => {
    const setSearchMock = jest.fn((searchValue) => {
      return searchValue;
    });
    tree = mount(<Search search={''} setSearch={setSearchMock} />);
    const searchInput = tree.find('.search-bar input');
    const searchForm = tree.find('.search-form');

    tree.find('.btn-search').simulate('click');
    searchInput.simulate('change', { target: { value: 'something' } });

    searchForm.simulate('submit');

    expect(tree.state().search).toEqual('something');
    expect(setSearchMock).toBeCalled();
  });

  it('cleans the value for search on closing', () => {
    const setSearchMock = jest.fn((searchValue) => {
      return searchValue;
    });
    tree = mount(<Search search={''} setSearch={setSearchMock} />);
    const searchInput = tree.find('.search-bar input');

    tree.find('.btn-search').simulate('click');
    searchInput.simulate('change', { target: { value: 'something' } });

    tree.find('.btn-remove').simulate('click');

    expect(tree.state().search).toEqual('');
    expect(setSearchMock).toBeCalled();
  });
});
