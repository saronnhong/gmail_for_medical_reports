import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Reports from './components/Reports';
import './App.css';
import { BOOKS } from "./books/books";


class App extends Component {
  state = {
    library: [],
    search: '',
    searchResults: [],
    excludedWords: '',
    isSearchOptionsDisplay: false,
    isDisplayTxtFile: false,
    idToPass: 0,
    isDisplayTable: false
  }
  componentDidMount() {
    this.createDictionary()
  }

  createDictionary = () => {
    let tempState = [];
    for (let i = 0; i < BOOKS.length; i++) {
      let fileContents = BOOKS[i].location;
      let fileAuthor = BOOKS[i].author;
      let fileTitle = BOOKS[i].title;
      let fileId = BOOKS[i].id;
      let test = fileContents.toLowerCase().replace(/[^A-Za-z' ;]/g, "").split(' ');

      let hash = {};
      for (let j = 0; j < test.length; j++) {
        if (!hash[test[j]]) {
          hash[test[j]] = 1;
        } else {
          hash[test[j]]++;
        }
      }
      let currentStorage = { title: fileTitle, author: fileAuthor, dictionary: hash, id: fileId, location: fileContents }
      tempState.push(currentStorage);
    }
    this.setState({ library: tempState });
  }
  searchBooks = () => {
    const { library } = this.state;
    const { search } = this.state;
    const { excludedWords } = this.state;

    let searchItems = search.toLowerCase().split(' ');
    let excludedItems = excludedWords.toLowerCase().split(' ');
    let searchResultsItems = [];
    for (let book in library) {
      let wordChecker = true;
      for (let k = 0; k < searchItems.length; k++) {
        if (!library[book].dictionary[searchItems[k]]) {
          wordChecker = false;
        }
      }
      if (excludedWords.length > 0) {
        for (let l = 0; l < excludedItems.length; l++) {
          if (library[book].dictionary[excludedItems[l]]) {
            wordChecker = false;
          }
        }
      }
      if (wordChecker === true) {
        searchResultsItems.push(library[book]);
      }
    }
    this.setState({ ...this.state, searchResults: searchResultsItems, isDisplayTable: true, isDisplayTxtFile: false }, () => console.log(this.state.searchResults));
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.searchBooks();
    }
  }

  onClickBookRow = (book) => {
    this.setState({ ...this.state, isDisplayTxtFile: true, idToPass: book.id, isDisplayTable: false })
  }

  onClickSearchDropDown = () => {
    this.setState({ isSearchOptionsDisplay: !this.state.isSearchOptionsDisplay })
  }
  onChangeSearchInput = (e) => {
    this.setState({ search: e.target.value })
  }
  onChangeExcludeInput = (e) => {
    this.setState({ excludedWords: e.target.value })
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              biggie
            </div>
            <div className="col-md-10">
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="appTitle text-center">Gmail For Medical Reports</h1>
                  </div>
                </div>
                <SearchBar
                  isSearchOptionsDisplay={this.state.isSearchOptionsDisplay}
                  onClickSearchDropDown={this.onClickSearchDropDown}
                  onClickSearchBtn={this.searchBooks}
                  onChangeSearchInput={this.onChangeSearchInput}
                  onChangeExcludeInput={this.onChangeExcludeInput}
                  handleKeyDown={this.handleKeyDown}
                />
                <Reports
                  isDisplayTable={this.state.isDisplayTable}
                  searchResults={this.state.searchResults}
                  isDisplayTxtFile={this.state.isDisplayTxtFile}
                  idToPass={this.state.idToPass}
                  onClick={this.onClickBookRow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
