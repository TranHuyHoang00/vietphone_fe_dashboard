import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13 } from '@components/displays/line13';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataCategoryPost, isLoading, modalDetail, openModal } = this.props;
        return (
            <Modal title="CHI TIẾT" open={modalDetail}
                onCancel={() => openModal("detail", false)} width={400}
                footer={[
                    <Button onClick={() => openModal("detail", false)}
                        className='bg-[#e94138] text-white'>
                        Hủy bỏ
                    </Button>
                ]}>
                <Spin spinning={isLoading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {textLine13('Tiêu đề', dataCategoryPost.title)}
                        {textLine13('Slug', dataCategoryPost.slug)}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCategoryPost: state.categoryPost.dataCategoryPost,
        isLoading: state.categoryPost.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
