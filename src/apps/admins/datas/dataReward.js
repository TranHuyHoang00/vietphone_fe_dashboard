const dataRewards = [
    {
        id: 1,
        name: "CHT TV",
        code: "probationHeadShops",
        shifts: [
            {
                id: 1, code: 'ft', name: 'FULL TIME',
                salary: [
                    { id: 1, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 7200000 },
                    { id: 2, code: 'PC', name: 'PHỤ CẤP', value: 800000 },
                ],
                reward: [
                    {
                        id: 1, typeReward: 'TARGET', children: [
                            {
                                id: 1, code: 'ft', name: 'TG CHT CT FT', detail: [
                                    { id: 1, typeCondition: 'percent-money', start: 0, end: 89, value: 0 },
                                    { id: 2, typeCondition: 'percent-money', start: 90, end: 99, value: 2700000 },
                                    { id: 3, typeCondition: 'percent-money', start: 100, end: 119, value: 6000000 },
                                    { id: 4, typeCondition: 'percent-money', start: 120, end: 999, value: 7200000 },
                                ]
                            },
                        ]
                    }
                ]
            }
        ],
    },
    {
        id: 2,
        name: "CHT CT",
        code: "officialHeadShops",
        shifts: [
            {
                id: 1, code: 'ft', name: 'FULL TIME',
                salary: [
                    { id: 1, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 9000000 },
                    { id: 2, code: 'PC', name: 'PHỤ CẤP', value: 1000000 },
                ],
                reward: [
                    {
                        id: 1, typeReward: 'TARGET', children: [
                            {
                                id: 1, code: 'ft', name: 'TG CHT CT FT', detail: [
                                    { id: 1, typeCondition: 'percent-money', start: 0, end: 89, value: 0 },
                                    { id: 2, typeCondition: 'percent-money', start: 90, end: 99, value: 2700000 },
                                    { id: 3, typeCondition: 'percent-money', start: 100, end: 119, value: 6000000 },
                                    { id: 4, typeCondition: 'percent-money', start: 120, end: 999, value: 7200000 },
                                ]
                            },
                        ]
                    }
                ]
            }
        ],
    },
    {
        id: 3,
        name: "NV BH TV",
        code: "probationStaffSales",
        shifts: [
            {
                id: 1, code: 'ft', name: 'FULL TIME',
                salary: [
                    { id: 1, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 5600000 },
                    { id: 2, code: 'PC', name: 'PHỤ CẤP', value: 800000 },
                ],
                reward: [
                    {
                        id: 1, typeReward: 'TARGET', children: [
                            {
                                id: 1, code: 'ft', name: 'NV BH CT FT', detail: [
                                    { id: 1, typeCondition: 'percent-money', start: 0, end: 99, value: 0 },
                                    { id: 2, typeCondition: 'percent-money', start: 100, end: 119, value: 2000000 },
                                    { id: 3, typeCondition: 'percent-money', start: 120, end: 999, value: 2400000 },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                id: 2, code: 'pt', name: 'PAST TIME',
                salary: [
                    { id: 1, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 3600000 },
                    { id: 2, code: 'PC', name: 'PHỤ CẤP', value: 800000 },
                ],
                reward: [
                    {
                        id: 1, typeReward: 'TARGET', children: [
                            {
                                id: 1, code: 'pt', name: 'NV BH CT PT', detail: [
                                    { id: 1, typeCondition: 'percent-money', start: 0, end: 99, value: 0 },
                                    { id: 2, typeCondition: 'percent-money', start: 100, end: 119, value: 2000000 },
                                    { id: 3, typeCondition: 'percent-money', start: 120, end: 999, value: 2400000 },
                                ]
                            },
                        ]
                    },
                    {
                        id: 2, typeReward: 'KPI', children: [
                            {
                                id: 1, code: 'TDT', name: 'TỔNG ĐIỆN THOẠI', detail: [
                                    { id: 1, typeCondition: 'product-money', start: 0, end: 9, value: 0 },
                                    { id: 2, typeCondition: 'product-money', start: 10, end: 19, value: 20000 },
                                    { id: 3, typeCondition: 'product-money', start: 20, end: 29, value: 30000 },
                                    { id: 4, typeCondition: 'product-money', start: 30, end: 49, value: 50000 },
                                    { id: 5, typeCondition: 'product-money', start: 50, end: 999, value: 60000 },
                                ]
                            },
                            {
                                id: 2, code: 'TAT', name: 'TỔNG ÂM THANH', detail: [
                                    { id: 1, typeCondition: 'money-percent', start: 0, end: 24999999, value: 0 },
                                    { id: 2, typeCondition: 'money-percent', start: 25000000, end: 49999999, value: 1 },
                                    { id: 3, typeCondition: 'money-percent', start: 50000000, end: 74999999, value: 2 },
                                    { id: 4, typeCondition: 'money-percent', start: 75000000, end: 999999999, value: 3 },
                                ]
                            },
                            {
                                id: 3, code: 'TPK', name: 'TỔNG PHỤ KIỆN', detail: [
                                    { id: 5, typeCondition: 'money-percent', start: 0, end: 9999999, value: 0 },
                                    { id: 6, typeCondition: 'money-percent', start: 10000000, end: 19000000, value: 2 },
                                    { id: 7, typeCondition: 'money-percent', start: 20000000, end: 39999999, value: 3 },
                                    { id: 8, typeCondition: 'money-percent', start: 40000000, end: 999999999, value: 4 },
                                ]
                            }
                        ]
                    },

                ]
            }
        ],
    },
    {
        id: 2,
        name: "NV BH CT",
        code: "officialStaffSales",
        shifts: [
            {
                id: 1, code: 'ft', name: 'FULL TIME',
                salary: [
                    { id: 1, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 7000000 },
                    { id: 2, code: 'PC', name: 'PHỤ CẤP', value: 1000000 },
                ],
                reward: [
                    {
                        id: 1, typeReward: 'TARGET', children: [
                            {
                                id: 1, code: 'ft', name: 'NV BH CT FT', detail: [
                                    { id: 1, typeCondition: 'percent-money', start: 0, end: 99, value: 0 },
                                    { id: 2, typeCondition: 'percent-money', start: 100, end: 119, value: 2000000 },
                                    { id: 3, typeCondition: 'percent-money', start: 120, end: 999, value: 2400000 },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                id: 2, code: 'pt', name: 'PAST TIME',
                salary: [
                    { id: 1, code: 'LCB', name: 'LƯƠNG CƠ BẢN', value: 4500000 },
                    { id: 2, code: 'PC', name: 'PHỤ CẤP', value: 1000000 },
                ],
                reward: [
                    {
                        id: 1, typeReward: 'TARGET', children: [
                            {
                                id: 1, code: 'pt', name: 'NV BH CT PT', detail: [
                                    { id: 1, typeCondition: 'percent-money', start: 0, end: 99, value: 0 },
                                    { id: 2, typeCondition: 'percent-money', start: 100, end: 119, value: 2000000 },
                                    { id: 3, typeCondition: 'percent-money', start: 120, end: 999, value: 2400000 },
                                ]
                            },
                        ]
                    },
                    {
                        id: 2, typeReward: 'KPI', children: [
                            {
                                id: 1, code: 'TDT', name: 'TỔNG ĐIỆN THOẠI', detail: [
                                    { id: 1, typeCondition: 'product-money', start: 0, end: 9, value: 0 },
                                    { id: 2, typeCondition: 'product-money', start: 10, end: 19, value: 20000 },
                                    { id: 3, typeCondition: 'product-money', start: 20, end: 29, value: 30000 },
                                    { id: 4, typeCondition: 'product-money', start: 30, end: 49, value: 50000 },
                                    { id: 5, typeCondition: 'product-money', start: 50, end: 999, value: 60000 },
                                ]
                            },
                            {
                                id: 2, code: 'TAT', name: 'TỔNG ÂM THANH', detail: [
                                    { id: 1, typeCondition: 'money-percent', start: 0, end: 24999999, value: 0 },
                                    { id: 2, typeCondition: 'money-percent', start: 25000000, end: 49999999, value: 1 },
                                    { id: 3, typeCondition: 'money-percent', start: 50000000, end: 74999999, value: 2 },
                                    { id: 4, typeCondition: 'money-percent', start: 75000000, end: 999999999, value: 3 },
                                ]
                            },
                            {
                                id: 3, code: 'TPK', name: 'TỔNG PHỤ KIỆN', detail: [
                                    { id: 5, typeCondition: 'money-percent', start: 0, end: 9999999, value: 0 },
                                    { id: 6, typeCondition: 'money-percent', start: 10000000, end: 19000000, value: 2 },
                                    { id: 7, typeCondition: 'money-percent', start: 20000000, end: 39999999, value: 3 },
                                    { id: 8, typeCondition: 'money-percent', start: 40000000, end: 999999999, value: 4 },
                                ]
                            }
                        ]
                    },

                ]
            }
        ],
    }
]
export {
    dataRewards
}