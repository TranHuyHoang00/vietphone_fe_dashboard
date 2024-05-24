import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
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
            <>
                <Button onClick={() => this.props.openModal(this.props.type, false)}
                    className='bg-[#e94138] text-white'>
                    Hủy bỏ
                </Button>
                <Button disabled={this.props.isLoading} onClick={() => this.props.selectFuncFooterModal()}
                    className='bg-[#0e97ff] text-white'>
                    Xác nhận
                </Button>
            </>
        );
    }

}
export default withRouter(index);