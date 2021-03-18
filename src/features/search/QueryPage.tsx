import React, {useContext, useEffect} from "react";
import QueryActions from "./QueryActions";
import rootStoreContext from "../../application/stores/rootstore";
import {observer} from "mobx-react-lite";
import InlineLoader from "../../application/appLayout/InlineLoader";
import QueryBody from "./QueryBody";
import {NumberParam, StringParam, useQueryParams} from "use-query-params";
import {Box, Center, Tag, TagCloseButton, TagLabel, Image} from "@chakra-ui/react";
import {Category} from "../../infrastructure/enums/category";
import {DeliveryTypes} from "../../infrastructure/enums/deliveryTypes";
import SEO from "../../application/appLayout/SEO";
import notFoundImage from "../../assets/images/undraw_page_not_found_su7k.svg";
import {IdeaIcon} from "../../infrastructure/icons/Icons";
import SoftAlert from "../../application/common/SoftAlert";

const QueryPage = () => {
    const {loadingInitial, tasks, getAllJobs, taskQueryValues, setTasksQueryParams} = useContext(rootStoreContext).taskStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
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
    
    setTasksQueryParams(queryParams.title!, queryParams.maxPrice!, queryParams.minPrice!, queryParams.pageNumber!, queryParams.pageSize!, queryParams.sortBy!, queryParams.category!, queryParams.deliveryType!);
    useEffect(() => {
        getAllJobs();
    }, [getAllJobs, taskQueryValues, queryParams])
    
    return (
        <div className="container">
            <SEO title={`search results for ${queryParams.title}`} />
            <div className="main">
                <div>
                    <Box>
                        {!isLoggedIn && <SoftAlert icon={<IdeaIcon color="#719FF1" boxSize={10} />} message="See a task you can complete? or Post a task and have runners complete it for you? Register or login now to access them" />}
                    </Box>
                    
                    {queryParams.title && <h1 className="text__lg">Results for {`"${queryParams.title}"`}</h1>}
                    <div className="query__body">
                    <QueryActions />
                        {loadingInitial || tasks === null ? <InlineLoader /> : (
                            <div>
                                <Box mt={8}>
                                    <ul className="profile__skill__list">
                                        {Object.entries(queryParams).map(([queryParam, queryKey], index) => (
                                            queryKey !== undefined && queryParam !== "pageSize" && queryParam !== "pageNumber" && <Tag
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
                                {tasks.data.length > 0 ? <QueryBody tasks={tasks} taskQueryValues={taskQueryValues}/> : (
                                    <Center mt="2em">
                                        <Box>
                                            <Center><Image src={notFoundImage} alt="404" maxW="600px" width="80%"/></Center>
                                            <Center mt={5}><h1 className="text__lg">No task was found for your search</h1></Center>
                                            <Center><p className="text__md text__darker">Try new search or post a task now</p></Center>
                                        </Box>
                                    </Center>
                                )}
                            </div>
                        )} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(QueryPage);