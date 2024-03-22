import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, message, Space, Card } from 'antd';
import { get_variant, edit_variant } from '../../../../../services/variant_service';
import { create_media } from '../../../../../services/media_service';
import Card_variant_introduce from './card_variant_introduce';
import Card_variant_overview from './card_variant_overview';
import Select_image from './select_image';
class card_variant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_variants: [],
            data_variant_ids: [],
            data_variant: {},
            active_variant: null,
            is_edit: false,
            data_medias: [],
            data_media_ids: [],
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_variant !== this.props.data_variant) {
            let data_variant = this.props.data_variant;
            if (data_variant && data_variant.length !== 0) {
                this.setState({ data_variant_ids: data_variant });
                await this.get_list_variant(data_variant);
            }
        }
    }
    get_list_variant = async (variant) => {
        let data_variants = [];
        for (const item of variant) {
            let data = await this.get_variant(item);
            data_variants.push(data);
        }
        this.setState({
            data_variants: data_variants,
            active_variant: 0,
            data_variant: data_variants[0],
        });
    }
    get_variant = async (id) => {
        try {
            let data = await get_variant(id);
            if (data && data.data && data.data.success == 1) {
                return data.data.data
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        }
    }
    handle_select_variant = (value, type) => {
        let index;
        let data_variants = this.state.data_variants;
        let data_variant = {};
        if (type == 'radio') { index = value.target.value; }
        if (type == 'button') { index = value; }
        data_variant = data_variants[index];
        this.setState({ active_variant: index, data_variant: data_variant })
    }
    validation = (data) => {
        this.props.handle_loading(true);
        return { code: 0 };
    }
    handle_edit = async (data_variant) => {
        let result = this.validation(data_variant);
        if (result.code == 0) {
            try {
                let data = await edit_variant(data_variant.id, data_variant);
                if (data && data.data && data.data.success == 1) {
                    await this.props.get_product(data_variant.id);
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
            let data_variant = this.state.data_variant;
            let media = await this.handle_create_media(this.state.data_medias);
            data_variant.media = media;
            await this.handle_edit(data_variant);
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
        return (
            <>
                <div className="m-[10px] space-y-[10px]">
                    <div className='flex items-center justify-end'>
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
                    <div className='grid grid-cols-3 gap-[10px] '>
                        <div>
                            <div className='bg-white '>
                                <Card_variant_overview data_variants={this.state.data_variants}
                                    handle_select_variant={this.handle_select_variant} active_variant={this.state.active_variant} />
                            </div>
                        </div>
                        <div className='col-span-2 space-y-[10px]'>
                            <Card title="Chi tiết phiên bản">
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2'>
                                        <Card_variant_introduce data_variant={this.state.data_variant} />
                                    </div>
                                    <div>
                                        <Select_image is_edit={this.state.is_edit} data_variant={this.state.data_variant}
                                            handle_get_media={this.handle_get_media} />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}
export default withRouter(card_variant);