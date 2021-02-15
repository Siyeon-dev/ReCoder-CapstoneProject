import React from 'react';
import { Route, HashRouter, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Header from './Header';
import Main from './Main';
import Guide from './Guide';
import Camera from './Camera';

function Router() {
    return (
        <div>
            <HashRouter>
                <Route path="/" exact={true} component={Main} />
                <Route path="/Guide" exact={true} component={Guide} />
                <Route path="/Camera" exact={true} component={Camera} />
            </HashRouter>
        </div>
    );
}

export default Router;