import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Layout, Menu, Drawer } from 'antd';
import {
    AiFillGithub, AiOutlineUser, AiFillHdd, AiFillAndroid, AiFillShop, AiFillSwitcher
    , AiFillDropboxSquare, AiFillIdcard, AiFillSetting, AiFillTag, AiFillMobile,
    AiFillContainer, AiFillFileMarkdown, AiFillCrown, AiFillPayCircle,
    AiFillFire, AiFillUsb, AiFillRocket, AiFillControl, AiFillMoneyCollect
} from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { get_local_account } from '../../auths/local_storage';
import HeaderDB from './layouts/header';
import Login_DB from './pages/login';
import Not_logged from './pages_error/not_logged';
import Not_found from './pages_error/not_found';
import Empty from './pages/empty';

import Manager_customer from './managers/customer/index';
import Manager_brand from './managers/brand/index';
import Manager_category from './managers/category/index';
import Manager_tag from './managers/tag/index';
import Manager_order from './managers/order/index';
import Manager_group_attribute from './managers/group_attribute/index';
import Manager_attribute from './managers/attribute/index';
import Manager_attribute_value from './managers/attribute_value/index';
import Manager_product from './managers/product/index';
import Edit_product from './managers/product/pages/edit/index';
import Manager_variant_attribute_group from './managers/variant_attribute_group/index';
import Manager_sync_data from './managers/sync_data/index';
import Manager_flash_sale from './managers/flash_sale/index';
import Manager_flash_sale_item from './managers/flash_sale_item/index';
import Manager_task from './managers/task/index';
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
                key: 'specification', icon: <AiFillSetting Shop />, label: 'Thông số', children: [
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
                                    <Route exact path={`${url}manager/brand`}><Manager_brand /></Route>
                                    <Route exact path={`${url}manager/category`}><Manager_category /></Route>
                                    <Route exact path={`${url}manager/tag`}><Manager_tag /></Route>
                                    <Route exact path={`${url}`}><Manager_order /></Route>
                                    <Route exact path={`${url}manager/group_attribute`}><Manager_group_attribute /></Route>
                                    <Route exact path={`${url}manager/attribute_value`}><Manager_attribute_value /></Route>
                                    <Route exact path={`${url}manager/attribute`}><Manager_attribute /></Route>
                                    <Route exact path={`${url}manager/product`}><Manager_product /></Route>
                                    <Route exact path={`${url}manager/product/edit/:id`}><Edit_product /></Route>
                                    <Route exact path={`${url}manager/variant_attribute_group`}><Manager_variant_attribute_group /></Route>
                                    <Route exact path={`${url}manager/sync_data`}><Manager_sync_data /></Route>
                                    <Route exact path={`${url}manager/flash_sale`}><Manager_flash_sale /></Route>
                                    <Route exact path={`${url}manager/flash_sale_item`}><Manager_flash_sale_item /></Route>
                                    <Route exact path={`${url}manager/task`}><Manager_task /></Route>

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
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
