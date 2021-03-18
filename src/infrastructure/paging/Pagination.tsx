import React from "react";
import ReactPaginate from "react-paginate";
import {observer} from "mobx-react-lite";
import {NumberParam, StringParam, useQueryParams} from "use-query-params";

interface IProps{
    totalRecords: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}

const Pagination : React.FC<IProps> = ({totalPages}) => {
    const [queryParams, setParams] = useQueryParams({
        title: StringParam,
        deliveryType: NumberParam,
        category: NumberParam,
        sortBy: StringParam,
        minPrice: NumberParam,
        maxPrice: NumberParam,
        pageSize: NumberParam,
        pageNumber: NumberParam
    })
    return (
       <ReactPaginate
            previousLabel="Prev"
            nextLabel="Next&#8594;"
            pageCount={totalPages}
            onPageChange = {(data) => {
                const selected = data.selected;
                setParams({...queryParams, pageNumber: selected + 1});
            }}
            initialPage={queryParams.pageNumber ? queryParams.pageNumber - 1 : 0}
            pageRangeDisplayed={5}
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