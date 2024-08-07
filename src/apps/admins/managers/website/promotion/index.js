import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Image
} from 'antd';
import { AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataPromotions } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage, compareObjects } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonType: 1,
            listItemSelected: [],
            modalDetail: false,
            modalCreate: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
            dataCheckPermis: {},

        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListPromotion, dataUserPermis, isSuperUser } = this.props;
        await getListPromotion(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataPromotions, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataPromotion, getDataPromotion } = this.props;
        const actions = {
            setData: setDataPromotion,
            getData: getDataPromotion,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListPromotion, editListPromotion, getListPromotion } = this.props;
        const actions = {
            deleteList: deleteListPromotion,
            editList: editListPromotion,
            getList: getListPromotion
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListPromotion } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        const result = await compareObjects(newDataFilter, dataFilter);
        if (!result) {
            await getListPromotion(newDataFilter);
            this.setState({ dataFilter: newDataFilter });
        }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'TÊN', dataIndex: 'name',
                render: (name, item) =>
                    <span className='hover:underline' onClick={() => this.props.history.push(`/admin/manager/website/promotion/edit/${item?.id}`)}>
                        <Typography.Text className='text-[#0574b8] dark:text-white cursor-pointer'>{name}</Typography.Text>
                    </span>,
                sorter: (a, b) => a.name.localeCompare(b.name),

            },
            {
                title: 'TRẢ GÓP', dataIndex: 'instalment',
                render: (instalment) => <Typography.Text className='text-[#0574b8] dark:text-white'>{instalment}</Typography.Text>,
                sorter: (a, b) => a.instalment.localeCompare(b.instalment),
            },
            {
                title: 'Mô tả', dataIndex: 'description', responsive: ['lg'],
                sorter: (a, b) => a.description.localeCompare(b.description),

            },
            {
                title: 'ẢNH', dataIndex: 'image', responsive: ['lg'], width: 210,
                render: (image) => <>{image && <Image src={image} height={40} width={200} className='object-cover' />}</>
            },
        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate } = this.state;
        const { isLoading, dataPromotions, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['product.delete_promotioninfo'] },
        ];
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button disabled={!dataCheckPermis['product.add_promotioninfo']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['product.delete_promotioninfo']}
                                            menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>QUÀ TẶNG</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataPromotions} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataCheckPermis['product.add_promotioninfo'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataPromotions: state.promotion.dataPromotions,
        dataPromotion: state.promotion.dataPromotion,
        dataMeta: state.promotion.dataMeta,
        isLoading: state.promotion.isLoading,
        isResult: state.promotion.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListPromotion: (dataFilter) => dispatch(actions.getListPromotionRedux(dataFilter)),
        getDataPromotion: (id) => dispatch(actions.getDataPromotionRedux(id)),
        editListPromotion: (id, data) => dispatch(actions.editListPromotionRedux(id, data)),
        deleteListPromotion: (id) => dispatch(actions.deleteListPromotionRedux(id)),
        setDataPromotion: (id) => dispatch(actions.setDataPromotionRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));