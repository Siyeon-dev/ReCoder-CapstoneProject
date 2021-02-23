import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Main from './Components/Mobile/Main';
import Guide from './Components/Mobile/Guide';
import Camera from './Components/Mobile/Camera';

function Router() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" exact={true} component={Main} />
                    <Route path="/Guide" exact={true} component={Guide} />
                    <Route path="/Camera" exact={true} component={Camera} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Router;