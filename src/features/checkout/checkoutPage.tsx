import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {AlertIcon, Box, Alert, AlertTitle, AlertDescription, Button} from "@chakra-ui/react";
import {Link, RouteComponentProps} from "react-router-dom";
import rootStoreContext from "../../application/stores/rootstore";
import Loader from "../../application/appLayout/FullPageSpinner";

const checkoutPage: React.FC<RouteComponentProps<{orderId: string}>> = ({match}) => {
    const query = new URLSearchParams(window.location.search);
    const {deleteOrderById, confirmingOrder, confirmOrderByNumber} = useContext(rootStoreContext).orderStore;
    useEffect(() => {
        if(!query.get("success")){
            deleteOrderById(match.params.orderId);        
        }
        confirmOrderByNumber(match.params.orderId);
    }, [])
    if(confirmingOrder) return <Loader />
    return (
        <Box className="container">
            <Box className="main checkout">
                <Box className="middle_position" width="100%" pl={{xl:"9em", lg: "2em", md: "3em", sm: "1em"}} pr={{xl:"9em", lg: "2em", md: "3em", sm: "1em"}}>
            <Alert
                status={query.get("success") ? "success" : "error"}
                variant="left-accent"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
            >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                    {query.get("success") ? "Order confirmed!" : "Payment unsuccessful!"} 
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                    {query.get("success") ? "Your order creation was successful and your money is with us pending when your task is completed!. Thank you for trusting us" : "Your Order creation attempt was failed due to an unsuccessful payment attempt. Please try again."}
                    <Box>
                        {query.get("success") ? <Button className="btn__ghost btn link" variant="ghost" as={Link} to={`/orders/${match.params.orderId}`}>View order &#8594;</Button> :<Button className="btn__ghost btn link" variant="ghost" as={Link} to="/">Go home &#8594;</Button>}
                    </Box>
                </AlertDescription>
            </Alert>
                </Box>
        </Box>
        </Box>
    )
}

export default observer(checkoutPage);