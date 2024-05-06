import { theme } from 'antd';

export const theme_dark = Object.freeze({
    token: {
        borderRadius: 0,
        colorBgContainerDisabled: '#000000',
    },
    algorithm: theme.darkAlgorithm,
    components: {
        Select: {
            colorBorder: '#757575',
        },
        Button: {
            colorBorder: '#757575',
        },
        Pagination: {
            colorBorder: '#757575'
        },
        Input: {
            colorBorder: '#757575'
        },
        Result: {
            extraMargin: '14px 0 0 0',
            iconFontSize: 50,
            titleFontSize: 20
        },
        Statistic: {
            contentFontSize: 16,

        },
        Timeline: {
            itemPaddingBottom: 80,
        },
    }
});