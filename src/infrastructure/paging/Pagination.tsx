import React from "react";
import ReactPaginate from "react-paginate";
import {observer} from "mobx-react-lite";

interface IProps{
    totalRecords: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}

const Pagination : React.FC<IProps> = ({totalPages}) => {
    return (
       <ReactPaginate
            previousLabel="Prev"
            nextLabel="Next&#8594;"
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            breakLabel="..."
            containerClassName="pagination__container"
            pageClassName="pagination__page__box"
            activeClassName="pagination__active"
            nextClassName="pagination__next"
            previousClassName="pagination__prev"
            disabledClassName="pagination__disabled"
            breakClassName="pagination__break"
       /> 
    )
}

export default observer(Pagination);