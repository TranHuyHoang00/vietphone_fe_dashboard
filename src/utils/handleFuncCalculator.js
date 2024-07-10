import { dataStaffSales } from '@datas/dataReward';

const calculateSalary = (datas, type) => {
    const codeRole = datas?.staff?.role?.code;
    const dataSetKPI = datas?.staff_monthly_target?.target_product_category;
    const dataAchieveKPI = datas?.revenue?.product_sales;
    const dataSetTarget = datas?.staff_monthly_target;
    const dataAchieveTarget = datas?.revenue;
    switch (codeRole) {
        case 'officialStaffSales' || 'probationaryStaffSales':
            let dataRole = {};
            let dataRewardKPI = [];
            let dataRewardTarget = 0;
            if (type === 'role') { dataRole = dataStaffSales?.role.find(item => item?.name === codeRole); }
            if (type === 'rewardKPI') { dataRewardKPI = handleKPI(dataSetKPI, dataAchieveKPI); }
            if (type === 'rewardTarget') { dataRewardTarget = handleTarget(dataSetTarget, dataAchieveTarget); }
            return {
                dataRewardKPI: dataRewardKPI,
                dataSalary: dataRole?.salary,
                dataRewardTarget: dataRewardTarget,
            };
        default:
            break;
    }
};
const handleTarget = (dataSetTarget, dataAchieveTarget) => {
    const dataRewardTArget = dataStaffSales?.reward.find(item => item?.typeReward === "TARGET");
    const percentAchieveTarget = parseFloat(dataAchieveTarget?.total_revenue) / parseFloat(dataSetTarget?.value) * 100;
    for (const item of dataRewardTArget?.detail) {
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
const handleKPI = (dataSetKPI, dataAchieveKPI) => {
    const dataRewardKPI = dataStaffSales?.reward.find(item => item?.typeReward === "KPI");
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
        const itemAchieveKPI = dataAchieveKPI.find((achieve) => achieve?.code === set?.product_category?.code);
        if (itemAchieveKPI !== undefined) {
            return {
                id: set?.id,
                code: set?.product_category?.code,
                name: set?.product_category?.name,
                achieveValue: handleAchieve(set?.value, itemAchieveKPI?.revenue),
                achieveQuantity: handleAchieve(set?.quantity, itemAchieveKPI?.quantity),
            }
        } else {
            return undefined;
        }
    }).filter(item => item !== undefined);
    const newDataRewardKPI = dataRewardKPI?.children.map((rewardKPI) => {
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

}
export {
    calculateSalary
}