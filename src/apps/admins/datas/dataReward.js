const headShops = [
];
const dataStaffSales = {
    id: 1,
    role: [
        {
            id: 1, name: 'officialStaffSales', title: 'CHÍNH THỨC', salary: [
                { id: 1, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 4500000 },
                { id: 2, code: 'PC', name: 'PHỤ CẤP', value: 1000000 },
            ],
        },
        {
            id: 2, name: 'probationaryStaffSales', title: 'THỬ VIỆC', salary: [
                { id: 3, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 3600000 },
                { id: 4, code: 'PC', name: 'PHỤ CẤP', value: 800000 },
            ],
        }
    ],
    reward: [
        {
            id: 1, typeReward: 'KPI', children: [
                {
                    id: 1, code: 'DTCU', name: 'ĐIỆN THOẠI CẢM ỨNG', detail: [
                        { id: 1, typeCondition: 'product-money', start: 0, end: 9, value: 0 },
                        { id: 2, typeCondition: 'product-money', start: 10, end: 19, value: 20000 },
                        { id: 3, typeCondition: 'product-money', start: 20, end: 29, value: 30000 },
                        { id: 4, typeCondition: 'product-money', start: 30, end: 49, value: 50000 },
                        { id: 5, typeCondition: 'product-money', start: 50, end: 999, value: 60000 },
                    ]
                },
                {
                    id: 2, code: 'AT', name: 'ÂM THANH', detail: [
                        { id: 1, typeCondition: 'money-percent', start: 0, end: 24999999, value: 0 },
                        { id: 2, typeCondition: 'money-percent', start: 25000000, end: 49999999, value: 1 },
                        { id: 3, typeCondition: 'money-percent', start: 50000000, end: 74999999, value: 2 },
                        { id: 4, typeCondition: 'money-percent', start: 75000000, end: 999999999, value: 3 },
                    ]
                },
                {
                    id: 3, code: 'PK', name: 'PHỤ KIỆN', detail: [
                        { id: 1, typeCondition: 'money-percent', start: 0, end: 9999999, value: 0 },
                        { id: 2, typeCondition: 'money-percent', start: 10000000, end: 19000000, value: 2 },
                        { id: 3, typeCondition: 'money-percent', start: 20000000, end: 39999999, value: 3 },
                        { id: 4, typeCondition: 'money-percent', start: 40000000, end: 999999999, value: 4 },
                    ]
                }
            ]
        },
        {
            id: 2, typeReward: 'TARGET', detail: [
                { id: 1, typeCondition: 'percent-money', start: 0, end: 99, value: 0 },
                { id: 2, typeCondition: 'percent-money', start: 100, end: 119, value: 2000000 },
                { id: 3, typeCondition: 'percent-money', start: 120, end: 999, value: 2400000 },
            ]
        }
    ]

};
export {
    headShops, dataStaffSales
}