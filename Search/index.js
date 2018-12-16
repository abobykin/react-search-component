import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconSearch from '../../icon/IconSearch';
import IconRemove from '../../icon/IconRemove';
import classNames from 'classnames';
import './style.css';

export default class Search extends Component {
  static propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }

  state = {
    search: this.props.search,
    openedSearchBar: false,
  };

  handleChange = (event) => {
    this.setState({ search: event.target.value });
    if (event.target.value === '') {
      this.props.setSearch('');
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setSearch(this.state.search);
  };

  toggleSearchBar = async () => {
    this.setState({
      openedSearchBar: !this.state.openedSearchBar,
    });
    if (this.state.openedSearchBar && this.state.search) {
      this.setState({ search: '' });
      this.props.setSearch('');
      this.searchInput.current.blur();
    } else if (!this.state.openedSearchBar && this.searchInput.current !== null) {
      this.searchInput.current.focus();
    }
    return false;
  };

  render() {
    const openedSearchBar = this.state.openedSearchBar;

    return (
      <form
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
        className={'search-form'}
      >
        <span
          className={classNames('search-bar', {
            opened: openedSearchBar,
          })}
        >
          <input ref={this.searchInput} value={this.state.search} onChange={this.handleChange} />
          <span onClick={this.toggleSearchBar} className={'btn-search'}>
            <IconSearch width={20} height={20} />
          </span>
          <button className={'submit-overlay'} type={'submit'} />
          <span onClick={this.toggleSearchBar} className={'btn-remove'}>
            <IconRemove width={20} height={20} />
          </span>
        </span>
      </form>
    );
  }
}
