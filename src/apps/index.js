import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Dashboards from './dashboards/index';
import NotFound from './dashboards/pages_error/not_found';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/admin"><Dashboards /></Route>
                    <Redirect from="/" exact to="/admin" />
                    <Route ><NotFound /></Route>
                </Switch>
            </div>
        );
    }

}
export default withRouter(index);
