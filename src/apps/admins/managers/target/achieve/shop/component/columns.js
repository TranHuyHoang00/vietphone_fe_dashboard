import dayjs from 'dayjs';
import { Typography, Table } from 'antd';
import { formatNumber } from '@utils/handleFuncFormat';
const { Text } = Typography;
const classTrue = "text-green-600 font-medium line-clamp-1"
const classFalse = "text-red-600 font-medium line-clamp-1"
const getTargetDate = (end, targetMonth, targetAchieved) => {
    const targetRemaining = targetMonth - targetAchieved;
    const remainingDays = dayjs(end).daysInMonth() - dayjs(end).date();
    if (remainingDays === 0) {
        return targetRemaining / 1;
    } else {
        return targetRemaining / remainingDays;
    }
}
const columnRevenueOverViews = (typeActive, dataFilter, history) => [
    {
        title: `${typeActive?.typeTime === 'month' ?
            `TỔNG DOANH THU THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
            `TỔNG DOANH THU TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
        children: [
            {
                title: 'CỬA HÀNG', dataIndex: 'shop',
                render: (datas) => {
                    return {
                        children:
                            <Text onClick={() => history.push(`/admin/achieve/target/shop/detail/${datas?.id}`)}
                                strong className='text-[#0574b8] dark:text-white uppercase cursor-pointer'>{datas?.name}</Text>,
                        __style__: { color: '0574b8' }, bold: true,
                    };
                },
                sorter: (a, b) => a?.shop?.name.localeCompare(b?.shop?.name),
            },
            {
                title: 'TARGET', dataIndex: ['shop_monthly_target', 'value'],
                render: (value) => {
                    return { children: <Text >{formatNumber(value)}</Text> }
                },
                sorter: (a, b) => a?.shop_monthly_target?.value - b?.shop_monthly_target?.value,
            },
            {
                title: `NGÀY ${dayjs(dataFilter?.start).format('DD')} TỚI ${dayjs(dataFilter?.end).format('DD')}`,
                dataIndex: ['revenue', 'total_revenue'],
                render: (value) => {
                    return { children: <Text >{formatNumber(value)}</Text> }
                },
                sorter: (a, b) => a?.revenue?.total_revenue - b?.revenue?.total_revenue,
            },
            {
                title: 'TỈ LỆ', dataIndex: ['revenue', 'total_revenue'],
                render: (value, datas) => {
                    const percenRevenue = (value / datas?.shop_monthly_target?.value) * 100;
                    if (percenRevenue >= 0 && percenRevenue < 100) {
                        return {
                            children: <Text strong className='text-red-500'>{`${formatNumber(percenRevenue, 0, 2)} %`}</Text>,
                            __style__: { color: 'eb2315' },
                        }
                    } else {
                        return {
                            children: <Text strong className='text-green-500'>{`${formatNumber(percenRevenue, 0, 2)} %`}</Text>,
                            __style__: { color: '22c55e' },
                        }
                    }
                },
                sorter: (a, b) => (a?.revenue?.total_revenue / a?.shop_monthly_target?.value * 100) - (b?.revenue?.total_revenue / b?.shop_monthly_target?.value * 100),

            },
            {
                title: `CÒN LẠI`, dataIndex: ['revenue', 'total_revenue'],
                render: (value, datas) => {
                    const remainingRevenue = datas?.shop_monthly_target?.value - value;
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
                sorter: (a, b) => (a?.shop_monthly_target?.value - a?.revenue?.total_revenue) - (b?.shop_monthly_target?.value - b?.revenue?.total_revenue),
            },
            {
                title: 'ĐẠT', dataIndex: ['revenue', 'total_revenue'],
                render: (value, datas) => {
                    const remainingRevenue = datas?.shop_monthly_target?.value - value;
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

            {
                title: `TARGET NGÀY`, dataIndex: ['revenue', 'total_revenue'],
                render: (value, datas) => {
                    const remainingRevenue = datas?.shop_monthly_target?.value - value;
                    if (remainingRevenue > 0) {
                        return {
                            children: <Text>{`${formatNumber(getTargetDate(dataFilter?.end, datas?.shop_monthly_target?.value, datas?.revenue?.total_revenue))}`}</Text>
                        }
                    } else {
                        return { children: <Text>0</Text> }
                    }
                },
                sorter: (a, b) => (getTargetDate(dataFilter?.end, a?.shop_monthly_target?.value, a?.revenue?.total_revenue)) - (getTargetDate(dataFilter?.end, b?.shop_monthly_target?.value, b?.revenue?.total_revenue)),
            },
        ]
    },
    {
        title: `DOANH THU NGÀY ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`, children: [
            {
                title: `THỰC ĐẠT`, dataIndex: ['daily', 'total_revenue'],
                render: (value) => {
                    return { children: <Text >{formatNumber(value)}</Text> }
                },
                sorter: (a, b) => a?.daily?.total_revenue - b?.daily?.total_revenue,
            },
            {
                title: `CÒN LẠI`, dataIndex: ['revenue', 'total_revenue'],
                render: (value, datas) => {
                    const remainingRevenue = datas?.shop_monthly_target?.value - value;
                    if (remainingRevenue > 0) {
                        const remainingDaily = (getTargetDate(dataFilter?.end, datas?.shop_monthly_target?.value, value) - datas?.daily?.total_revenue);
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
                sorter: (a, b) => (getTargetDate(dataFilter?.end, a?.shop_monthly_target?.value, a?.revenue?.total_revenue) - a?.daily?.total_revenue) - (getTargetDate(dataFilter?.end, b?.shop_monthly_target?.value, b?.revenue?.total_revenue) - b?.daily?.total_revenue),
            },
            {
                title: 'ĐẠT', dataIndex: ['daily', 'total_revenue'],
                render: (value, datas) => {
                    const remainingRevenue = datas?.shop_monthly_target?.value - datas?.revenue?.total_revenue;
                    if (remainingRevenue > 0) {
                        const remainingDaily = (getTargetDate(dataFilter?.end, datas?.shop_monthly_target?.value, datas?.revenue?.total_revenue) - value);
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
    }
];
const calculateSummary = (datas, dataFilter) => {
    return () => {
        let totalTargetMoney = 0;
        let totalAchievedMoney = 0;
        let totalTargetMoneyDate = 0;
        let totalDailyMoney = 0;
        let totalPercenRevenue = 0;
        datas.forEach(({ shop_monthly_target, revenue, daily }) => {
            totalTargetMoney += parseFloat(shop_monthly_target?.value);
            totalAchievedMoney += parseFloat(revenue?.total_revenue);
            totalDailyMoney += parseFloat(daily?.total_revenue);
            totalPercenRevenue += parseFloat((revenue?.total_revenue / shop_monthly_target?.value * 100) / datas.length)
        });
        totalTargetMoneyDate = getTargetDate(dataFilter?.end, totalTargetMoney - totalAchievedMoney, 0);
        return (
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                    <Text strong>TỔNG</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                    <Text strong>{formatNumber(totalTargetMoney)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                    <Text strong>{formatNumber(totalAchievedMoney)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                    {(totalPercenRevenue >= 0 && totalPercenRevenue < 100) ?
                        <Text className='text-red-500' strong>{formatNumber(totalPercenRevenue, 0, 2)}%</Text>
                        :
                        <Text className='text-green-500' strong>{formatNumber(totalPercenRevenue, 0, 2)}%</Text>
                    }
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

                <Table.Summary.Cell index={6}>
                    <Text strong>{formatNumber(totalTargetMoneyDate)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                    <Text strong>{formatNumber(totalDailyMoney)}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                    {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
                        <Text className='text-red-500' strong>{`-${formatNumber(totalTargetMoneyDate - totalDailyMoney)}`}</Text>
                        :
                        <Text className='text-green-500' strong>{`+${formatNumber(Math.abs(totalTargetMoneyDate - totalDailyMoney))}`}</Text>
                    }
                </Table.Summary.Cell>
                <Table.Summary.Cell index={9}>
                    {(totalTargetMoneyDate - totalDailyMoney) > 0 ?
                        <Text className='text-red-500' strong>CHƯA</Text>
                        :
                        <Text className='text-green-500' strong>ĐẠT</Text>
                    }
                </Table.Summary.Cell>
            </Table.Summary.Row>
        );
    };
}
const columnRevenueDetails = (typeActive, dataFilter, dataProductCategorys, datas) => {
    const newDataPCs = dataProductCategorys.map((product) => {
        const saleProduct = datas?.revenue?.product_sales.find((sale) => sale.category_name === product.name);
        const dailyProduct = datas?.daily?.product_sales.find((daily) => daily.category_name === product.name);
        return {
            ...product,
            sale: saleProduct ? saleProduct : { quantity: 0, revenue: 0 },
            daily: dailyProduct ? dailyProduct : { quantity: 0, revenue: 0 },
        };
    });
    const displayValue = (value, unit) => {
        if (value === 0) { return <span>-</span>; }
        const className = value > 0 ? classTrue : classFalse;
        return <Text className={className}>{formatNumber(value)} {unit}</Text>;
    };
    return [
        {
            title: `${typeActive?.typeTime === 'month' ?
                `CHI TIẾT DOANH THU THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
                `CHI TIẾT DT TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
            children: [
                {
                    title: "TÊN LOẠI", width: 250,
                    render: () =>
                        <div className='divide-y'>
                            {(newDataPCs && newDataPCs.map((item) => (
                                <div className='py-[2px]' key={item?.id}>
                                    <Text>{item?.name}</Text>
                                </div>
                            ))
                            )}
                        </div>
                },
                {
                    title: "THỰC ĐẠT", width: 200,
                    render: () =>
                        <div className='divide-y'>
                            {(newDataPCs && newDataPCs.map((item) => (
                                <div className='flex items-center justify-between divide-x' key={item?.id}>
                                    <div className='py-[2px] w-1/3'>
                                        {displayValue(item?.sale?.quantity, 'cái')}
                                    </div>
                                    <div className='pl-[5px] py-[2px] w-2/3 '>
                                        {displayValue(item?.sale?.revenue, 'đ')}
                                    </div>
                                </div>
                            ))
                            )}
                        </div>
                },
            ]
        },
        {
            title: `CTDT NGÀY ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`, children: [
                {
                    title: "THỰC ĐẠT", width: 200,
                    render: () =>
                        <div className='divide-y'>
                            {(newDataPCs && newDataPCs.map((item) => (
                                <div className='flex items-center justify-between divide-x' key={item?.id}>
                                    <div className='py-[2px] w-1/3'>
                                        {displayValue(item?.daily?.quantity, 'cái')}
                                    </div>
                                    <div className='pl-[5px] py-[2px] w-2/3 '>
                                        {displayValue(item?.daily?.revenue, 'đ')}
                                    </div>
                                </div>
                            ))
                            )}
                        </div>
                }
            ]
        }

    ]
};
export {
    columnRevenueOverViews, columnRevenueDetails, calculateSummary
}