import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Redirect, Route, RouteProps, RouteComponentProps} from "react-router-dom";
import rootStoreContext from "../../application/stores/rootstore";

interface IProps extends RouteProps{
    component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({component:  Component, ...rest}) => {
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    return (
        <Route {...rest} render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to='/signin' />} />
    )
}

export default observer(PrivateRoute);