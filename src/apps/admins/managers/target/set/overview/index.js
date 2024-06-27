import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Spin, Divider, Button, Space } from 'antd';
import ChartTargetMoney from './apexCharts/chartTargetMoney';
import DonutTargetPercent from './apexCharts/donutTargetPercent';
import ChartTargetProduct from './apexCharts/chartTargetProduct';
import { AiFillFilter } from "react-icons/ai";
import { dataTargets } from '@datas/dataPermissionsOrigin';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { handleOnChangePage } from '@utils/handleFuncPage';
import DrawerFilter from '../table/drawers/drawerFilter';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerFilter: false,
            dataCheckPermis: {},
            dataFilter: {
                source: 'store',
            }
        }
    }
    async componentDidMount() {
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
        // const { getListTarget } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        // await getListTarget(newDataFilter);
    }
    render() {
        const { isLoading } = this.props;
        const { dataCheckPermis, drawerFilter, dataFilter } = this.state;
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className=' space-y-[10px]'>
                            <div className='grid grid-cols-4'>
                                <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                    <p>Cửa hàng : 750.000.000 vnđ</p>
                                    <p>Cá nhân : 750.000.000 vnđ</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md space-y-[10px]'>
                            <Button disabled={!dataCheckPermis['target.view_target']}
                                onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiFillFilter />
                                    Lọc
                                </Space>
                            </Button>
                            <Divider>TỔNG QUAN TARGET - KPI</Divider>
                            <div className='md:grid grid-cols-2 gap-[10px]'>
                                <div className='space-y-[10px] font-[500] text-black dark:text-white'>
                                    <ChartTargetMoney />
                                    <DonutTargetPercent />
                                </div>
                                <ChartTargetProduct />
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
        isLoading: state.target.isLoading,
        isResult: state.target.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTarget: (dataFilter) => dispatch(actions.getListTargetRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));