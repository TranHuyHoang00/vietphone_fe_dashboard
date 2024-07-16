import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '@actions';
import { connect } from 'react-redux';
import { Table, Typography, Divider, Spin, Button, Space } from 'antd';
import { columnRevenueOverViews, columnRevenueDetails } from './columns';
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
        const { getListProductCategory, dataProductCategorys } = this.props;
        if (dataProductCategorys && dataProductCategorys.length === 0) {
            await getListProductCategory({ page: 1, limit: 50 });
        }
    }
    render() {
        const { Text } = Typography;
        const { dataReportTargetShops, dataFilter, typeActive, dataProductCategorys, isLoadingProductCategory } = this.props;
        return (
            <Spin spinning={isLoadingProductCategory}>
                <div className='space-y-[10px]'>
                    {dataReportTargetShops && dataReportTargetShops.map((item, index) => {
                        return (
                            <div key={index} className='space-y-[5px] bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                                <div className='flex items-center justify-end'>
                                    <Button onClick={() => exportTableAntdToImage(item?.shop?.id, dayjs().format("HH-mm/DD-MM-YYYY"))}
                                        className='bg-[#0e97ff] dark:bg-white'>
                                        <Space className='text-white dark:text-black'>
                                            <FaFileExport />
                                            Tải ảnh
                                        </Space>
                                    </Button>
                                </div>
                                <div id={item?.shop?.id}>
                                    <Divider>
                                        <Text strong >CỬA HÀNG
                                            : <Text className='text-[#0574b8] dark:text-white uppercase'>{item?.shop?.name}</Text>
                                        </Text>
                                    </Divider>
                                    <Table rowKey="id"
                                        columns={columnRevenueOverViews(typeActive, dataFilter, this.props.history)} dataSource={[item]}
                                        pagination={false}
                                        size="small" bordered scroll={{ x: 1000 }} />
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
            </Spin >

        );
    }

}
const mapStateToProps = state => {
    return {
        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,

        dataFilter: state.reportTarget.dataFilterShop,
        typeActive: state.reportTarget.typeActiveShop,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
