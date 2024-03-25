import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, message, Typography, Card, Space } from 'antd';
import { edit_product } from '../../../../../services/product_service';
import { create_media } from '../../../../../services/media_service';
import Product_media from '../elements/product_media';
import Product_introduce from '../elements/product_introduce';
import Card_attribute_value from '../cards/card_attribute_value';
import Card_content from '../cards/card_content';
class card_product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_product: {},
            is_edit: false,
            data_medias: [],
            data_media_ids: [],
        }
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_product !== this.props.data_product) {
            let data_product = this.props.data_product;
            this.setState({ data_product: data_product });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_product };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_product: {
                ...copyState
            }
        });
    }
    validation = (data) => {
        this.props.handle_loading(true);
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
                    await this.props.get_product(data_product.id);
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
        this.props.handle_loading(false);
    }
    onclick_edit = async () => {
        if (this.state.is_edit == true) {
            let data_product = this.state.data_product;
            let media = await this.handle_create_media(this.state.data_medias);
            data_product.media = media;
            await this.handle_edit(data_product);
            this.setState({ is_edit: false });
        } else {
            this.setState({ is_edit: true, });
        }
    }
    handle_get_media = (data_medias, data_media_ids) => {
        this.setState({ data_medias: data_medias, data_media_ids: data_media_ids });
    }
    handle_create_media = async (data_medias) => {
        try {
            let data_media_ids_new = [];
            let data_media_ids = this.state.data_media_ids;
            for (const item of data_medias) {
                if (!item.id) {
                    let data = await create_media(item);
                    if (data && data.data && data.data.success == 1) {
                        data_media_ids_new.push(data.data.data.id);
                    }
                }
            }
            return [...data_media_ids_new, ...data_media_ids];
        } catch (e) {
            message.error('Lỗi hệ thống');
        }
    }



    render() {
        let data_product = this.state.data_product;
        return (
            <div className="m-[10px] space-y-[10px]">
                <div className='flex items-center justify-between'>
                    <Typography.Title level={4}>{data_product.name}</Typography.Title>
                    <Space>
                        {this.state.is_edit == true &&
                            <Button onClick={() => { this.setState({ is_edit: false }) }}
                                className='bg-[#e94138] text-white'>
                                Hủy
                            </Button>
                        }
                        <Button onClick={() => this.onclick_edit()} className='bg-[#0e97ff] text-white'>
                            {this.state.is_edit == false ? 'Chỉnh sửa' : 'Lưu'}
                        </Button>
                    </Space>
                </div>
                <div className='lg:grid grid-cols-2 gap-[10px] space-y-[10px] lg:space-y-0'>
                    <Card title="Thông tin sản phẩm">
                        <div className='space-y-[10px]'>

                            <Product_introduce is_edit={this.state.is_edit} data_product={this.state.data_product}
                                handle_onchange_input={this.handle_onchange_input} />

                            <Product_media is_edit={this.state.is_edit} data_product={this.state.data_product}
                                handle_get_media={this.handle_get_media} />

                        </div>
                    </Card>
                    <Card_attribute_value is_edit={this.state.is_edit}
                        type_handle={'product'}
                        data_attributes={this.state.data_product.attribute_values}
                        handle_onchange_input={this.handle_onchange_input} />
                </div>
                <Card_content is_edit={this.state.is_edit} data_product={this.state.data_product}
                    handle_onchange_input={this.handle_onchange_input} />
            </div>
        );
    }

}
export default withRouter(card_product);
