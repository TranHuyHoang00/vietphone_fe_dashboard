import dayjs from 'dayjs';
import { Typography } from 'antd';
import { formatNumber } from '@utils/handleFuncFormat';
import { calculateSalary } from '@utils/handleFuncCalculator';

const { Text } = Typography;
const classTrue = "text-green-600 font-medium line-clamp-1"
const classFalse = "text-red-600 font-medium line-clamp-1"

const getDataTableRevenueOverView = (datas, columnName) => {
    if (columnName === "revenueMonth") {
        const revenueShopMonth = datas?.revenueShopMonth;
        return revenueShopMonth?.total_revenue ?? datas?.revenue?.total_revenue;
    }
    if (columnName === "revenueDaily") {
        const revenueShopDaily = datas?.revenueShopDaily;
        return revenueShopDaily?.total_revenue ?? datas?.daily?.total_revenue;
    }
}
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
                title: 'NHÂN VIÊN', dataIndex: 'staff',
                render: (datas) => {
                    return {
                        children: <Text onClick={() => history.push(`/admin/achieve/target/staff/detail/${datas?.id}`)}
                            strong className='text-[#0574b8] dark:text-white uppercase cursor-pointer'>{datas?.name}</Text>,
                        __style__: { color: '0574b8' }, bold: true,
                    };
                },
                sorter: (a, b) => a?.staff?.name.localeCompare(b?.staff?.name),
            },
            {
                title: 'TARGET', dataIndex: ['staff_monthly_target', 'value'],
                render: (value) => {
                    return { children: <Text >{formatNumber(value)}</Text> }
                },
                sorter: (a, b) => a?.staff_monthly_target?.value - b?.staff_monthly_target?.value,
            },
            {
                title: `NGÀY ${dayjs(dataFilter?.start).format('DD')} TỚI ${dayjs(dataFilter?.end).format('DD')}`,
                dataIndex: 'revenue',
                render: (value, datas) => {
                    const revenueMonth = getDataTableRevenueOverView(datas, 'revenueMonth');
                    return { children: <Text >{formatNumber(revenueMonth)}</Text> }
                },
                sorter: (a, b) => getDataTableRevenueOverView(a, 'revenueMonth') - getDataTableRevenueOverView(b, 'revenueMonth'),
            },
            {
                title: `CÒN LẠI`, dataIndex: ['staff_monthly_target', 'value'],
                render: (value, datas) => {
                    const revenueMonth = getDataTableRevenueOverView(datas, 'revenueMonth');
                    const remainingRevenue = value - revenueMonth;
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
                sorter: (a, b) => (a?.staff_monthly_target?.value - getDataTableRevenueOverView(a, 'revenueMonth')) - (b?.staff_monthly_target?.value - getDataTableRevenueOverView(b, 'revenueMonth')),
            },
            {
                title: 'ĐẠT', dataIndex: ['staff_monthly_target', 'value'],
                render: (value, datas) => {
                    const revenueMonth = getDataTableRevenueOverView(datas, 'revenueMonth');
                    const remainingRevenue = value - revenueMonth;
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
                title: `TARGET NGÀY`, dataIndex: ['staff_monthly_target', 'value'],
                render: (value, datas) => {
                    const revenueMonth = getDataTableRevenueOverView(datas, 'revenueMonth');
                    const remainingRevenue = value - revenueMonth;
                    if (remainingRevenue > 0) {
                        return {
                            children: <Text>{`${formatNumber(getTargetDate(dataFilter?.end, value, revenueMonth))}`}</Text>
                        }
                    } else {
                        return { children: <Text>0</Text> }
                    }
                },
                sorter: (a, b) => (getTargetDate(dataFilter?.end, a?.staff_monthly_target?.value, getDataTableRevenueOverView(a, 'revenueMonth'))) - (getTargetDate(dataFilter?.end, b?.staff_monthly_target?.value, getDataTableRevenueOverView(b, 'revenueMonth'))),
            },
        ]
    },
    {
        title: `DOANH THU NGÀY ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`, children: [
            {
                title: `THỰC ĐẠT`,
                dataIndex: 'revenue',
                render: (value, datas) => {
                    const revenueDaily = getDataTableRevenueOverView(datas, 'revenueDaily');
                    return { children: <Text >{formatNumber(revenueDaily)}</Text> }
                },
                sorter: (a, b) => getDataTableRevenueOverView(a, 'revenueDaily') - getDataTableRevenueOverView(b, 'revenueDaily'),
            },
            {
                title: `CÒN LẠI`, dataIndex: ['staff_monthly_target', 'value'],
                render: (value, datas) => {
                    const revenueMonth = getDataTableRevenueOverView(datas, 'revenueMonth');
                    const remainingRevenue = value - revenueMonth;
                    const revenueDaily = getDataTableRevenueOverView(datas, 'revenueDaily');
                    if (remainingRevenue > 0) {
                        const remainingDaily = (getTargetDate(dataFilter?.end, value, revenueMonth) - revenueDaily);
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
                sorter: (a, b) => (getTargetDate(dataFilter?.end, a?.staff_monthly_target?.value, getDataTableRevenueOverView(a, 'revenueMonth')) - getDataTableRevenueOverView(a, 'revenueDaily')) - (getTargetDate(dataFilter?.end, b?.staff_monthly_target?.value, getDataTableRevenueOverView(b, 'revenueMonth')) - getDataTableRevenueOverView(b, 'revenueDaily')),
            },
            {
                title: 'ĐẠT',
                dataIndex: ['staff_monthly_target', 'value'],
                render: (value, datas) => {
                    const revenueMonth = getDataTableRevenueOverView(datas, 'revenueMonth');
                    const remainingRevenue = value - revenueMonth;
                    const revenueDaily = getDataTableRevenueOverView(datas, 'revenueDaily');
                    if (remainingRevenue > 0) {
                        const remainingDaily = (getTargetDate(dataFilter?.end, value, revenueMonth) - revenueDaily);
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


const columnRevenueDetails = (typeActive, dataFilter, dataProductCategorys, datas) => {
    const newDataPCs = dataProductCategorys.map((productCategory) => {
        const revenueMonth = datas?.revenueShopMonth?.product_sales ?? datas?.revenue?.product_sales;
        const revenueDaily = datas?.revenueShopDaily?.product_sales ?? datas?.daily?.product_sales;
        let dailyProduct = { quantity: 0, revenue: 0 };
        let saleProduct = { quantity: 0, revenue: 0 };
        if (revenueDaily) { dailyProduct = revenueDaily.find((daily) => daily.category_name === productCategory.name); }
        if (revenueMonth) { saleProduct = revenueMonth.find((sale) => sale.category_name === productCategory.name); }
        return {
            ...productCategory,
            sale: saleProduct ? saleProduct : { quantity: 0, revenue: 0 },
            daily: dailyProduct ? dailyProduct : { quantity: 0, revenue: 0 },
        };
    });
    const displayValue = (value, unit) => {
        if (value === 0) { return <span>-</span>; }
        const className = value > 0 ? classTrue : classFalse;
        return <span className={className}>{formatNumber(value)} {unit}</span>;
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
            title: `CHI TIẾT DOANH THU NGÀY ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`, children: [
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

const getDataTableKPIDetail = (datas, columnName) => {
    const newDataPCTs = datas?.staff_monthly_target?.target_product_category;
    const displayValue = (value, unit) => {
        if (value === 0) { return <span>-</span>; }
        const className = value > 0 ? classTrue : classFalse;
        return <span className={className}>{formatNumber(value)} {unit}</span>;
    };
    const displayValueProviso = (proviso, value, unit) => {
        if (proviso === 0 || proviso === "0.00" || proviso === "") {
            return <span>-</span>;
        }

        const className = value >= 0 ? classTrue : classFalse;
        return <span className={className}>{formatNumber(value)} {unit}</span>;
    };
    const displayStatusProviso = (proviso, value) => {
        if (proviso === 0 || proviso === "0.00" || proviso === "") {
            return <span>-</span>;
        }
        const statusText = value >= 0 ? "ĐẠT" : "CHƯA";
        const className = value >= 0 ? classTrue : classFalse;

        return <span className={className}>{statusText}</span>;
    };
    if (columnName === 'nameProductCategoryTarget') {
        return newDataPCTs && newDataPCTs.map((item, index) => (
            <div className='border px-[5px] py-[2px]' key={index}>
                <span className='line-clamp-1'>{item?.target_product_category?.name}</span>
            </div>
        ));
    }
    if (columnName === 'targetMonth') {
        return newDataPCTs && newDataPCTs.map((item, index) => (
            <div className='flex items-center justify-between' key={index}>
                <div className='border px-[5px] py-[2px] w-1/3'>
                    {item?.quantity > 0 ?
                        <span >
                            {item?.quantity} cái
                        </span> : <span>-</span>
                    }
                </div>
                <div className='border px-[5px] py-[2px] w-2/3'>
                    {item?.value > 0 ?
                        <span>
                            {formatNumber(item?.value)} đ
                        </span> : <span>-</span>
                    }
                </div>
            </div>
        ));
    }
    if (columnName === 'revenueMonth') {
        return newDataPCTs && newDataPCTs.map((item, index) => (
            <div className='flex items-center justify-between' key={index}>
                <div className='border px-[5px] py-[2px] w-1/3'>
                    {displayValue(item?.actual_achieved?.quantity, 'cái')}
                </div>
                <div className='border px-[5px] py-[2px] w-2/3 '>
                    {displayValue(item?.actual_achieved?.revenue, 'đ')}
                </div>
            </div>
        ));
    }
    if (columnName === 'remainingMonth') {
        return newDataPCTs && newDataPCTs.map((item, index) => (
            <div className='flex items-center justify-between' key={index}>
                <div className='border px-[5px] py-[2px] w-1/3'>
                    {displayValueProviso(item?.quantity, item?.actual_achieved?.quantity - item?.quantity, 'cái')}
                </div>
                <div className='border px-[5px] py-[2px] w-2/3'>
                    {displayValueProviso(item?.value, item?.actual_achieved?.revenue - item?.value, 'đ')}
                </div>
            </div>
        ));
    }
    if (columnName === 'statusMonth') {
        return newDataPCTs && newDataPCTs.map((item, index) => (
            <div className='flex items-center justify-between' key={index}>
                <div className='border px-[5px] py-[2px] w-1/2'>
                    {displayStatusProviso(item?.quantity, item?.actual_achieved?.quantity - item?.quantity)}
                </div>
                <div className='border px-[5px] py-[2px] w-1/2'>
                    {displayStatusProviso(item?.value, item?.actual_achieved?.revenue - item?.value)}
                </div>
            </div>
        ));
    }
    if (columnName === 'rewardMonth') {
        const dataRewards = calculateSalary(datas, 'kpi');
        const dataRewardKPIs = dataRewards?.dataRewardKPIs;
        if (dataRewardKPIs && dataRewardKPIs.length !== 0) {
            return newDataPCTs && newDataPCTs.map((item, index) => {
                const itemSelected = dataRewardKPIs.find((rewardKPI) => rewardKPI?.code === item?.target_product_category?.code);
                return (
                    <div key={index} className='border px-[5px] py-[2px]'>
                        {itemSelected === undefined ?
                            <span>-</span>
                            :
                            <>
                                {itemSelected?.rewardKPI === 0 ?
                                    <span >-</span>
                                    :
                                    <span className={classTrue}>{formatNumber(itemSelected?.rewardKPI)} đ</span>
                                }
                            </>
                        }
                    </div>
                );
            });
        } else {
            return <span>-</span>;
        }
    }
}
const columnKPIDetails = (typeActive, dataFilter, datas) => {
    return [
        {
            title: `${typeActive?.typeTime === 'month' ?
                `CHI TIẾT KPI THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
                `CHI TIẾT KPI TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
            children: [
                {
                    title: 'TÊN LOẠI', width: 250,
                    render: (datas) => <>{getDataTableKPIDetail(datas, 'nameProductCategoryTarget')}</>
                },
                {
                    title: "TARGET THÁNG", width: 200,
                    render: (datas) => <>{getDataTableKPIDetail(datas, 'targetMonth')}</>
                },
                {
                    title: "THỰC ĐẠT", width: 200,
                    render: (datas) => <>{getDataTableKPIDetail(datas, 'revenueMonth')}</>
                },
                {
                    title: "CÒN LẠI", width: 200,
                    render: (datas) => <>{getDataTableKPIDetail(datas, 'remainingMonth')}</>
                },
                {
                    title: "ĐẠT", width: 200,
                    render: (datas) => <>{getDataTableKPIDetail(datas, 'statusMonth')}</>
                },
                {
                    title: "THƯỞNG", width: 200,
                    render: (datas) => <>{getDataTableKPIDetail(datas, 'rewardMonth')}</>
                }
            ]
        }
    ]
};

const columnSalaryOverviews = (typeActive, dataFilter, datas) => {
    const dataRewards = calculateSalary(datas, 'all');
    const dataRewardTarget = dataRewards?.dataRewardTarget;
    const salaryBasic = dataRewards?.dataSalarys.find(item => item?.code === "LCB")
    const salarySubsidy = dataRewards?.dataSalarys.find(item => item?.code === "PC")
    const totalRewardKPI = dataRewards?.dataRewardKPIs?.reduce((a, b) => a + b.rewardKPI, 0) ?? 0;
    const totalRewardSalary = dataRewards?.dataSalarys?.reduce((a, b) => a + b.value, 0) ?? 0;
    const totalRewardTarget = dataRewards?.dataRewardTarget ?? 0;
    const totalSalary = totalRewardKPI + totalRewardSalary + totalRewardTarget;
    return [
        {
            title: `${typeActive?.typeTime === 'month' ?
                `TỔNG QUAN BẢNG LƯƠNG THÁNG ${dayjs(dataFilter?.start).format('MM-YYYY')}` :
                `TỔNG QUAN BẢNG LƯƠNG TỪ ${dayjs(dataFilter?.start).format('DD-MM-YYYY')} TỚI ${dayjs(dataFilter?.end).format('DD-MM-YYYY')}`}`,
            children: [
                {
                    title: 'NHÂN VIÊN', dataIndex: ['staff', 'name'], width: 250,
                    render: (value) => {
                        return {
                            children: <Text strong className='text-[#0574b8] dark:text-white uppercase'>{value}</Text>,
                            __style__: { color: '0574b8' }, bold: true,
                        };
                    },
                    sorter: (a, b) => a?.staff?.name.localeCompare(b?.staff?.name),
                },
                {
                    title: 'LƯƠNG CƠ BẢN', width: 150,
                    render: () => <Text>{salaryBasic ? formatNumber(salaryBasic?.value) : 0}</Text>
                },
                {
                    title: 'PHỤ CẤP', width: 150,
                    render: () => <Text>{salarySubsidy ? formatNumber(salarySubsidy?.value) : 0}</Text>
                },
                {
                    title: 'THƯỞNG KPI', width: 150,
                    render: () => <Text>{formatNumber(totalRewardKPI)}</Text>
                },
                {
                    title: 'THƯỞNG TARGET', width: 150,
                    render: () => <Text>{dataRewardTarget ? formatNumber(dataRewardTarget) : 0}</Text>
                },
                {
                    title: 'TỔNG', width: 150,
                    render: () => <Text>{formatNumber(totalSalary)}</Text>
                },

            ]
        }
    ]
};
export {
    columnRevenueOverViews, columnRevenueDetails, columnKPIDetails, columnSalaryOverviews
}