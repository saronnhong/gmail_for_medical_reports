import React, { Component } from 'react';
import "./style.css";
import { BOOKS } from "../../books/books";

class Reports extends Component {

    componentDidUpdate() {
        console.log(this.props.tags.goodreport);
    }

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
                    <div>
                        {this.props.tags.goodreport.includes(this.props.idToPass) ?
                            <button type="button" class="btn btn-danger tagbutton" onClick={() => this.props.removeTag("goodreport", this.props.idToPass)}>- goodreport</button>
                            : <button type="button" class="btn btn-success tagbutton" onClick={() => this.props.addTag("goodreport", this.props.idToPass)}>+ goodreport</button>}

                        {this.props.tags.conditionpresent.includes(this.props.idToPass) ?
                            <button type="button" class="btn btn-danger tagbutton" onClick={() => this.props.removeTag("conditionpresent", this.props.idToPass)}>- conditionpresent</button>
                            : <button type="button" class="btn btn-success tagbutton" onClick={() => this.props.addTag("conditionpresent", this.props.idToPass)}>+ conditionpresent</button>}
                        {/* <button onClick={()=>this.props.addTag("conditionpresent", this.props.idToPass)}>
                        {this.props.tags.conditionpresent[this.props.idToPass] ?
                            "+ conditionpresent"
                            : "- conditionpresent"}
                        </button> */}
                        <iframe title="some value" width="100%" height="800px" src={`${BOOKS[this.props.idToPass].url}`}></iframe>
                    </div>
                    : null}

            </div>
        )
    }
}

export default Reports;