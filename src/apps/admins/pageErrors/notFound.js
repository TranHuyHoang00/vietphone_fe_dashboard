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
                subTitle="Xin lỗi, không tìm thấy trang này !"
                extra={<Button onClick={() => { this.props.history.push('/admin') }} type="default">Quay lại</Button>}
            />
        );
    }

}
export default withRouter(index);
