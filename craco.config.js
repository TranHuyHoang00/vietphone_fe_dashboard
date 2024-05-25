const path = require(`path`);
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@auths': path.resolve(__dirname, 'src/auths'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@actions': path.resolve(__dirname, 'src/stores/actions'),
            '@reducers': path.resolve(__dirname, 'src/stores/reducers'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@components': path.resolve(__dirname, 'src/apps/admins/components'),
            '@datas': path.resolve(__dirname, 'src/apps/admins/datas'),

        }
    },
};