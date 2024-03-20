import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Layout, Menu, Drawer } from 'antd';
import {
    AiFillGithub, AiOutlineUser, AiFillGold, AiFillHdd, AiFillFund, AiOutlineUserSwitch, AiFillShop
    , AiFillDropboxSquare, AiFillIdcard, AiFillSliders, AiFillTag, AiFillStar, AiFillAlert, AiFillMobile,
    AiFillBuild, AiFillSecurityScan, AiFillLayout, AiFillContainer, AiFillFileMarkdown, AiFillPicture, AiFillAndroid, AiFillDashboard
} from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { get_local_account } from '../../auths/local_storage';
import HeaderDB from './layouts/header';
import Login_DB from './pages/login';
import Not_logged from './pages_error/not_logged';
import Not_found from './pages_error/not_found';
import Empty from './pages/empty';

import Manager_customer from './managers/customer/index';
import Manager_staff from './managers/staff/index';
import Manager_category_type from './managers/category_type/index';
import Manager_brand from './managers/brand/index';
import Manager_category from './managers/category/index';
import Manager_tag from './managers/tag/index';
import Manager_rating from './managers/rating/index';
import Manager_location from './managers/location/index';
import Manager_banner from './managers/banner/index';
import Manager_order from './managers/order/index';
import Manager_overview_banner from './managers/overview_banner/index';

import Manager_product from './managers/product/index';
import Edit_product from './managers/product/pages/edit';
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
        this.props.history.push(`/admin/${value.key}?page=1&limit=5&search_query=`)
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
            {
                key: 'user_role', icon: <AiFillGithub />, label: 'Người dùng', children: [
                    { key: 'manager/customer', icon: <AiOutlineUser />, label: 'Khách hàng' },
                    { key: 'manager/staff', icon: <AiOutlineUserSwitch />, label: 'Nhân viên' },
                    { key: 'manager/role', icon: <AiFillGold />, label: 'Quyền hạn' },
                ],
            },
            {
                key: 'order', icon: <AiFillContainer />, label: 'Đơn đặt', children: [
                    { key: '', icon: <AiFillFileMarkdown />, label: 'Đơn hàng' },
                ],
            },
            {
                key: 'comment_rating', icon: <AiFillAlert />, label: 'Phản hổi', children: [
                    { key: 'manager/rating', icon: <AiFillStar />, label: 'Đánh giá' },
                ],
            },
            {
                key: 'store', icon: <AiFillShop />, label: 'Cửa hàng', children: [
                    { key: 'manager/product', icon: <AiFillMobile />, label: 'Sản phẩm' },
                ],
            },
            {
                key: 'brand_category', icon: <AiFillHdd />, label: 'Danh mục', children: [
                    { key: 'manager/tag', icon: <AiFillTag />, label: 'Tag' },
                    { key: 'manager/brand', icon: <AiFillIdcard />, label: 'Thương hiệu' },
                    { key: 'manager/category', icon: <AiFillDropboxSquare />, label: 'Danh mục' },
                    { key: 'manager/category_type', icon: <AiFillFund />, label: 'Loại danh mục' },
                ],
            },
            {
                key: 'banner', icon: <AiFillBuild />, label: 'Quảng cáo', children: [
                    { key: 'manager/overview_banner', icon: <AiFillLayout />, label: 'Tổng quan' },
                    { key: 'manager/banner', icon: <AiFillPicture />, label: 'Băng rôn' },
                    { key: 'manager/location', icon: <AiFillSecurityScan />, label: 'Vị trí' },
                ],
            },
            {
                key: 'statistic', icon: <AiFillDashboard />, label: 'Thống kê', children: [
                    { key: 'statistic/analysis', icon: <AiFillAndroid />, label: 'Số liệu' },
                ],
            },
        ];
        let url = this.state.url;
        let logged_in_db = this.state.logged_in_db;
        return (

            <>
                {logged_in_db == true ?
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
                                    <Route exact path={`${url}manager/customer`}><Manager_customer /></Route>
                                    <Route exact path={`${url}manager/staff`}><Manager_staff /></Route>
                                    <Route exact path={`${url}manager/category_type`}><Manager_category_type /></Route>
                                    <Route exact path={`${url}manager/brand`}><Manager_brand /></Route>
                                    <Route exact path={`${url}manager/category`}><Manager_category /></Route>
                                    <Route exact path={`${url}manager/tag`}><Manager_tag /></Route>
                                    <Route exact path={`${url}manager/rating`}><Manager_rating /></Route>
                                    <Route exact path={`${url}manager/location`}><Manager_location /></Route>
                                    <Route exact path={`${url}manager/banner`}><Manager_banner /></Route>
                                    <Route exact path={`${url}`}><Manager_order /></Route>
                                    <Route exact path={`${url}manager/overview_banner`}><Manager_overview_banner /></Route>

                                    <Route exact path={`${url}manager/product`}><Manager_product /></Route>
                                    <Route exact path={`${url}manager/product/edit/:id`}><Edit_product /></Route>
                                    <Route ><Not_found /></Route>


                                </Switch>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                    :
                    <>
                        <Switch>
                            <Route exact path={`${url}`}><Not_logged /></Route>
                            <Route exact path={`${url}login`}>
                                <Login_DB handle_login_db={this.handle_login_db} />
                            </Route>
                            <Route ><Not_found /></Route>
                        </Switch>
                    </>
                }
            </>
        );
    }

}
export default withRouter(index);
