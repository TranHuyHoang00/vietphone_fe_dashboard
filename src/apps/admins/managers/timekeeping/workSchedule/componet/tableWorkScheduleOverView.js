import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Select, Table } from 'antd';
import dayjs from 'dayjs';
const { Text } = Typography;

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
    }
    getDataWeekDay = (dataFilter) => {
        const startDate = dayjs(dataFilter?.start);
        const endDate = dayjs(dataFilter?.end);
        const dataWeekDays = [];
        let currentDate = startDate;
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
            dataWeekDays.push({
                date: currentDate.format('DD/MM'),
                weekDay: currentDate.format('dddd'),
            });
            currentDate = currentDate.add(1, 'day');
        }
        return dataWeekDays;
    }
    renderColumnWorkSchedule = (staffId, date, newDataStaffs, optionSelects) => {
        const dataStaff = newDataStaffs.find((staff) => staff?.id === staffId);
        if (dataStaff && dataStaff?.workSchedules !== null) {
            const dataSchedule = dataStaff?.workSchedules.find((schedule) => dayjs(schedule?.date).isSame(dayjs(date, 'DD/MM')))
            if (dataSchedule) {
                return <Select value={dataSchedule?.shift?.id} style={{ width: 90 }}
                    options={optionSelects} />;
            }
            return <Select style={{ width: 90 }}
                options={optionSelects} />;
        } else {
            return <Select style={{ width: 90 }}
                options={optionSelects} />;
        }

    }
    renderColumnWeekDay = (dataStaffs, dataWorkSchedules, dataFilter, optionSelects) => {
        const dataWeekDays = this.getDataWeekDay(dataFilter);
        const newDataStaffs = dataStaffs.map((staff) => {
            const staffSchedule = dataWorkSchedules.find((schedule) => schedule?.staff?.id === staff?.id);
            return {
                ...staff,
                workSchedules: staffSchedule ? staffSchedule?.workSchedules : null,
            };
        });
        return dataWeekDays && dataWeekDays.map((item) => {
            return {
                title:
                    <div className='text-center'>
                        <div><Text className='uppercase'>{item?.weekDay}</Text></div>
                        <div><Text >{item?.date}</Text></div>
                    </div>,
                dataIndex: 'id',
                render: (id) => this.renderColumnWorkSchedule(id, item?.date, newDataStaffs, optionSelects)
            }
        })
    };
    renderColumndataShop = (dataStaffs, index) => {
        const shopId = dataStaffs[index]?.shop ? dataStaffs[index]?.shop?.id : null;
        if (shopId === null) {
            return {
                rowSpan: 1,
            };
        }
        const dataStaffSames = dataStaffs.filter(staff => staff?.shop?.id === shopId);
        const itemFirst = dataStaffSames[0] === dataStaffs[index];
        if (itemFirst) {
            return {
                rowSpan: dataStaffSames.length,
            };
        } else {
            return {
                rowSpan: 0,
            };
        }
    }

    render() {
        const { dataStaffs, dataWorkSchedules, dataFilter, optionSelects } = this.props;
        const columnWorkSchedules = [
            {
                title: 'CỬA HÀNG', dataIndex: 'shop', width: 120,
                render: (shop) => <Text strong className='text-green-600 dark:text-white uppercase'>{shop?.name}</Text>,
                onCell: (_, index) => this.renderColumndataShop(dataStaffs, index)
            },
            {
                title: 'NHÂN VIÊN', dataIndex: 'name', width: 180,
                render: (name, item) => {
                    const codeRole = item?.role?.code;
                    if (codeRole === process.env.REACT_APP_ROLE_CHT_CT || codeRole === process.env.REACT_APP_ROLE_CHT_TV) {
                        return <Text strong className='text-red-600 dark:text-white uppercase'>{name}</Text>
                    } else {
                        return <Text strong className='text-[#0574b8] dark:text-white uppercase'>{name}</Text>
                    }
                }

            },
            {
                title: `LỊCH LÀM VIỆC TỪ NGÀY ${dayjs(dataFilter?.start).format('DD/MM')} TỚI ${dayjs(dataFilter?.end).format('DD/MM')}`,
                children: this.renderColumnWeekDay(dataStaffs, dataWorkSchedules, dataFilter, optionSelects)
            },
        ]
        return (
            <Table rowKey="id"
                columns={columnWorkSchedules} dataSource={dataStaffs}
                pagination={false}
                size="small" bordered scroll={{ x: 1000 }} />
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
