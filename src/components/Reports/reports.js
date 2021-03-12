import React, { Component } from 'react';
import "./style.css";
import { BOOKS } from "../../books/books";

class Reports extends Component {

    render() {
        return (
            <div className="reportsContainier">
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
                    <iframe title="some value" width="100%" height="800px" src={`${BOOKS[this.props.idToPass].url}`}></iframe>
                    : "frame hidden"}

            </div>
        )
    }
}

export default Reports;