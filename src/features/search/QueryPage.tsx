import React, {useContext, useEffect} from "react";
import QueryActions from "./QueryActions";
import rootStoreContext from "../../application/stores/rootstore";
import {observer} from "mobx-react-lite";
import InlineLoader from "../../application/appLayout/InlineLoader";
import QueryBody from "./QueryBody";
import {NumberParam, StringParam, useQueryParams} from "use-query-params";
import { Box, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import {Category} from "../../infrastructure/enums/category";
import {DeliveryTypes} from "../../infrastructure/enums/deliveryTypes";

const QueryPage = () => {
    const {loadingInitial, tasks, getAllJobs, taskQueryValues, setTasksQueryParams} = useContext(rootStoreContext).taskStore;
    const [queryParams, setParams] = useQueryParams({
        title: StringParam,
        deliveryType: NumberParam,
        category: NumberParam,
        sortBy: StringParam,
        minPrice: NumberParam,
        maxPrice: NumberParam
    }) 
    
    setTasksQueryParams(queryParams.title!, queryParams.maxPrice!, queryParams.minPrice!, 1, 20, queryParams.sortBy!, queryParams.category!, queryParams.deliveryType!);
    useEffect(() => {
        getAllJobs();
    }, [getAllJobs, taskQueryValues, queryParams])
    
    return (
        <div className="container">
            <div className="main">
                <div>
                    {queryParams.title && <h1 className="text__lg">Results for {`"${queryParams.title}"`}</h1>}
                    <div className="query__body">
                    <QueryActions />
                        {loadingInitial || tasks === null ? <InlineLoader /> : (
                            <div>
                                <Box mt={8}>
                                    <ul className="profile__skill__list">
                                        {Object.entries(queryParams).map(([queryParam, queryKey], index) => (
                                            queryKey !== undefined && <Tag
                                                size="lg"
                                                key={index}
                                                borderRadius="full"
                                                variant="solid"
                                                className="filter__tags"
                                            >
                                                <TagLabel>{queryParam === "category" && typeof(queryKey) === "number" ? Category[queryKey!] : queryParam === "deliveryType" && typeof(queryKey) === "number" ? DeliveryTypes[queryKey!] : queryParam === "minPrice" || queryParam === "maxPrice" ? `$${queryKey}` :  queryKey}</TagLabel>
                                                <TagCloseButton onClick={() => setParams({...queryParams, [queryParam]: undefined})} />
                                            </Tag> 
                                        ))}
                                    </ul>
                                </Box>
                                <QueryBody tasks={tasks} taskQueryValues={taskQueryValues}/>
                            </div>
                        )}                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(QueryPage);