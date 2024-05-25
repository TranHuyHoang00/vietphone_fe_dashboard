import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Admin from './admins/index';
import NotFound from './admins/pages_error/not_found';
import { ConfigProvider } from 'antd';
import { themeLight } from '@assets/themes/themeLight';
import { themeDark } from '@assets/themes/themeDark';
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
            <ConfigProvider theme={dark_mode ? themeDark : themeLight}>
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
