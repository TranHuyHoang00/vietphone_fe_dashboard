import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Spin, Button, Space, message } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import DrawerFilter from './drawers/drawerFilter';
import TableWorkScheduleOverView from './componet/tableWorkScheduleOverView';
import dayjs from 'dayjs';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataWorkSchedules: [
                {
                    id: 1,
                    staff: {
                        id: 285,
                        name: 'LÂM THỊ KIỀU NHƯ Ý',
                        shop: { id: 1, name: 'VIETPHONE 25' },
                    },
                    workSchedules: [

                        {
                            id: 2,
                            date: '2024-07-02',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        },
                        {
                            id: 3,
                            date: '2024-07-03',
                            shift: { id: 3, title: 'CA FULL' }
                        },
                        {
                            id: 4,
                            date: '2024-07-04',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        },
                        {
                            id: 5,
                            date: '2024-07-05',
                            shift: { id: 3, title: 'CA FULL' }
                        },
                        {
                            id: 6,
                            date: '2024-07-06',
                            shift: { id: 4, title: 'OFF' }
                        },
                        {
                            id: 7,
                            date: '2024-07-07',
                            shift: { id: 3, title: 'CA FULL' }
                        }
                    ]
                },
                {
                    id: 2,
                    staff: {
                        id: 284,
                        name: 'NGUYỄN TRỌNG NHẬT HÀO',
                        shop: { id: 1, name: 'VIETPHONE 28' },
                    },
                    workSchedules: [
                        {
                            id: 1,
                            date: '2024-07-01',
                            shift: { id: 4, title: 'OFF' }
                        },
                        {
                            id: 2,
                            date: '2024-07-02',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        },
                        {
                            id: 3,
                            date: '2024-07-03',
                            shift: { id: 1, title: 'CA SÁNG' }
                        },
                        {
                            id: 4,
                            date: '2024-07-04',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        },
                        {
                            id: 5,
                            date: '2024-07-05',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        },
                        {
                            id: 6,
                            date: '2024-07-06',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        },
                        {
                            id: 7,
                            date: '2024-07-07',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        }
                    ]
                },
                {
                    id: 3,
                    staff: {
                        id: 283,
                        name: 'THÁI CÔNG DŨNG',
                        shop: { id: 1, name: 'VIET PHONE 29' },
                    },
                    workSchedules: [
                        {
                            id: 1,
                            date: '2024-07-01',
                            shift: { id: 2, title: 'CA CHIỀU' }
                        },
                        {
                            id: 3,
                            date: '2024-07-03',
                            shift: { id: 1, title: 'CA SÁNG' }
                        },
                        {
                            id: 4,
                            date: '2024-07-04',
                            shift: { id: 3, title: 'CA FULL' }
                        },
                        {
                            id: 5,
                            date: '2024-07-05',
                            shift: { id: 3, title: 'CA FULL' }
                        },
                        {
                            id: 6,
                            date: '2024-07-06',
                            shift: { id: 4, title: 'OFF' }
                        },
                        {
                            id: 7,
                            date: '2024-07-07',
                            shift: { id: 4, title: 'OFF' }
                        }
                    ]
                },
            ],
            dataFilterStaff: {
                page: 1,
                limit: process.env.REACT_APP_API_LIMIT,
                status: 'active',
            },
            optionSelects: [
                { value: 1, label: 'SÁNG' },
                { value: 2, label: 'CHIỀU' },
                { value: 3, label: 'FULL' },
                { value: 4, label: 'OFF' },
                { value: 5, label: '8-18H' },
            ],

            drawerFilter: false,
            dataFilter: {
                start: dayjs().startOf('week').format('YYYY-MM-DD'),
                end: dayjs().endOf('week').format('YYYY-MM-DD'),
            },
            typeActive: {
                typeView: 'all',
                listId: [],
                listShopId: [],
            },
            disabledAcceptFilter: false,
            newDataStaffs: [],
        }
    }
    async componentDidMount() {
        const { dataFilterStaff } = this.state;
        const { getListStaff } = this.props;
        await getListStaff(dataFilterStaff);
        await this.handleSortDataStaffs(this.props.dataStaffs);
    }
    openDrawer = async (drawerName, drawerValue) => {
        const { getListShop } = this.props;
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                if (drawerValue) { await getListShop({ page: 1, limit: process.env.REACT_APP_API_LIMIT }); }
                break;
            default:
                return;
        }
    }
    handleSortDataStaffs = async (dataStaffs) => {
        const newDataStaffs = [...dataStaffs];
        newDataStaffs.sort((a, b) => {
            if (a.shop === null && b.shop !== null) {
                return 1;
            } else if (a.shop !== null && b.shop === null) {
                return -1;
            } else if (a.shop === null && b.shop === null) {
                return 0;
            } else {
                const shopComparison = a.shop.id - b.shop.id;
                if (shopComparison !== 0) {
                    return shopComparison;
                } else {
                    const roleA = a?.role?.code === process.env.REACT_APP_ROLE_CHT_CT || a?.role?.code === process.env.REACT_APP_ROLE_CHT_TV ? 0 : 1;
                    const roleB = b?.role?.code === process.env.REACT_APP_ROLE_CHT_CT || b?.role?.code === process.env.REACT_APP_ROLE_CHT_TV ? 0 : 1;
                    return roleA - roleB;
                }
            }
        });
        this.setState({ newDataStaffs: newDataStaffs })
    }
    validationData = (typeActive) => {
        if (typeActive?.typeView === "individual" && typeActive?.listId.length === 0) {
            return { mess: "Vui lòng chọn nhân viên", check: false };
        }
        if (typeActive?.typeView === "shop" && typeActive?.listId.length === 0) {
            return { mess: "Vui lòng chọn cửa hàng", check: false };
        }
        return { check: true };
    }
    handleEqualObj = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    handleEqualArrays = (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
            return false;
        }
        const sortedArr1 = arr1.slice().sort();
        const sortedArr2 = arr2.slice().sort();
        for (let i = 0; i < sortedArr1.length; i++) {
            if (sortedArr1[i] !== sortedArr2[i]) {
                return false;
            }
        }
        return true;
    }
    handleGetDataReport = async (dataFilter, typeActive) => {
        //const { getAllReportTargetStaff, getListReportTargetStaff } = this.props;
        if (typeActive?.typeView === "all") {
            // await getAllReportTargetStaff(dataFilter);
        }
        if (typeActive?.typeView === "individual" || typeActive?.typeView === "shop") {
            //await getListReportTargetStaff(dataFilter, typeActive?.listId);
            const { dataStaffs } = this.props;
            const newDataStaffs = dataStaffs.filter(item => (typeActive?.listId).includes(item.id));
            this.handleSortDataStaffs(newDataStaffs);
        }
        this.openDrawer('filter', false);
        this.setState({ disabledAcceptFilter: false });
    }
    handleFilter = async (dataFilterNew, typeActiveNew) => {
        const { typeActive, dataFilter } = this.state;
        const result = this.validationData(typeActiveNew);
        if (!result.check) {
            return message.error(result.mess);
        }
        this.setState({ disabledAcceptFilter: true });

        const equalFilter = this.handleEqualObj(dataFilterNew, dataFilter);
        const equalTypeView = typeActiveNew.typeView === typeActive.typeView;
        const equalListId = this.handleEqualArrays(typeActiveNew.listId, typeActive.listId);

        if (!equalFilter || !equalTypeView || !equalListId) {
            await this.handleGetDataReport(dataFilterNew, typeActiveNew);
        } else {
            this.openDrawer('filter', false);
        }
        this.setState({
            dataFilter: dataFilterNew,
            typeActive: typeActiveNew,
            disabledAcceptFilter: false
        })
    }
    render() {
        const { dataWorkSchedules, dataFilter, optionSelects, drawerFilter, typeActive, disabledAcceptFilter,
            newDataStaffs
        } = this.state;
        const { isLoadingStaff, dataStaffs, dataShops } = this.props;

        return (
            <>
                <Spin size='large' spinning={isLoadingStaff}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between space-x-[5px]'>
                            <Space>
                                <Button
                                    onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiFillFilter />
                                        Lọc
                                    </Space>
                                </Button>
                            </Space>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-sm'>
                            <TableWorkScheduleOverView dataWorkSchedules={dataWorkSchedules}
                                dataFilter={dataFilter} optionSelects={optionSelects} dataStaffs={newDataStaffs} />
                        </div>
                    </div>
                </Spin>
                {drawerFilter && < DrawerFilter drawerFilter={drawerFilter}
                    typeActive={typeActive} dataFilter={dataFilter}
                    openDrawer={this.openDrawer}
                    dataStaffs={dataStaffs} dataShops={dataShops}
                    handleFilter={this.handleFilter}
                    disabledAcceptFilter={disabledAcceptFilter}
                />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataStaffs: state.staff.dataStaffs,
        isLoadingStaff: state.staff.isLoading,

        dataShops: state.shop.dataShops,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),

        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
