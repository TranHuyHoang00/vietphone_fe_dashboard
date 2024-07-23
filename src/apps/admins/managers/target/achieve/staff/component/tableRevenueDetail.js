import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '@actions';
import { connect } from 'react-redux';
import { Table, Typography, Divider, Spin, Button, Space } from 'antd';
import { columnRevenueOverViews, columnRevenueDetails, columnKPIDetails, columnSalaryOverviews } from './columns';
import { FaFileExport } from "react-icons/fa";
import { exportTableAntdToImage } from '@utils/handleFuncExport';
import dayjs from 'dayjs';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListProductCategory } = this.props;
        await getListProductCategory({ page: 1, limit: process.env.REACT_APP_API_LIMIT });
    }
    render() {
        const { Text } = Typography;
        const { dataReportTargetStaffs, dataFilter, typeActive, dataProductCategorys, isLoadingProductCategory } = this.props;
        return (
            <Spin spinning={isLoadingProductCategory}>
                <div className='space-y-[10px]'>
                    {dataReportTargetStaffs && dataReportTargetStaffs.map((item) => {
                        return (
                            <div className='space-y-[5px] bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                <div className='flex items-center justify-end'>
                                    <Button onClick={() => exportTableAntdToImage(item?.staff?.id, dayjs().format("HH-mm/DD-MM-YYYY"))}
                                        className='bg-[#0e97ff] dark:bg-white'>
                                        <Space className='text-white dark:text-black'>
                                            <FaFileExport />
                                            Tải ảnh
                                        </Space>
                                    </Button>
                                </div>
                                <div id={item?.staff?.id}>
                                    <Divider>
                                        <Text strong >NHÂN VIÊN
                                            : <Text className='text-[#0574b8] dark:text-white uppercase'>{item?.staff?.name}</Text>
                                        </Text>
                                    </Divider>
                                    <Table rowKey="id"
                                        columns={columnSalaryOverviews(typeActive, dataFilter, item)} dataSource={[item]}
                                        pagination={false}
                                        size="small" bordered scroll={{ x: 1000 }} />

                                    <Table rowKey="id"
                                        columns={columnRevenueOverViews(typeActive, dataFilter, this.props.history)} dataSource={[item]}
                                        pagination={false}
                                        size="small" bordered scroll={{ x: 1000 }} />

                                    {item?.staff?.shift === "pt" && (item?.staff?.role?.code === "officialStaffSales" || item?.staff?.role?.code === "probationStaffSales") &&
                                        <Table rowKey="id"
                                            columns={columnKPIDetails(typeActive, dataFilter, item)} dataSource={[item]}
                                            pagination={false}
                                            size="small" bordered scroll={{ x: 1000 }} />
                                    }
                                    <Table rowKey="id"
                                        columns={columnRevenueDetails(typeActive, dataFilter, dataProductCategorys, item)}
                                        dataSource={[item]}
                                        pagination={false}
                                        size="small" bordered scroll={{ x: 1000 }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Spin>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,

        dataFilter: state.reportTarget.dataFilterStaff,
        typeActive: state.reportTarget.typeActiveStaff,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
