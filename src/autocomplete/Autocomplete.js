import React from 'react';
import './Autocomplete.css';
import { getData } from './getData';
import debounce from 'lodash/debounce';
// Don't change any declarations.

const DEBOUNCE_TIME = 500;

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      isLoading: false,
      queryTerm: '',
    };

    this.search = debounce(this.search, DEBOUNCE_TIME);
  }

  isLoading = () => (this.state.isLoading ? 'isLoading' : '');

  async search(searchTerm) {
    if (searchTerm.length === 0) {
      this.setState((_) => ({
        searchResults: [],
        queryTerm: '',
      }));
    } else {
      const results = await getData(searchTerm);
      this.setState({
        searchResults: results,
        isLoading: false,
      });
    }
  }

  updateQueryTerm = (queryTerm) => {
    this.setState({ queryTerm: queryTerm, isLoading: true }, () =>
      this.search(queryTerm)
    );
  };

  renderList = (results) => {
    return (
      <>
        {results.map((result, index) => {
          return (
            <a className={'list-item'} key={index}>
              {result}
            </a>
          );
        })}
      </>
    );
  };

  render() {
    return (
      <div className="wrapper">
        <div className={`control ${this.isLoading()}`}>
          <input
            type="text"
            className="input"
            onChange={(e) => this.updateQueryTerm(e.target.value)}
          />
        </div>
        <div className="list">
          {this.state.searchResults.length > 0 &&
            this.renderList(this.state.searchResults)}
        </div>
      </div>
    );
  }
}

export { Autocomplete };
