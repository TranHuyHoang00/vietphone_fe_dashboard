import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Result } from 'antd';
class not_found extends Component {
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
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={() => { this.props.history.push('/dashboard') }} type="default">Back</Button>}
            />
        );
    }

}
export default withRouter(not_found);
