import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, message, Spin, Typography } from 'antd';
import { get_product, edit_product } from '../../../../../services/product_service';
import { create_media } from '../../../../../services/media_service';
import Card_media from '../elements/card_media';
import Card_introduce from '../elements/card_introduce';
class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_product: {},
            is_loading: false,
            is_edit: false,
            id: '',
            data_medias: [],
            is_active: 0,

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            if (id) {
                this.get_product(id);
                this.setState({ id: id });
            }
        }
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_product = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_product(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_product: data.data.data, is_edit: false });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }

    }
    validation = (data) => {
        this.handle_loading(true);
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên sản phẩm' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async (data_product) => {
        let result = this.validation(data_product);
        if (result.code == 0) {
            try {
                let data = await edit_product(data_product.id, data_product);
                if (data && data.data && data.data.success == 1) {
                    await this.get_product(this.state.id);
                    message.success("Thành công");
                } else {
                    message.error('Thất bại');
                }
            } catch (e) {
                message.error('Lỗi hệ thống');
            }
        } else {
            message.error(result.mess);
        }
        this.handle_loading(false);
    }
    handle_active = (value) => { this.setState({ is_active: value }); }
    render() {
        let data_product = this.state.data_product;
        return (
            <Spin size='large' spinning={this.state.is_loading}>
                <div className="mx-[10px] space-y-[10px]">
                    <Button onClick={() => this.props.history.goBack()}
                        className='bg-[#e94138] text-white'>
                        Quay lại
                    </Button>
                    <Typography.Title level={4}>{data_product.name}</Typography.Title>
                    <div className='grid grid-cols-2 gap-[10px]'>
                        <div className='bg-white'>
                            <Card_introduce is_active={this.state.is_active} handle_active={this.handle_active}
                                data_product={data_product} handle_edit={this.handle_edit} />
                        </div>
                        <div>
                            <div className='bg-white'>
                                <Card_media is_active={this.state.is_active} handle_active={this.handle_active}
                                    data_product={data_product} handle_edit={this.handle_edit} />
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>

        );
    }

}
export default withRouter(edit);
