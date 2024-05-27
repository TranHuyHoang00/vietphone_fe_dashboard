import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Space, message, Spin } from 'antd';
import VariantOverview from './elements/variant_overview';
import VariantIntroduce from './elements/variant_introduce';
import VariantMedia from './elements/variant_media';
import VariantAttributeValue from './elements/variant_attribute_value';
import { createMedia } from '@services/media_service';
import { showNotification } from '@utils/handleFuncNotification';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataProducts } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVariants: [],
            data_variant_ids: [],

            dataVariant: {},
            active_variant: '',

            dataMediaIds: [],
            data_media_raws: [],
            data_atbvl_ids: [],

            dataAttributes: [],
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        let dataCheckPermis = await handleCheckPermis(dataProducts, this.props.dataUserPermis, this.props.isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_variant_ids !== this.props.data_variant_ids) {
            let data_variant_ids = this.props.data_variant_ids;
            let dataProduct = this.props.dataProduct;
            let dataAttributes;
            if (dataProduct?.variant_attribute_group?.attribute) {
                dataAttributes = dataProduct.variant_attribute_group.attribute;
            }
            if (data_variant_ids && data_variant_ids.length !== 0) {
                this.setState({ data_variant_ids: data_variant_ids, dataAttributes: dataAttributes });
                await this.getListVariant(data_variant_ids);
            }
        }
    }
    getListVariant = async (data_variant_ids) => {
        let dataVariants = [];
        for (const id of data_variant_ids) {
            await this.props.getDataVariant(id);
            let dataVariant = this.props.dataVariant;
            dataVariants.push(dataVariant);
        }
        this.setState({ dataVariants: dataVariants, active_variant: (dataVariants.length) - 1 });
    }
    select_variant = async (index) => {
        let isEdit = this.props.isEdit;
        if (isEdit) {
            message.error('Bạn vui lòng lưu lại thay đôi');
            return;
        } else {
            let dataVariants = this.state.dataVariants;
            this.setState({ active_variant: index })
            await this.props.getDataVariant(dataVariants[index].id);
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
                    let data = await createMedia(item);
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
        let dataVariant = this.props.dataVariant;
        if (dataVariant?.id) {
            let data_atbvl_ids = this.state.data_atbvl_ids;
            let dataAttributes = this.state.dataAttributes;
            if (this.props.isEdit) {
                if (dataVariant.attribute_values?.[0]?.id) { delete dataVariant.attribute_values; }
                if (data_atbvl_ids.length === 0) { delete dataVariant.attribute_values; }
                else {
                    if (data_atbvl_ids.length !== dataAttributes.length) {
                        message.error('Thông số chưa đủ, vui chọn đầy đủ');
                        return;
                    } else {
                        dataVariant.attribute_values = this.state.data_atbvl_ids;
                    }
                }
                let media = await this.handle_create_media();
                if (media && media.length === 0) {
                    if (dataVariant?.media?.[0]?.id) { delete dataVariant.media; }
                }
                else { dataVariant.media = media; }

                await this.props.editVariant(dataVariant.id, dataVariant);

                if (this.props.is_result_variant) {
                    await this.props.getDataVariant(dataVariant.id);
                    this.props.click_edit_variant();
                }
            } else {
                this.props.click_edit_variant();
            }
        }

    }
    render() {
        let dataProduct = this.props.dataProduct;
        let dataVariant = this.props.dataVariant;
        let dataCheckPermis = this.state.dataCheckPermis;
        return (
            <Spin size='large' spinning={this.props.isLoading}>
                <div className=" space-y-[10px]">
                    <div className='flex items-center justify-end'>
                        <Space>
                            {this.props.isEdit &&
                                <Button onClick={() => this.props.click_edit_variant()}
                                    className='bg-[#e94138] text-white'>
                                    Hủy
                                </Button>
                            }
                            <Button disabled={!dataCheckPermis['product.change_product']}
                                onClick={() => this.handle_edit_variant()} className='bg-[#0e97ff] dark:bg-white text-white dark:text-black'>
                                {this.props.isEdit === false ? 'Chỉnh sửa' : 'Lưu'}
                            </Button>
                        </Space>
                    </div>
                    <div className='lg:grid grid-cols-3 gap-[10px] space-y-[10px] lg:space-y-0 '>
                        <div>
                            <VariantOverview dataVariants={this.state.dataVariants}
                                select_variant={this.select_variant}
                                active_variant={this.state.active_variant} />
                        </div>
                        <div className='col-span-2 space-y-[10px]'>
                            <div className='md:grid grid-cols-3 gap-[10px] space-y-[10px] md:space-y-0'>
                                <div className='col-span-2 '>
                                    <VariantIntroduce />
                                </div>
                                <div>
                                    <VariantMedia data_media_raws={this.props.dataVariant.media}
                                        get_data_media={this.get_data_media} />
                                </div>
                            </div>
                            <VariantAttributeValue
                                dataAttributes={dataProduct?.variant_attribute_group?.attribute}
                                data_atbvl_raws={dataVariant?.attribute_values}
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
        dataProduct: state.product.dataProduct,
        dataVariant: state.variant.dataVariant,
        is_result_variant: state.variant.isResult,

        isEdit: state.variant.isEdit,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataVariant: (id) => dispatch(actions.getDataVariantRedux(id)),
        click_edit_variant: (value) => dispatch(actions.clickEditVariantRedux(value)),
        editVariant: (id, data) => dispatch(actions.editVariantRedux(id, data)),
        set_data_variant: (data) => dispatch(actions.setDataVariantRedux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
