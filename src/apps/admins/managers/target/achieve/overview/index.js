import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Spin, Table, Typography, Button, Space, message, Dropdown } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { FaFileExport } from "react-icons/fa";
import dayjs from 'dayjs';
import BarGroup from '../../component/bar/group';
import DrawerFilter from './drawers/drawerFilter';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataTargets } from '@datas/dataPermissionsOrigin';
import { formatNumber } from '@utils/handleFuncFormat';
import { exportTableAntdToExcel, exportTableAntdToImage } from '@utils/handleFuncExport'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerFilter: false,
      dataFilter: {
        start_time: dayjs().startOf('month').format("YYYY-MM-DD"),
        end_time: dayjs().format("YYYY-MM-DD"),
        type_object: 'shop',
        type_view: 'all',
        list_id: [],
        type_time: 'month',
      },
      dataTargets: [],
      dataCheckPermis: {},

      dataChartTargetMonthShop: {},
      dataChartTargetDateShop: {},
      dataChartDailyIncomeDateShop: {},

    }
  }
  async componentDidMount() {
    const { dataUserPermis, isSuperUser } = this.props;
    const dataCheckPermis = await handleCheckPermis(dataTargets, dataUserPermis, isSuperUser);
    this.setState({
      dataCheckPermis: dataCheckPermis,
    });

    this.loadData();
  }
  validationData = (data) => {
    if (data?.type_object === "shop" && data?.type_view === "individual") {
      return { mess: "Vui lòng chọn danh sách cửa hàng ", check: false };
    }
    if (data?.type_object === "staff" && data?.type_view === "together") {
      return { mess: "Vui lòng chọn danh sách cửa hàng ", check: false };
    }
    if (data?.type_object === "staff" && data?.type_view === "individual") {
      return { mess: "Vui lòng chọn danh sách nhân viên ", check: false };
    }
    if (!data.start_time) {
      return { mess: "Không được bỏ trống 'Ngày bắt đầu' ", check: false };
    }
    if (!data.end_time) {
      return { mess: "Không được bỏ trống 'Ngày kết thúc' ", check: false };
    }
    const startDate = dayjs(data.start_time, 'YYYY-MM-DD');
    const endDate = dayjs(data.end_time, 'YYYY-MM-DD');
    const isDifferentMonthYear = !startDate.isSame(endDate, 'month') || !startDate.isSame(endDate, 'year');
    if (isDifferentMonthYear) {
      return { mess: "Ngày bắt đầu và ngày kết thúc không cùng tháng hoặc năm", check: false };
    }
    if (startDate.isAfter(endDate)) {
      return { mess: "Ngày bắt đầu lớn hơn ngày kết thúc", check: false };
    }
    return { check: true };
  }
  handleFilter = async (dataFilter) => {
    const result = this.validationData(dataFilter);
    if (result.check) {
      this.setState({ dataFilter: dataFilter });
      this.openDrawer('filter', false);
    } else {
      message.error(result.mess);
    }
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
  loadData = () => {
    const dataTargetShops = [
      {
        id: 1, shop: { id: 1, name: 'vietphone 16' },
        target: { revenue: 650000000, phone: 20, speaker: 30, accessory: 50 },
        achieved: { revenue: 120000000, phone: 10, speaker: 12, accessory: 20 },
        daily: { revenue: 45000000, phone: 2, speaker: 1, accessory: 5 }
      },

      {
        id: 2, shop: { id: 2, name: 'vietphone 21' }, target: { revenue: 550000000, phone: 20, speaker: 30, accessory: 50 },
        achieved: { revenue: 32000000, phone: 10, speaker: 12, accessory: 20 },
        daily: { revenue: 200000, phone: 2, speaker: 1, accessory: 5 }
      },
      {
        id: 3, shop: { id: 3, name: 'vietphone 22' }, target: { revenue: 750000000, phone: 26, speaker: 34, accessory: 58 },
        achieved: { revenue: 120000000, phone: 10, speaker: 12, accessory: 20 },
        daily: { revenue: 6900100, phone: 3, speaker: 2, accessory: 7 }
      },
      {
        id: 4, shop: { id: 4, name: 'vietphone 25' }, target: { revenue: 950000000, phone: 20, speaker: 30, accessory: 50 },
        achieved: { revenue: 220000000, phone: 10, speaker: 12, accessory: 20 },
        daily: { revenue: 6300000, phone: 2, speaker: 1, accessory: 5 }
      },
      {
        id: 5, shop: { id: 5, name: 'vietphone 26' }, target: { revenue: 850000000, phone: 20, speaker: 30, accessory: 50 },
        achieved: { revenue: 142000000, phone: 10, speaker: 12, accessory: 20 },
        daily: { revenue: 3300000, phone: 2, speaker: 1, accessory: 5 }
      },
      {
        id: 6, shop: { id: 6, name: 'vietphone 27' }, target: { revenue: 550000000, phone: 20, speaker: 30, accessory: 50 },
        achieved: { revenue: 210000000, phone: 10, speaker: 12, accessory: 20 },
        daily: { revenue: 7100000, phone: 2, speaker: 1, accessory: 5 }
      },
      {
        id: 7, shop: { id: 7, name: 'vietphone 28' }, target: { revenue: 350000000, phone: 10, speaker: 30, accessory: 70 },
        achieved: { revenue: 32020000, phone: 10, speaker: 12, accessory: 20 },
        daily: { revenue: 1905000, phone: 2, speaker: 1, accessory: 5 }
      },
      {
        id: 8, shop: { id: 8, name: 'vietphone 29' }, target: { revenue: 750000000, phone: 22, speaker: 37, accessory: 58 },
        achieved: { revenue: 280000000, phone: 12, speaker: 2, accessory: 27 },
        daily: { revenue: 713000, phone: 2, speaker: 1, accessory: 2 }
      },
      {
        id: 9, shop: { id: 9, name: 'vietphone 30' }, target: { revenue: 350000000, phone: 10, speaker: 20, accessory: 40 },
        achieved: { revenue: 390000000, phone: 5, speaker: 11, accessory: 22 },
        daily: { revenue: 7300000, phone: 1, speaker: 4, accessory: 3 }
      },
      {
        id: 10, shop: { id: 10, name: 'vietphone 31' }, target: { revenue: 850000000, phone: 22, speaker: 31, accessory: 53 },
        achieved: { revenue: 490000000, phone: 11, speaker: 13, accessory: 28 },
        daily: { revenue: 2320000, phone: 2, speaker: 5, accessory: 2 }
      },
    ]
    this.setState({ dataTargets: dataTargetShops });
    this.handleDataForChart(dataTargetShops);
  }
  getTargetDate = (end_time, targetMonth, targetAchieved) => {
    const targetRemaining = targetMonth - targetAchieved;
    const remainingDays = dayjs(end_time).daysInMonth() - dayjs(end_time).date();
    if (remainingDays === 0) {
      return targetRemaining / 1;
    } else {
      return targetRemaining / remainingDays;
    }
  }
  handleDataForChart = (dataInput) => {
    const { dataFilter } = this.state;
    const dataTargetMonths = dataInput.map(item => item?.target?.revenue / 1000000);
    const dataTargetAchievedMonths = dataInput.map(item => item?.achieved?.revenue / 1000000);
    const dataNameShops = dataInput.map(item => (item?.shop?.name));
    const dataChartTargetMonthShop = {
      datas: [
        { name: 'Thực đạt', data: dataTargetAchievedMonths },
        { name: 'Target tháng', data: dataTargetMonths },
      ],
      labels: dataNameShops,
      height: 80 * (dataTargetMonths && dataTargetMonths.length),
    }

    const dataTargetDates = dataInput.map(item => {
      const targetDate = this.getTargetDate(dataFilter?.end_time, item?.target?.revenue, item?.achieved?.revenue) / 1000000;
      if (targetDate <= 0) {
        return 0;
      } else {
        return targetDate;
      }
    });
    const dataChartTargetDateShop = {
      datas: [{ name: 'Target ngày', data: dataTargetDates },],
      labels: dataNameShops,
      height: 40 * (dataTargetDates && dataTargetDates.length),
    }

    const dataDailyIncomes = dataInput.map(item => (item?.daily?.revenue / 1000000));
    const dataChartDailyIncomeDateShop = {
      datas: [{ name: 'Doanh thu ngày', data: dataDailyIncomes },],
      labels: dataNameShops,
      height: 40 * (dataDailyIncomes && dataDailyIncomes.length),
    }

    this.setState({
      dataChartTargetMonthShop: dataChartTargetMonthShop,
      dataChartTargetDateShop: dataChartTargetDateShop,
      dataChartDailyIncomeDateShop: dataChartDailyIncomeDateShop,
    })
  }
  render() {
    const { Text } = Typography;
    const { isLoading } = this.props;
    const { dataTargets, dataFilter, dataChartTargetMonthShop, drawerFilter, dataCheckPermis, dataChartTargetDateShop
      , dataChartDailyIncomeDateShop
    } = this.state;
    const overviewColumns = [
      {
        title: `${dataFilter?.type_time === 'month' ?
          `TỔNG DOANH THU CỬA HÀNG THÁNG ${dayjs(dataFilter?.start_time).format('MM-YYYY')}` :
          `TỔNG DOANH THU CỬA HÀNG TỪ ${dayjs(dataFilter?.start_time).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`}`,
        children: [
          {
            title: 'Cửa hàng', dataIndex: ['shop', 'name'],
            render: (value) => {
              return {
                children: <Text strong className='text-[#0574b8] dark:text-white uppercase'>{value}</Text>,
                __style__: { color: '0574b8' }, bold: true,
              };
            },
            sorter: (a, b) => a?.shop?.name.localeCompare(b?.shop?.name),
          },
          {
            title: 'Target tháng', dataIndex: ['target', 'revenue'],
            render: (value) => {
              return { children: <Text >{formatNumber(value)}</Text> }
            },
            sorter: (a, b) => a?.target?.revenue - b?.target?.revenue,
          },
          {
            title: `Ngày ${dayjs(dataFilter?.start_time).format('DD')} tới ${dayjs(dataFilter?.end_time).format('DD')}`,
            dataIndex: ['achieved', 'revenue'],
            render: (value) => {
              return { children: <Text >{formatNumber(value)}</Text> }
            },
            sorter: (a, b) => a?.achieved?.revenue - b?.achieved?.revenue,
          },
          {
            title: `Còn lại`, dataIndex: ['achieved', 'revenue'],
            render: (value, item) => {
              const remainingRevenue = item?.target?.revenue - item?.achieved?.revenue;
              if (remainingRevenue > 0) {
                return {
                  children: <Text strong className='text-red-500'>{`-${formatNumber(remainingRevenue)}`}</Text>,
                  __style__: { color: 'eb2315' },
                }
              } else {
                return {
                  children: <Text strong className='text-green-500'>{`+${formatNumber(Math.abs(remainingRevenue))}`}</Text>,
                  __style__: { color: '22c55e' },
                }
              }
            },
            sorter: (a, b) => (a?.target?.revenue - a?.achieved?.revenue) - (b?.target?.revenue - b?.achieved?.revenue),
          },
          {
            title: 'Trạng thái', dataIndex: ['target', 'revenue'],
            render: (value, item) => {
              const remainingRevenue = item?.target?.revenue - item?.achieved?.revenue;
              if (remainingRevenue > 0) {
                return {
                  children: <Text strong className='text-red-500'>{`CHƯA`}</Text>,
                  __style__: { color: 'eb2315' },
                }
              } else {
                return {
                  children: <Text strong className='text-green-500'>{`ĐẠT`}</Text>,
                  __style__: { color: '22c55e' },
                }
              }
            },
          },
        ],
      },
      {
        title: `DOANH THU NGÀY ${dayjs(dataFilter?.end_time).format('DD-MM-YYYY')}`, children: [
          {
            title: `Target ngày`, dataIndex: ['target', 'revenue'],
            render: (value, item) => {
              const remainingRevenue = item?.target?.revenue - item?.achieved?.revenue;
              if (remainingRevenue > 0) {
                return {
                  children: <Text>{`${formatNumber(this.getTargetDate(dataFilter?.end_time, item?.target?.revenue, item?.achieved?.revenue))}`}</Text>
                }
              } else {
                return { children: <Text>0</Text> }
              }
            },
            sorter: (a, b) => (this.getTargetDate(dataFilter?.end_time, a?.target?.revenue, a?.achieved?.revenue)) - (this.getTargetDate(dataFilter?.end_time, b?.target?.revenue, b?.achieved?.revenue)),
          },
          {
            title: `Thực đạt`, dataIndex: ['daily', 'revenue'],
            render: (value) => {
              return { children: <Text >{formatNumber(value)}</Text> }
            },
            sorter: (a, b) => a?.daily?.revenue - b?.daily?.revenue,
          },
          {
            title: `Còn lại`, dataIndex: ['daily', 'revenue'],
            render: (value, item) => {
              const remainingRevenue = item?.target?.revenue - item?.achieved?.revenue;
              if (remainingRevenue > 0) {
                const remainingDaily = (this.getTargetDate(dataFilter?.end_time, item?.target?.revenue, item?.achieved?.revenue) - item?.daily?.revenue);
                if (remainingDaily > 0) {
                  return {
                    children: <Text strong className='text-red-500'>{`-${formatNumber(remainingDaily)}`}</Text>,
                    __style__: { color: 'eb2315' },
                  }
                } else {
                  return {
                    children: <Text strong className='text-green-500'>{`+${formatNumber(Math.abs(remainingDaily))}`}</Text>,
                    __style__: { color: '22c55e' },
                  }
                }
              } else {
                return { children: <Text>0</Text> }
              }
            },
            sorter: (a, b) => (this.getTargetDate(dataFilter?.end_time, a?.target?.revenue, a?.achieved?.revenue) - a?.daily?.revenue) - (this.getTargetDate(dataFilter?.end_time, b?.target?.revenue, b?.achieved?.revenue) - b?.daily?.revenue),
          },
          {
            title: 'Trạng thái', dataIndex: ['target', 'revenue'],
            render: (value, item) => {
              const remainingRevenue = item?.target?.revenue - item?.achieved?.revenue;
              if (remainingRevenue > 0) {
                const remainingDaily = (this.getTargetDate(dataFilter?.end_time, item?.target?.revenue, item?.achieved?.revenue) - item?.daily?.revenue);
                if (remainingDaily > 0) {
                  return {
                    children: <Text strong className='text-red-500'>{`CHƯA`}</Text>,
                    __style__: { color: 'eb2315' },
                  }
                } else {
                  return {
                    children: <Text strong className='text-green-500'>{`ĐẠT`}</Text>,
                    __style__: { color: '22c55e' },
                  }
                }
              } else {
                return {
                  children: <Text strong className='text-green-500'>{`ĐẠT`}</Text>,
                  __style__: { color: '22c55e' },
                }
              }
            },
          },
        ]
      },
    ];
    const items = [
      {
        key: '1',
        label: (
          // eslint-disable-next-line
          <a onClick={() => exportTableAntdToExcel(overviewColumns, dataTargets, dayjs().format("HH-mm/DD-MM-YYYY"))}>
            Excel
          </a>
        ),
      },
      {
        key: '2',
        label: (
          // eslint-disable-next-line
          <a onClick={() => exportTableAntdToImage('tableTargetOverView', dayjs().format("HH-mm/DD-MM-YYYY"))}>
            Ảnh
          </a>
        ),
      },
    ];
    const calculateSummary = (datas) => {
      let totalTargetMoney = 0;
      let totalAchievedMoney = 0;
      let totalTargetMoneyDate = 0;
      let totalDailyMoney = 0;
      datas.forEach(({ target, achieved, daily }) => {
        totalTargetMoney += target?.revenue;
        totalAchievedMoney += achieved?.revenue;
        totalDailyMoney += daily?.revenue;
      });
      totalTargetMoneyDate = this.getTargetDate(dataFilter?.end_time, totalTargetMoney - totalAchievedMoney, 0);
      return (
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>
            <Text strong>Tổng</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <Text strong>{formatNumber(totalTargetMoney)}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <Text strong>{formatNumber(totalAchievedMoney)}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            {(totalTargetMoney - totalAchievedMoney) > 0 ?
              <Text className='text-red-500' strong>{`-${formatNumber(totalTargetMoney - totalAchievedMoney)}`}</Text>
              :
              <Text className='text-green-500' strong>{`+${formatNumber(Math.abs(totalTargetMoney - totalAchievedMoney))}`}</Text>
            }
          </Table.Summary.Cell>
          <Table.Summary.Cell index={4}>
            {(totalTargetMoney - totalAchievedMoney) > 0 ?
              <Text className='text-red-500' strong>CHƯA</Text>
              :
              <Text className='text-green-500' strong>ĐẠT</Text>
            }
          </Table.Summary.Cell>
          <Table.Summary.Cell index={5}>
            <Text strong>{formatNumber(totalTargetMoneyDate)}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={6}>
            <Text strong>{formatNumber(totalDailyMoney)}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={7}>
            {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
              <Text className='text-red-500' strong>{`-${formatNumber(totalTargetMoneyDate - totalDailyMoney)}`}</Text>
              :
              <Text className='text-green-500' strong>{`+${formatNumber(Math.abs(totalTargetMoneyDate - totalDailyMoney))}`}</Text>
            }
          </Table.Summary.Cell>
          <Table.Summary.Cell index={8}>
            {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
              <Text className='text-red-500' strong>CHƯA</Text>
              :
              <Text className='text-green-500' strong>ĐẠT</Text>
            }
          </Table.Summary.Cell>
        </Table.Summary.Row>
      );
    }
    return (
      <>
        <Spin size='large' spinning={isLoading}>
          <div className="mx-[10px] space-y-[10px]">
            <div className='flex items-center justify-between space-x-[5px]'>
              <Button disabled={!dataCheckPermis['target.view_target']}
                onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                <Space className='text-white dark:text-black'>
                  <AiFillFilter />
                  Lọc
                </Space>
              </Button>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Button className='bg-[#0e97ff] dark:bg-white'>
                  <Space className='text-white dark:text-black'>
                    <FaFileExport />
                    Xuất file
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <div id='tableTargetOverView' className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md '>
              <Table rowKey="id"
                columns={overviewColumns} dataSource={dataTargets} pagination={false}
                size="small" bordered scroll={{ x: 1000 }}
                summary={calculateSummary}
              />
            </div>
            <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md '>
              <div className='md:grid grid-cols-2 gap-[20px]'>
                {dataChartTargetMonthShop && dataChartTargetMonthShop.datas &&
                  <BarGroup dataSeries={dataChartTargetMonthShop?.datas} dataCategories={dataChartTargetMonthShop?.labels}
                    height={dataChartTargetMonthShop?.height} unit={'money'}
                    title={"Target tháng (triệu vnđ)"} colors={['#0e92f7', '#f60000']} />
                }
                <div>
                  {dataChartTargetDateShop && dataChartTargetDateShop.datas &&
                    <BarGroup dataSeries={dataChartTargetDateShop?.datas} dataCategories={dataChartTargetDateShop?.labels}
                      height={dataChartTargetDateShop?.height} unit={'money'}
                      title={"Target ngày (triệu vnđ)"} colors={['#f60000']} />
                  }
                  {dataChartDailyIncomeDateShop && dataChartDailyIncomeDateShop.datas &&
                    <BarGroup dataSeries={dataChartDailyIncomeDateShop?.datas} dataCategories={dataChartDailyIncomeDateShop?.labels}
                      height={dataChartDailyIncomeDateShop?.height} unit={'money'}
                      title={"Doanh thu ngày (triệu vnđ)"} colors={['#0e92f7']} />
                  }
                </div>
              </div>
            </div>
          </div>
        </Spin>
        {drawerFilter && dataCheckPermis['target.view_target'] &&
          <DrawerFilter drawerFilter={drawerFilter}
            openDrawer={this.openDrawer} dataFilter={dataFilter}
            handleFilter={this.handleFilter} />}
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