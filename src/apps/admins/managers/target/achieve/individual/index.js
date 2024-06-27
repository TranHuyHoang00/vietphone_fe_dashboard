import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Space, Divider, Button, Spin } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import DrawerFilter from './drawers/drawerFilter';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataTargets } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';

import RadialBarBasic from '../../component/radialBar/basic';
import BarGroup from '../../component/bar/group';
import BarCategory from '../../component/bar/category';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonType: 1,
            listItemSelected: [],
            modalCreate: false,
            modalEdit: false,
            drawerFilter: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        // const { dataFilter } = this.state;
        // const { getListTarget, dataUserPermis, isSuperUser } = this.props;
        // await getListTarget(dataFilter);
        const { dataUserPermis, isSuperUser } = this.props;
        const dataCheckPermis = await handleCheckPermis(dataTargets, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openDrawer = async (drawerName, drawerValue) => {
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                break;
            default:
                return;
        }
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListTarget } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListTarget(newDataFilter);
    }
    render() {
        const { dataCheckPermis, dataFilter, drawerFilter } = this.state;
        const { isLoading } = this.props;


        const dataKpis = [
            { name: 'Thực đạt', data: [110, 40, 23] },
            { name: 'KPI cửa hàng', data: [123, 132, 140] },
            { name: 'KPI cá nhân', data: [102, 192, 180] }
        ];
        const labelKpis = ['Điện thoại', 'Loa', 'Phụ kiện'];

        const dataMoneys = [
            { name: 'Target', data: [40, 200, 300] }
        ];
        const labelMoneys = ['Thực đạt', 'Cửa hàng', 'Cá nhân'];

        const dataDateKpis = [
            { name: 'Điện thoại', data: [2, 4, 2, 6, 7, 8, 9, 1, 3, 7] },
            { name: 'Loa', data: [3, 4, 0, 5, 6, 3, 4, 7, 8, 1] },
            { name: 'Phụ kiện', data: [2, 9, 8, 1, 4, 6, 7, 8, 9, 3] }
        ];
        const labelDateKpis = ['1/6', '2/6', '3/6', '4/6', '5/6', '7/6', '8/6', '9/6', '10/6'];

        const dataDateMoneys = [
            {
                name: 'Doanh thu',
                data: [2, 4, 2, 6, 7, 8, 9, 1, 3, 7]
            },
        ];
        const labelDateMoneys = ['1/6', '2/6', '3/6', '4/6', '5/6', '7/6', '8/6', '9/6', '10/6'];
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <Button disabled={!dataCheckPermis['target.view_target']}
                            onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                            <Space className='text-white dark:text-black'>
                                <AiFillFilter />
                                Lọc
                            </Space>
                        </Button>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <Divider>BIỂU ĐỒ TỔNG QUAN THÁNG</Divider>
                            <div className='md:grid grid-cols-2 gap-[20px]'>
                                <BarGroup dataSeries={dataKpis} dataCategories={labelKpis}
                                    height={400} title={"Biểu đồ cột KPI ( sản phẩm )"} />
                                <div>
                                    <BarCategory dataSeries={dataMoneys} dataCategories={labelMoneys}
                                        height={180} title={"Biểu đồ cột Target ( triệu vnđ )"} />
                                    <div>
                                        <strong>Biểu đồ tròn Target ( % )</strong>
                                        <div className='grid grid-cols-2'>
                                            <RadialBarBasic height={200}
                                                dataSeries={[60]} dataLabels={['Cửa hàng']} />
                                            <RadialBarBasic height={200}
                                                dataSeries={[40]} dataLabels={['Cá nhân']} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <Divider>BIỂU ĐỒ CHI TIẾT THÁNG</Divider>
                            <div className='md:grid grid-cols-2 gap-[20px]'>
                                <BarGroup dataSeries={dataDateKpis} dataCategories={labelDateKpis}
                                    height={800} title={"Biểu đồ cột sản phẩm ( cái )"} />
                                <BarGroup dataSeries={dataDateMoneys} dataCategories={labelDateMoneys}
                                    height={500} title={"Biểu đồ cột doanh thu ( triệu vnđ )"} />
                            </div>
                        </div>
                    </div>
                </Spin>
                {drawerFilter && dataCheckPermis['target.view_target'] &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        onChangePage={this.onChangePage} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargets: state.target.dataTargets,
        dataTarget: state.target.dataTarget,
        dataMeta: state.target.dataMeta,
        isLoading: state.target.isLoading,
        isResult: state.target.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTarget: (dataFilter) => dispatch(actions.getListTargetRedux(dataFilter)),
        getDataTarget: (id) => dispatch(actions.getDataTargetRedux(id)),
        editListTarget: (id, data) => dispatch(actions.editListTargetRedux(id, data)),
        deleteListTarget: (id) => dispatch(actions.deleteListTargetRedux(id)),
        setDataTarget: (id) => dispatch(actions.setDataTargetRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));