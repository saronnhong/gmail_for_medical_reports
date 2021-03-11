import React, { Component } from 'react';
import "./style.css";
import raw from "raw.macro";
import { BOOKS } from "../../books/books";


class SearchBar extends Component {
    state = {
        library: [],
        search: '',
        searchResults: [],
        excludedWords: '',
        isSearchOptionsDisplay: false
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
            let test = fileContents.toLowerCase().replace(/[^A-Za-z' ;]/g, "").split(' ');

            let hash = {};
            for (let j = 0; j < test.length; j++) {
                if (!hash[test[j]]) {
                    hash[test[j]] = 1;
                } else {
                    hash[test[j]]++;
                }
            }
            let currentStorage = { title: fileTitle, author: fileAuthor, dictionary: hash }
            tempState.push(currentStorage);
            console.log(tempState);
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
        this.setState({ searchResults: searchResultsItems });
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.searchBooks();
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="appTitle text-center">Gmail For Medical Reports</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center ">
                        <div className="input-group mb-3 searchContainer">
                            <button type="button" className="input-group-text btn btn-secondary" onClick={() => this.searchBooks()}>
                                <i className="fas fa-search"></i>
                            </button>
                            <input id="mainSearchInput" type="text" className="form-control" placeholder="Search Medical Reports"
                                onChange={e => this.setState({ search: e.target.value })}
                                onKeyDown={this.handleKeyDown}
                            />
                            <div className="noSpace" onClick={() => this.setState({ isSearchOptionsDisplay: !this.state.isSearchOptionsDisplay })}>
                                <button type="button" className="input-group-text btn transparent downArrow" >
                                    <i class="fas fa-sort-down"></i>
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
                {this.state.isSearchOptionsDisplay ?
                    <div className="dropDownContainer">
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center ">
                                <div className="input-group mb-3 searchContainerDropDown">
                                    <span className="input-group-text dropDownLabel" id="basic-addon1">Included words</span>
                                    <input type="text" className="form-control" placeholder="" onChange={e => this.setState({ search: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center ">
                                <div class="input-group mb-3 searchContainerDropDown">
                                    <span class="input-group-text dropDownLabel" id="basic-addon1">Excluded words</span>
                                    <input type="text" class="form-control" placeholder="" onChange={e => this.setState({ excludedWords: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center ">
                                <button type="button" className="btn btn-primary searchBtnDropDown" onClick={() => this.searchBooks()}>Search With Filters</button>
                            </div>
                        </div>



                    </div>
                    : null
                }
                {this.state.searchResults.map((book) =>
                    <h3 key={book.id}>{book.title} by {book.author}</h3>
                )}
            </div>
        )
    }
}

export default SearchBar;