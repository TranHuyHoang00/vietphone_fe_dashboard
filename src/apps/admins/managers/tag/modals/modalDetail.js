import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13, imageLine13 } from '@components/displays/line13';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataTag, isLoading, modalDetail, openModal } = this.props;
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
                        {imageLine13('Ảnh', dataTag.image, 50, 50)}
                        {textLine13('Tên danh mục', dataTag.name)}
                        {textLine13('Icon', dataTag.icon)}
                        {textLine13('Mô tả', dataTag.description)}
                        {textLine13('Trạng thái', (dataTag && dataTag.is_active ? 'Mở' : 'Khóa'))}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        isLoading: state.tag.isLoading,
        dataTag: state.tag.dataTag,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
