import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Typography, Divider } from 'antd';
import { columnRevenueOverViews, columnRevenueDetails } from './columns';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { Text } = Typography;
        const { dataReportTargetShops, dataFilter, typeActive, dataProductCategorys } = this.props;
        return (
            <div className='space-y-[10px]'>
                {dataReportTargetShops && dataReportTargetShops.map((item) => {
                    return (
                        <div className='space-y-[5px] bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
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
                                columns={columnRevenueDetails(typeActive, dataFilter, dataProductCategorys)} dataSource={[item]}
                                pagination={false}
                                size="small" bordered scroll={{ x: 650 }} />
                        </div>
                    )
                })}
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
