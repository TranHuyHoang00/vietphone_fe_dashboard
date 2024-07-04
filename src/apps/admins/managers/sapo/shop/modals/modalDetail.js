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
        const { dataShop, isLoading, modalDetail, openModal } = this.props;
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
                        {imageLine13('Ảnh', dataShop.image, 100, 100)}
                        {textLine13('Tên cửa hàng', dataShop.name)}
                        {textLine13('Địa chỉ', `${dataShop?.address},${dataShop?.ward?.name},${dataShop?.ward?.district_code?.name},${dataShop?.ward?.district_code?.province_code?.name}`)}
                        {textLine13('Mô tả', dataShop.description)}
                        {textLine13('Trạng thái', (dataShop?.is_active ? 'Mở' : 'Khóa'))}
                        {textLine13('Google Map', ``)}
                        <iframe title='map'
                            class="w-full h-full"
                            src={`${dataShop?.google_map_url}`}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataShop: state.shop.dataShop,
        isLoading: state.shop.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
