import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Admin from './admins/index';
import NotFound from './admins/pages_error/not_found';
import { ConfigProvider } from 'antd';
import { theme_light } from '@assets/themes/theme_light';
import { theme_dark } from '@assets/themes/theme_dark';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
    }
    render() {
        let dark_mode = this.props.dark_mode;
        return (
            <ConfigProvider theme={dark_mode ? theme_dark : theme_light}>
                <Switch>
                    <Route path="/admin"><Admin /></Route>
                    <Redirect from="/" exact to="/admin" />
                    <Route ><NotFound /></Route>
                </Switch>
            </ConfigProvider>
        );
    }

}
const mapStateToProps = state => {
    return {
        dark_mode: state.dark_mode.dark_mode,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
