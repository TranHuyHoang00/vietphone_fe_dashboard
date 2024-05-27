import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Result } from 'antd';
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
            <Result
                status="404"
                title="404"
                subTitle="Vui lòng đăng nhập để sử dụng"
                extra={<Button onClick={() => { this.props.history.push('/admin/login') }} type="default">Đăng nhập ngay</Button>}
            />
        );
    }

}
export default withRouter(index);
