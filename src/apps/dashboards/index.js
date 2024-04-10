import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { Layout, Menu, Drawer } from 'antd';
import {
    AiFillGithub, AiOutlineUser, AiFillHdd, AiFillAndroid, AiFillShop, AiFillSwitcher, AiFillBehanceSquare
    , AiFillDropboxSquare, AiFillIdcard, AiFillSetting, AiFillTag, AiFillMobile, AiFillDashboard, AiOutlineFundView,
    AiFillContainer, AiFillFileMarkdown, AiFillCrown, AiFillPayCircle, AiFillProject,
    AiFillFire, AiFillUsb, AiFillRocket, AiFillControl, AiFillMoneyCollect, AiFillEnvironment
} from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { get_local_account } from '../../auths/local_storage';
import HeaderDB from './layouts/header';
import LoginDB from './pages/login';
import NotLogged from './pages_error/not_logged';
import NotFound from './pages_error/not_found';
import Empty from './pages/empty';

import ManagerCustomer from './managers/customer/index';
import ManagerBrand from './managers/brand/index';
import ManagerCategory from './managers/category/index';
import ManagerTag from './managers/tag/index';
import ManagerOrder from './managers/order/index';
import ManagerGroupAttribute from './managers/group_attribute/index';
import ManagerAttribute from './managers/attribute/index';
import ManagerAttributeValue from './managers/attribute_value/index';
import ManagerProduct from './managers/product/index';
import EditProduct from './managers/product/pages/edit/index';
import ManagerVariantAttributeGroup from './managers/variant_attribute_group/index';
import ManagerSyncData from './managers/sync_data/index';
import ManagerFlashSale from './managers/flash_sale/index';
import ManagerFlashSaleItem from './managers/flash_sale_item/index';
import ManagerTask from './managers/task/index';
import ManagerLocation from './managers/location/index';
import ManagerBanner from './managers/banner/index';

import StatisticalWeb from './statisticals/web/index';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            url: '/admin/',
            value: {},
            logged_in_db: false,
            is_form_drawer: false,
        }
    }
    async componentDidMount() {
        let data_db = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        if (data_db) {
            this.setState({ logged_in_db: true })
        }
    }
    setCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    onClickPage = (value) => {
        this.props.history.push(`/admin/${value.key}`);
    }
    handle_login_db = () => {
        this.setState({ logged_in_db: true });
    }
    handle_logout_db = () => {
        this.setState({ logged_in_db: false });
    }
    open_drawer_form = () => {
        this.setState({ is_form_drawer: true })
    }
    close_DrawerForm = () => {
        this.setState({ is_form_drawer: false })
    }
    render() {
        const items = [
            // {
            //     key: 'statistical', icon: <AiFillDashboard />, label: 'Dashboard', children: [
            //         { key: 'statistical/web', icon: <AiOutlineFundView />, label: 'Website' },
            //     ],
            // },
            {
                key: 'user_role', icon: <AiFillGithub />, label: 'Người dùng', children: [
                    { key: 'manager/customer', icon: <AiOutlineUser />, label: 'Khách hàng' },
                ],
            },
            {
                key: 'order', icon: <AiFillContainer />, label: 'Đơn đặt', children: [
                    { key: '', icon: <AiFillFileMarkdown />, label: 'Đơn hàng' },
                ],
            },
            {
                key: 'store', icon: <AiFillShop />, label: 'Cửa hàng', children: [
                    { key: 'manager/product', icon: <AiFillMobile />, label: 'Sản phẩm' },
                    { key: 'manager/flash_sale_item', icon: <AiFillPayCircle />, label: 'Flash sale' },
                ],
            },
            {
                key: 'advertisement', icon: <AiFillProject />, label: 'Quảng cáo', children: [
                    { key: 'manager/banner', icon: <AiFillBehanceSquare />, label: 'Băng rôn' },
                    { key: 'manager/location', icon: <AiFillEnvironment />, label: 'Vị trí' },
                ],
            },
            {
                key: 'specification', icon: <AiFillSetting />, label: 'Thông số', children: [
                    { key: 'manager/attribute_value', icon: <AiFillRocket />, label: 'Giá trị' },
                    { key: 'manager/attribute', icon: <AiFillUsb />, label: 'Thông số' },
                    { key: 'manager/group_attribute', icon: <AiFillFire />, label: 'Loại thông số' },
                    { key: 'manager/variant_attribute_group', icon: <AiFillCrown />, label: 'Loại TS-SP' },
                ],
            },
            {
                key: 'brand_category', icon: <AiFillHdd />, label: 'Danh mục', children: [
                    { key: 'manager/tag', icon: <AiFillTag />, label: 'Tag' },
                    { key: 'manager/brand', icon: <AiFillIdcard />, label: 'Thương hiệu' },
                    { key: 'manager/category', icon: <AiFillDropboxSquare />, label: 'Danh mục' },
                    { key: 'manager/flash_sale', icon: <AiFillMoneyCollect />, label: 'Flash_sale' },

                ],
            },
            {
                key: 'system', icon: <AiFillAndroid />, label: 'Hệ thống', children: [
                    { key: 'manager/sync_data', icon: <AiFillControl />, label: 'Đồng bộ' },
                    { key: 'manager/task', icon: <AiFillSwitcher />, label: 'Lịch sử' },
                ],
            },
        ];
        let url = this.state.url;
        let logged_in_db = this.state.logged_in_db;
        return (

            <>
                {logged_in_db === true ?
                    <Layout hasSider style={{ minHeight: '100vh', }} >
                        <Layout.Sider className='overflow-y-auto h-screen md:block hidden'
                            collapsible collapsed={this.state.collapsed} breakpoint="lg"
                            onCollapse={() => this.setCollapsed()}>
                            <Menu theme="dark" mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Layout.Sider>
                        <Drawer title="Menu" placement={'left'} width={250} className='md:hidden block'
                            onClose={() => this.close_DrawerForm()}
                            open={this.state.is_form_drawer}>
                            <Menu className='border p-[5px] shadow-sm rounded-[5px]'
                                theme="light" mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Drawer>
                        <Layout className='overflow-auto h-screen'>
                            <Layout.Header className='sticky top-0 z-50 border-b shadow-sm bg-white'>
                                <HeaderDB open_drawer_form={this.open_drawer_form} handle_logout_db={this.handle_logout_db} />
                            </Layout.Header>
                            <Layout.Content className='py-[10px]'>
                                <Switch>

                                    <Route exact path={`${url}login`}><Empty /></Route>
                                    <Route exact path={`${url}manager/customer`}><ManagerCustomer /></Route>
                                    <Route exact path={`${url}manager/brand`}><ManagerBrand /></Route>
                                    <Route exact path={`${url}manager/category`}><ManagerCategory /></Route>
                                    <Route exact path={`${url}manager/tag`}><ManagerTag /></Route>
                                    <Route exact path={`${url}`}><ManagerOrder /></Route>
                                    <Route exact path={`${url}manager/group_attribute`}><ManagerGroupAttribute /></Route>
                                    <Route exact path={`${url}manager/attribute_value`}><ManagerAttributeValue /></Route>
                                    <Route exact path={`${url}manager/attribute`}><ManagerAttribute /></Route>
                                    <Route exact path={`${url}manager/product`}><ManagerProduct /></Route>
                                    <Route exact path={`${url}manager/product/edit/:id`}><EditProduct /></Route>
                                    <Route exact path={`${url}manager/variant_attribute_group`}><ManagerVariantAttributeGroup /></Route>
                                    <Route exact path={`${url}manager/sync_data`}><ManagerSyncData /></Route>
                                    <Route exact path={`${url}manager/flash_sale`}><ManagerFlashSale /></Route>
                                    <Route exact path={`${url}manager/flash_sale_item`}><ManagerFlashSaleItem /></Route>
                                    <Route exact path={`${url}manager/task`}><ManagerTask /></Route>
                                    <Route exact path={`${url}manager/location`}><ManagerLocation /></Route>
                                    <Route exact path={`${url}manager/banner`}><ManagerBanner /></Route>

                                    {/* <Route exact path={`${url}statistical/web`}><StatisticalWeb /></Route> */}
                                    <Route ><NotFound /></Route>


                                </Switch>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                    :
                    <>
                        <Switch>
                            <Route exact path={`${url}`}><NotLogged /></Route>
                            <Route exact path={`${url}login`}>
                                <LoginDB handle_login_db={this.handle_login_db} />
                            </Route>
                            <Route ><NotFound /></Route>
                        </Switch>
                    </>
                }
            </>
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
