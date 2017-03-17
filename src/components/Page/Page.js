/**
 * 
 */

import React, { Component } from 'react';

class Page extends Component {
    constructor(props) {
        super(props);
    }
    action(index) {
        // if( Object.prototype.toString.call(cell) === "[object String]" && (self.lastPage &&  cell === "next" || self.page === 1 && cell === "prev")) {
        //     return false;
        // }
        this.props.setPage(index);
    }
    prevPage() {
        let prevPage = this.props.pageInfo.currentPage;
        prevPage--;
        if (prevPage > 0) {
            this.props.setPage(prevPage);
        }
    }
    nextPage() {
        let nextPage = this.props.pageInfo.currentPage;
        nextPage++;
        if (nextPage > 0 && !this.props.pageInfo.lastPage) {
            this.props.setPage(nextPage);
        }
    }
    render() {
        const pageInfo = this.props.pageInfo;
        const self = this;
        const firstPage = pageInfo.currentPage === 1 ? true : false;
        // console.log(currentPage, limit, lastPage);

        let listHtml = "";
        if (!pageInfo.lastPage && pageInfo.currentPage < 4) {
            listHtml = [1, 2, 3, 4, 5].map(function (cell, index) {
                if (cell === pageInfo.currentPage) {
                    return (
                        <li className="active" key={index}>
                            <a href="javascript:;" onClick={self.action.bind(self, cell)}>{cell}</a>
                        </li>
                    )
                } else {
                    return (
                        <li key={index}>
                            <a href="javascript:;" onClick={self.action.bind(self, cell)}>{cell}</a>
                        </li>
                    )
                }
            })
        } else if (!pageInfo.lastPage && pageInfo.currentPage > 3) {
            const p = pageInfo.currentPage;
            listHtml = [p - 2, p - 1, p, p + 1, p + 2].map(function (cell, index) {
                if (cell === pageInfo.currentPage) {
                    return (
                        <li className="active" key={index}>
                            <a href="javascript:;" onClick={self.action.bind(self, cell)}>{cell}</a>
                        </li>
                    )
                } else {
                    return (
                        <li key={index}>
                            <a href="javascript:;" onClick={self.action.bind(self, cell)}>{cell}</a>
                        </li>
                    )
                }
            })
        } else if (pageInfo.lastPage) {
            const p = pageInfo.currentPage;
            listHtml = [p - 4, p - 3, p - 2, p - 1, p].map(function (cell, index) {
                if (cell === pageInfo.currentPage) {
                    return (
                        <li className="active" key={index}>
                            <a href="javascript:;" onClick={self.action.bind(self, cell)}>{cell}</a>
                        </li>
                    )
                } else {
                    return (
                        <li key={index}>
                            <a href="javascript:;" onClick={self.action.bind(self, cell)}>{cell}</a>
                        </li>
                    )
                }
            })
        }

        return (
            <ul className="pagination">
                <li className={firstPage ? "disabled" : ""}>
                    <a href="javascript:;" onClick={this.prevPage.bind(this)}>
                        <i className="material-icons">chevron_left</i>
                    </a>
                </li>
                {listHtml}
                <li className="">
                    <a href="javascript:;" onClick={this.nextPage.bind(this)}>
                        <i className="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        )
    }
}

export default Page;