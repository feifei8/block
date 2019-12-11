export default {
    routes: [
        {
            path: '/',
            component: 'index',
            routes: [
                {
                    name: 'list',
                    path: '/list',
                    component: './pages/list/customerList',
                }
            ],
        },
    ],
    plugins: [
        ['umi-plugin-block-dev', {

        }],
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true,
                dynamicImport: false,
                title: 'deer',
                dll: true,
                routes: {
                    exclude: [
                        /models\//,
                        /services\//,
                        /model\.(t|j)sx?$/,
                        /service\.(t|j)sx?$/,
                        /components\//,
                    ],
                },
                locale: false,
            },
        ],
    ],
    proxy: {
        '/gateway': {
            target: 'https://itapiway.yonyou.com/',
            pathRewrite: { '^/api': '' },
            changeOrigin: true,
        },
    }
}
