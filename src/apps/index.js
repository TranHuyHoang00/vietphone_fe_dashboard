import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Admin from './admins/index';
import NotFound from './admins/pageErrors/notFound';
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
        const { darkMode } = this.props;
        return (
            <ConfigProvider theme={darkMode ? themeDark : themeLight}>
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
        darkMode: state.darkMode.darkMode,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
