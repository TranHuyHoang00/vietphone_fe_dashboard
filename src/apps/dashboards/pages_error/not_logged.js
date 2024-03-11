import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Result } from 'antd';
class not_logged extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Please login"
                extra={<Button onClick={() => { this.props.history.push('/dashboard/login') }} type="default">Login</Button>}
            />
        );
    }

}
export default withRouter(not_logged);
