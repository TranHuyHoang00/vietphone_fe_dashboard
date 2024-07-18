import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import BarGroup from '../../../component/bar/group';
import dayjs from 'dayjs';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataChartTargetMonthShop: {},
            dataChartTargetDateShop: {},
            dataFilter: {},
        }
    }
    async componentDidMount() {
        const { dataReportTargetShops } = this.props;
        await this.handleDataForChart(dataReportTargetShops, this.props.dataFilter);
    }
    async componentDidUpdate(prevProps) {
        const { dataReportTargetShops, dataFilter } = this.props;
        if (prevProps.dataReportTargetShops !== dataReportTargetShops || prevProps.dataFilter !== dataFilter) {
            await this.handleDataForChart(dataReportTargetShops, this.props.dataFilter);
        }
    }
    getTargetDate = (end, targetMonth, targetAchieved) => {
        const targetRemaining = targetMonth - targetAchieved;
        const remainingDays = dayjs(end).daysInMonth() - dayjs(end).date();
        if (remainingDays === 0) {
            return targetRemaining / 1;
        } else {
            return targetRemaining / remainingDays;
        }
    }
    handleDataForChart = async (dataInput, dataFilter) => {
        const dataTargetMonths = dataInput.map(item => item?.shop_monthly_target?.value / 1000000);
        const dataTargetAchievedMonths = dataInput.map(item => item?.revenue?.total_revenue / 1000000);
        const dataTargetRemainingMonths = dataInput.map(item => {
            const remaining = item?.shop_monthly_target?.value - item?.revenue?.total_revenue;
            return remaining <= 0 ? 0 : remaining / 1000000;
        });

        const dataNameShops = dataInput.map(item => (item?.shop?.name));
        const dataChartTargetMonthShop = {
            datas: [
                { name: 'Thực đạt', data: dataTargetAchievedMonths },
                { name: 'Còn lại', data: dataTargetRemainingMonths },
                { name: 'Target tháng', data: dataTargetMonths },
            ],
            labels: dataNameShops,
            height: 120 * (dataInput.length < 5 ? dataInput.length + 1 : dataInput.length),
        }

        const dataTargetDates = dataInput.map(item => {
            const targetDate = this.getTargetDate(dataFilter?.end, item?.shop_monthly_target?.value, item?.revenue?.total_revenue) / 1000000;
            if (targetDate <= 0) {
                return 0;
            } else {
                return targetDate;
            }
        });
        const dataTargetAchievedDates = dataInput.map(item => item?.daily?.total_revenue / 1000000);

        const dataTargetRemainingDates = dataInput.map(item => {
            const remaining = this.getTargetDate(dataFilter?.end, item?.shop_monthly_target?.value, item?.revenue?.total_revenue) - item?.daily?.total_revenue;
            return remaining <= 0 ? 0 : remaining / 1000000;
        });
        const dataChartTargetDateShop = {
            datas: [
                { name: 'Thực đạt', data: dataTargetAchievedDates },
                { name: 'Còn lại', data: dataTargetRemainingDates },
                { name: 'Target ngày', data: dataTargetDates },
            ],
            labels: dataNameShops,
            height: 120 * (dataInput.length < 5 ? dataInput.length + 1 : dataInput.length),
        }
        this.setState({
            dataChartTargetMonthShop: dataChartTargetMonthShop,
            dataChartTargetDateShop: dataChartTargetDateShop,
        })
    }
    render() {
        const { dataChartTargetMonthShop, dataChartTargetDateShop } = this.state;
        return (
            <Spin spinning={false}>
                <div className='space-y-[5px] bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                    <div className='md:grid grid-cols-2 gap-[20px]'>
                        {dataChartTargetMonthShop && dataChartTargetMonthShop?.labels && dataChartTargetMonthShop?.datas &&
                            <BarGroup dataSeries={dataChartTargetMonthShop?.datas} dataCategories={dataChartTargetMonthShop?.labels}
                                height={dataChartTargetMonthShop?.height} unit={'money'}
                                title={"Target tháng (triệu vnđ)"} colors={['#4fc821', '#f60000', '#0e92f7']} />
                        }
                        {dataChartTargetDateShop && dataChartTargetDateShop?.labels && dataChartTargetDateShop?.datas &&
                            <BarGroup dataSeries={dataChartTargetDateShop?.datas} dataCategories={dataChartTargetDateShop?.labels}
                                height={dataChartTargetDateShop?.height} unit={'money'}
                                title={"Target ngày (triệu vnđ)"} colors={['#4fc821', '#f60000', '#0e92f7']} />
                        }
                    </div>
                </div>
            </Spin >

        );
    }

}
const mapStateToProps = state => {
    return {
        dataReportTargetShops: state.reportTarget.dataReportTargetShops,
        dataFilter: state.reportTarget.dataFilterShop,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
