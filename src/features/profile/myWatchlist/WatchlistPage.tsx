import {Box, Stack, Select, HStack, Table, Thead, Tr, Th, Button, Tbody, Checkbox, Td, Image} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import rootStoreContext from "../../../application/stores/rootstore";
import Loader from "../../../application/appLayout/FullPageSpinner";
import {StringParam, useQueryParam} from "use-query-params";
import {ITask} from "../../../infrastructure/models/task";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {LocationIcon, WebIcon} from "../../../infrastructure/icons/Icons";
import SEO from "../../../application/appLayout/SEO";
dayjs.extend(relativeTime);

const WatchlistPage = () => {
    const {loadingInitial, watchList, getWatchlist} = useContext(rootStoreContext).profileStore;
    const [sortBy, setSortBy] = useQueryParam("sortBy", StringParam); 
    useEffect(() => {
        getWatchlist(sortBy ? sortBy : "")
    }, [getWatchlist, sortBy]);
        
    const checkedArr = new Array(3).fill(false);
    const [checkedItems, setCheckedItems] = React.useState(checkedArr);

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
    
    if(loadingInitial || watchList === null) return <Loader  />
    return (
        <Box className="container">
            <SEO title="watchlist" />
            <Box className="main">
               <Stack direction={["column", "row"]} justifyContent="space-between" alignItems="center">
                   <Box>
                       <h2 className="text__primary" style={{fontSize: "20px"}}>Showing {watchList.length} tasks</h2>
                   </Box>
                   
                       <HStack spacing="10px">
                           <Box>
                           <p className="text__darker">Sort by</p>
                           </Box>
                           <Box>
                           <Select value={sortBy ? sortBy : ""} onChange={e => setSortBy(e.target.value)} placeholder="Sort watching" className="form__select__sm" bg="white">
                               <option value="TITLE_A_TO_Z">Title: A-Z</option>
                               <option value="TITLE_Z_TO_A">Title: Z-A</option>
                               <option value="LOWEST_PRICE">Price: Lowest first</option>
                               <option value="HIGHEST_PRICE">Price: Highest first</option>
                               <option value="OLDEST">Posted: Oldest first</option>
                               <option value="NEWEST">Posted: Newest first</option>
                           </Select>
                           </Box>
                       </HStack>
               </Stack>
                
                <Box className="task__bid__form__card watchlist__table" mt={4}>
                    <Table>
                        <Thead>
                           <Tr>
                               <Th><Checkbox isChecked={allChecked} isIndeterminate={isIndeterminate}  onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])} /></Th>
                               <Th className="watchlist__heading"><Button style={{fontSize: "1em"}} className="btn__primary btn__long">Delete</Button></Th>
                               <Th className="watchlist__heading">Budget</Th>
                               <Th className="watchlist__heading">Posted</Th>
                               <Th className="watchlist__heading">Actions</Th>
                           </Tr> 
                        </Thead>
                        <Tbody>
                            {watchList.map((task: ITask, index) => (
                                <Tr key={task.id}>
                                    <Td>
                                        <Checkbox isChecked={checkedItems[index]}
                                                  onChange={(e) => setCheckedItems([e.target.checked, checkedItems[index]])} />
                                    </Td>
                                    <Td>
                                        <HStack spacing="10px">
                                            <Box>
                                                {task.photos.length > 0 && <Image src={task.photos[0].url} alt="task-img" boxSize="50px" />}
                                            </Box>
                                            <Box style={{lineHeight: "1.5em"}}>
                                                <Link to={`/task/${task.id}`} className="text__md text__blue">{task.title}</Link>
                                                <p className="text__darker"><span>{task.postCode ? <LocationIcon boxSize={6} /> : <WebIcon boxSize={6} />}</span> {task.postCode ? task.postCode : "Online"}</p>
                                                
                                                <p className="text__light__grey">Posted by <span className="text__blue">{task.creator.userName}</span></p>
                                            </Box>
                                            <Box>
                                                
                                            </Box>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <p className="text__green text__md">${task.initialPrice}</p>
                                    </Td>
                                    <Td>
                                        <p className="text__silent">&#60; {dayjs(task.createdAt).fromNow()}</p>
                                        <small style={{marginTop: "0.5em", display: "block"}} className="text__silent">Ends {dayjs(task.deliveryDate).from(task.createdAt)}</small>
                                    </Td>
                                    <Td>
                                        <Button variant="ghost" className="btn btn__ghost text__blue">Delete</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    )
}

export default observer(WatchlistPage);