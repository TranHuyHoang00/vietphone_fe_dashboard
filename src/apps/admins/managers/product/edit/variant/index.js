import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Space, message, Spin } from 'antd';
import VariantOverview from './elements/variant_overview';
import VariantIntroduce from './elements/variant_introduce';
import VariantMedia from './elements/variant_media';
import VariantAttributeValue from './elements/variant_attribute_value';
import { create_media } from '@services/media_service';
import { showNotification } from '@utils/handleFuncNotification';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_products } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_variants: [],
            data_variant_ids: [],

            data_variant: {},
            active_variant: '',

            dataMediaIds: [],
            data_media_raws: [],
            data_atbvl_ids: [],

            dataAttributes: [],
            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        let dataPermissionsAfterCheck = await handleCheckPermission(data_products, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_variant_ids !== this.props.data_variant_ids) {
            let data_variant_ids = this.props.data_variant_ids;
            let data_product = this.props.data_product;
            let dataAttributes;
            if (data_product?.variant_attribute_group?.attribute) {
                dataAttributes = data_product.variant_attribute_group.attribute;
            }
            if (data_variant_ids && data_variant_ids.length !== 0) {
                this.setState({ data_variant_ids: data_variant_ids, dataAttributes: dataAttributes });
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
        let is_edit = this.props.is_edit;
        if (is_edit) {
            message.error('Bạn vui lòng lưu lại thay đôi');
            return;
        } else {
            let data_variants = this.state.data_variants;
            this.setState({ active_variant: index })
            await this.props.get_variant(data_variants[index].id);
        }

    }
    get_data_media = (dataMediaIds, data_media_raws) => {
        this.setState({ dataMediaIds: dataMediaIds, data_media_raws: data_media_raws })
    }
    handle_create_media = async () => {
        try {
            let data_media_ids_new = [];
            let dataMediaIds = this.state.dataMediaIds;
            let data_atbvl_raws = this.state.data_media_raws;
            for (const item of data_atbvl_raws) {
                if (!item.id) {
                    let data = await create_media(item);
                    if (data && data.data && data.data.success === 1) {
                        data_media_ids_new.push(data.data.data.id);
                    }
                }
            }
            return [...data_media_ids_new, ...dataMediaIds];
        } catch (error) {
            showNotification(error);
            return [];

        }
    }
    get_data_atbvl = (data_atbvl_ids) => {
        this.setState({ data_atbvl_ids: data_atbvl_ids })
    }
    handle_edit_variant = async () => {
        let data_variant = this.props.data_variant;
        if (data_variant?.id) {
            let data_atbvl_ids = this.state.data_atbvl_ids;
            let dataAttributes = this.state.dataAttributes;
            if (this.props.is_edit) {
                if (data_variant.attribute_values?.[0]?.id) { delete data_variant.attribute_values; }
                if (data_atbvl_ids.length === 0) { delete data_variant.attribute_values; }
                else {
                    if (data_atbvl_ids.length !== dataAttributes.length) {
                        message.error('Thông số chưa đủ, vui chọn đầy đủ');
                        return;
                    } else {
                        data_variant.attribute_values = this.state.data_atbvl_ids;
                    }
                }
                let media = await this.handle_create_media();
                if (media && media.length === 0) {
                    if (data_variant?.media?.[0]?.id) { delete data_variant.media; }
                }
                else { data_variant.media = media; }

                await this.props.edit_variant(data_variant.id, data_variant);

                if (this.props.is_result_variant) {
                    await this.props.get_variant(data_variant.id);
                    this.props.click_edit_variant();
                }
            } else {
                this.props.click_edit_variant();
            }
        }

    }
    render() {
        let data_product = this.props.data_product;
        let data_variant = this.props.data_variant;
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        return (
            <Spin size='large' spinning={this.props.isLoading}>
                <div className=" space-y-[10px]">
                    <div className='flex items-center justify-end'>
                        <Space>
                            {this.props.is_edit &&
                                <Button onClick={() => this.props.click_edit_variant()}
                                    className='bg-[#e94138] text-white'>
                                    Hủy
                                </Button>
                            }
                            <Button disabled={!dataPermissionsAfterCheck['product.change_product']}
                                onClick={() => this.handle_edit_variant()} className='bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
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
                                    <VariantIntroduce />
                                </div>
                                <div>
                                    <VariantMedia data_media_raws={this.props.data_variant.media}
                                        get_data_media={this.get_data_media} />
                                </div>
                            </div>
                            <VariantAttributeValue
                                dataAttributes={data_product?.variant_attribute_group?.attribute}
                                data_atbvl_raws={data_variant?.attribute_values}
                                get_data_atbvl={this.get_data_atbvl} />
                        </div>
                    </div>
                </div>
            </Spin>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.variant.isLoading,
        data_product: state.product.data_product,
        data_variant: state.variant.data_variant,
        is_result_variant: state.variant.isResult,

        is_edit: state.variant.is_edit,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_variant: (id) => dispatch(actions.get_variant_redux(id)),
        click_edit_variant: (value) => dispatch(actions.click_edit_variant_redux(value)),
        edit_variant: (id, data) => dispatch(actions.edit_variant_redux(id, data)),
        set_data_variant: (data) => dispatch(actions.set_data_variant_redux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
