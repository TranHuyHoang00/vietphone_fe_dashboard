import { dataRewards } from '@datas/dataReward';

const calculateSalary = (datas, typeFunc) => {
    if (!datas || !dataRewards) {
        return {
            dataSalarys: [],
            dataRewardTarget: 0,
            dataRewardKPIs: [],
        };
    }
    const userRole = datas?.staff?.role?.code;
    const userShift = datas?.staff?.shift;
    if (!userRole || !userShift) {
        return {
            dataSalarys: [],
            dataRewardTarget: 0,
            dataRewardKPIs: [],
        };
    }

    const itemRole = dataRewards.find(item => item?.code === userRole);
    const itemShift = itemRole?.shifts.find(item => item?.code === userShift);
    if (!itemShift) {
        return {
            dataSalarys: [],
            dataRewardTarget: 0,
            dataRewardKPIs: [],
        };
    }

    const dataSetKPI = datas?.staff_monthly_target?.target_product_category;
    const dataSetTarget = datas?.staff_monthly_target;
    const dataAchieveTarget = datas?.revenueShopMonth ?? datas?.revenue;

    const dataSalarys = (typeFunc === 'salary' || typeFunc === 'all') ? itemShift?.salary : [];
    const dataRewardTarget = (typeFunc === 'target' || typeFunc === 'all') && dataSetTarget && dataAchieveTarget
        ? handleGetTarget(dataSetTarget, dataAchieveTarget, itemShift) : 0;
    const dataRewardKPIs = (typeFunc === 'kpi' || typeFunc === 'all') && dataSetKPI?.length
        ? handleGetKPI(dataSetKPI, itemShift) : [];
    return {
        dataSalarys: dataSalarys,
        dataRewardTarget: dataRewardTarget,
        dataRewardKPIs: dataRewardKPIs,
    }
};
const handleGetTarget = (dataSetTarget, dataAchieveTarget, itemShift) => {
    const dataRewardTArgets = itemShift?.reward.find(item => item?.typeReward === "TARGET");
    const itemTargetMonth = dataRewardTArgets?.children.find(item => item?.code === itemShift?.code);
    const percentAchieveTarget = parseFloat(dataAchieveTarget?.total_revenue) / parseFloat(dataSetTarget?.value) * 100;

    for (const item of itemTargetMonth?.detail) {
        switch (item?.typeCondition) {
            case 'percent-money':
                if (percentAchieveTarget >= 0) {
                    if (percentAchieveTarget >= item?.start && percentAchieveTarget <= item?.end) {
                        return item?.value;
                    }
                }
                break;
            default:
                break;
        }
    }
}
const handleGetKPI = (dataSetKPI, itemShift) => {
    let dataRewardKPIs = itemShift?.reward.find(item => item?.typeReward === "KPI");
    if (dataRewardKPIs) {
        const handleAchieve = (set, achieve) => {
            if (achieve == null || set == null || set === 0 || set === "0.00" || set === "") {
                return null;
            }
            return achieve;
        }
        const handleReward = (rewardKPI, remaining) => {
            const rewardDetail = rewardKPI?.detail;
            for (const item of rewardDetail) {
                switch (item?.typeCondition) {
                    case 'product-money':
                        if (remaining?.achieveQuantity >= 0) {
                            if (remaining?.achieveQuantity >= item?.start && remaining?.achieveQuantity <= item?.end) {
                                return item?.value * remaining?.achieveQuantity;
                            }
                        }
                        break;
                    case 'money-percent':
                        if (remaining?.achieveValue >= 0) {
                            if (remaining?.achieveValue >= item?.start && remaining?.achieveValue <= item?.end) {
                                return item?.value * remaining?.achieveValue / 100;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        const dataRemainingKPI = dataSetKPI.map((set) => {
            return {
                id: set?.target_product_category?.id,
                code: set?.target_product_category?.code,
                name: set?.target_product_category?.name,
                achieveValue: handleAchieve(set?.value, set?.actual_achieved?.revenue),
                achieveQuantity: handleAchieve(set?.quantity, set?.actual_achieved?.quantity),
            }
        }).filter(item => item !== undefined);
        const newDataRewardKPI = dataRewardKPIs?.children.map((rewardKPI) => {
            const itemRemainingKPI = dataRemainingKPI.find((remaining) => remaining?.code === rewardKPI.code);

            if (itemRemainingKPI !== undefined) {
                return {
                    id: rewardKPI?.id,
                    code: rewardKPI?.code,
                    name: rewardKPI?.name,
                    rewardKPI: handleReward(rewardKPI, itemRemainingKPI),
                }
            } else {
                return undefined;
            }
        }).filter(item => item !== undefined);
        return newDataRewardKPI;
    } else {
        return []
    }
}
export {
    calculateSalary
}