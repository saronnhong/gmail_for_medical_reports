import React, { Component } from 'react';
import "./style.css";
import { BOOKS } from "../../books/books";

let temp = process.env.PUBLIC_URL + '/books/He_That_Will_Not_When_He_May.txt'
class Reports extends Component {

    render() {
        return (
            <div>
                {this.props.isDisplayTable ?
                    <table class="table table-hover table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Books</th>
                                <th scope="col">Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.searchResults.map((book) =>
                                <tr onClick={() => this.props.onClick(book)}>
                                    <th scope="row">{book.id}</th>
                                    <td>{book.title} by {book.author}</td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    : null
                }

                {this.props.isDisplayTxtFile ?
                    <iframe title="some value" width="100%" height="800px" src={`https://docs.google.com/gview?url=${BOOKS[this.props.idToPass].url}&embedded=true`}></iframe>
                    : "frame hidden"}
                <iframe title="some value" width="100%" height="800px" src={`https://docs.google.com/gview?url=${BOOKS[0].url}}&embedded=true`}></iframe>

            </div>
        )
    }
}

export default Reports;