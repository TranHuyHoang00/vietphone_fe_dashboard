import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Button, Space, message, Spin } from 'antd';
import VariantOverview from '../collapses/variant_overview';
import VariantIntroduce from '../collapses/variant_introduce';
import VariantMedia from '../collapses/variant_media';
import VariantAttributeValue from '../collapses/variant_attribute_value';
import { create_media } from '../../../../../../../services/media_service';
class variant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_product: {},
            data_variant_ids: [],
            data_variants: [],
            data_variant: {},
            active_variant: '',

            data_medias: [],
            data_media_ids: [],
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_variants !== this.props.data_variants) {
            let data_variant_ids = this.props.data_variants;
            if (data_variant_ids && data_variant_ids.length !== 0) {
                this.setState({ data_variant_ids: data_variant_ids });
                await this.get_list_variant(data_variant_ids);
            }
        }
    }
    get_list_variant = async (data_variant_ids) => {
        let data_variants = [];
        for (const id of data_variant_ids) {
            await this.props.get_variant(id);
            let data_variant = this.props.data_variant;
            data_variants.push(data_variant);
        }
        this.setState({ data_variants: data_variants, active_variant: (data_variants.length) - 1 });
    }
    select_variant = async (index) => {
        let data_variants = this.state.data_variants;
        this.setState({ active_variant: index })
        await this.props.get_variant(data_variants[index].id);
    }
    handle_data_media = (data_medias, data_media_ids) => {
        this.setState({ data_medias: data_medias, data_media_ids: data_media_ids });
    }
    handle_create_media = async (data_medias) => {
        try {
            let data_media_ids_new = [];
            let data_media_ids = this.state.data_media_ids;
            for (const item of data_medias) {
                if (!item.id) {
                    let data = await create_media(item);
                    if (data && data.data && data.data.success === 1) {
                        data_media_ids_new.push(data.data.data.id);
                    }
                }
            }
            return [...data_media_ids_new, ...data_media_ids];
        } catch (e) {
            message.error('Lỗi hệ thống');
        }
    }
    handle_edit_variant = async () => {
        let data_variant = this.props.data_variant;
        if (this.props.is_edit === false) { this.props.click_edit_variant() };
        if (this.props.is_edit) {
            if (this.state.data_medias.length !== 0) {
                let media = await this.handle_create_media(this.state.data_medias);
                data_variant.media = media;
            }
            await this.props.edit_variant(data_variant.id, data_variant);
            await this.props.get_variant(data_variant.id);
            this.props.click_edit_variant();
        }
    }
    render() {
        return (
            <Spin size='large' spinning={this.props.is_loading}>
                <div className=" space-y-[10px]">
                    <div className='flex items-center justify-end'>
                        <Space>
                            {this.props.is_edit &&
                                <Button onClick={() => this.props.click_edit_variant()}
                                    className='bg-[#e94138] text-white'>
                                    Hủy
                                </Button>
                            }
                            <Button onClick={() => this.handle_edit_variant()} className='bg-[#0e97ff] text-white'>
                                {this.props.is_edit === false ? 'Chỉnh sửa' : 'Lưu'}
                            </Button>
                        </Space>
                    </div>
                    <div className='lg:grid grid-cols-3 gap-[10px] space-y-[10px] lg:space-y-0 '>
                        <div>
                            <VariantOverview data_variants={this.state.data_variants}
                                select_variant={this.select_variant}
                                active_variant={this.state.active_variant} />
                        </div>
                        <div className='col-span-2 space-y-[10px]'>
                            <div className='md:grid grid-cols-3 gap-[10px] space-y-[10px] md:space-y-0'>
                                <div className='col-span-2 '>
                                    <VariantIntroduce data_variant={this.props.data_variant} />
                                </div>
                                <div>
                                    <VariantMedia data_medias={this.props.data_variant.media}
                                        handle_data_media={this.handle_data_media} />
                                </div>
                            </div>
                            <VariantAttributeValue />
                        </div>
                    </div>
                </div>
            </Spin>
        );
    }
}
const mapStateToProps = state => {
    return {
        is_loading: state.variant.is_loading,
        data_variant: state.variant.data_variant,
        is_edit: state.variant.is_edit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_variant: (id) => dispatch(actions.get_variant_redux(id)),
        click_edit_variant: (value) => dispatch(actions.click_edit_variant_redux(value)),
        edit_variant: (id, data) => dispatch(actions.edit_variant_redux(id, data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant));
