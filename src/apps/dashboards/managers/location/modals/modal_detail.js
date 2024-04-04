import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import { text_line_1_3 } from '../../../components/displays/data_line_1_3';

class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_location = this.props.data_location;
        return (
            <Modal title="CHI TIẾT" open={this.props.modal_detail}
                onCancel={() => this.props.open_modal("detail", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <div className='border-t py-[10px] space-y-[5px]'>
                    {text_line_1_3('Tên vị trí', data_location.name)}
                    {text_line_1_3('Code', data_location.code)}
                </div>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_location: state.location.data_location,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));
