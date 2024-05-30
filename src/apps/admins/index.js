import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Layout, Menu, Drawer } from 'antd';
import {
    AiOutlineUser, AiFillHdd, AiFillAndroid, AiFillShop, AiFillSwitcher, AiFillBehanceSquare
    , AiFillDropboxSquare, AiFillIdcard, AiFillSetting, AiFillTag, AiFillMobile, AiFillBook, AiFillBuild,
    AiFillContainer, AiFillFileMarkdown, AiFillCrown, AiFillPayCircle, AiFillProject, AiOutlineBook, AiOutlineUserSwitch,
    AiFillFire, AiFillUsb, AiFillRocket, AiFillControl, AiFillMoneyCollect, AiFillEnvironment, AiFillRobot, AiFillDashboard
} from "react-icons/ai";
import { IoStatsChart, IoLogoChrome, IoBarChartSharp, IoBookSharp } from "react-icons/io5";
import { FaUserNurse, FaAndroid, FaUserShield } from "react-icons/fa6";

import { withRouter } from 'react-router-dom';
import { getDataLocal } from '@auths/localStorage';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataPermiViews } from '@datas/dataPermissionsOrigin';
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
import EditProduct from './managers/product/edit/index';
import ManagerVariantAttributeGroup from './managers/variant_attribute_group/index';
import ManagerSyncData from './managers/sync_data/index';
import ManagerFlashSale from './managers/flash_sale/index';
import ManagerFlashSaleItem from './managers/flash_sale_item/index';
import ManagerTask from './managers/task/index';
import ManagerLocation from './managers/location/index';
import ManagerBanner from './managers/banner/index';
import ManagerCategoryPost from './managers/category_post/index';
import ManagerPost from './managers/post/index';
import ManagerGroup from './managers/group/index';
import ManagerUser from './managers/user/index';

import StatisticalViewWeb from './managers/statisticals/web/view_web/index';
import StatisticalViewProduct from './managers/statisticals/web/view_product/index';

import StaffRollCall from './managers/system_staff/roll_call/index';
import HistoryRollCall from './managers/system_staff/history/index';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            url: '/admin/',
            value: {},
            drawerMenu: false,
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const dataAccount = await getDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        const { setLogin, getListUserPermission } = this.props;
        if (dataAccount) {
            setLogin(true);
            await getListUserPermission();
            await this.checkPermis();
        }
    }
    checkPermis = async () => {
        const { dataUserPermis, isSuperUser } = this.props;
        const dataCheckPermis = await handleCheckPermis(dataPermiViews, dataUserPermis, isSuperUser);
        this.setState({ dataCheckPermis: dataCheckPermis, });
    }
    setCollapsed = () => {
        const { collapsed } = this.state;
        this.setState({ collapsed: !collapsed })
    }
    onClickPage = (value) => {
        this.props.history.push(`/admin/${value.key}`);
    }

    openDrawerMenu = () => {
        this.setState({ drawerMenu: true })
    }
    closeDrawerMenu = () => {
        this.setState({ drawerMenu: false })
    }
    render() {
        const { dataCheckPermis, url, collapsed, drawerMenu } = this.state;
        const { loggedIn } = this.props;
        console.log();
        const items = [
            {
                key: 'menu_dashboard', icon: <AiFillDashboard />, label: 'Dashboard', children: [
                    {
                        key: 'website', icon: <IoLogoChrome />, label: 'Website', type: 'group', children: [
                            {
                                key: 'statistical/view_web', icon: <IoStatsChart />, label: 'Lượt truy cập',
                            },
                            {
                                key: 'statistical/view_product', icon: <IoBarChartSharp />, label: 'Lượt xem sản phẩm',
                            },
                        ]
                    },
                ],
            },
            {
                key: 'menu_system_staff', icon: <FaUserNurse />, label: 'Nhân viên', children: [
                    {
                        key: 'system_staff/roll_call', icon: <FaAndroid />, label: 'Chấm công',
                    },
                    {
                        key: 'system_staff/history', icon: <IoBookSharp />, label: 'Lịch sử',
                    },
                ],
            },
            {
                key: 'menu_user', icon: <FaUserShield />, label: 'Người dùng', children: [
                    {
                        key: 'manager/customer', icon: <AiOutlineUser />, label: 'Khách hàng',
                        disabled: !dataCheckPermis['account.view_customer']
                    },
                    {
                        key: 'manager/user', icon: <AiOutlineUserSwitch />, label: 'Tài khoản',
                        disabled: !dataCheckPermis['account.view_user']
                    },
                    {
                        key: 'manager/group', icon: <AiFillRobot />, label: 'Phân quyền',
                        disabled: !dataCheckPermis['group.view_group']
                    },
                ],
            },
            {
                key: 'menu_order', icon: <AiFillContainer />, label: 'Đơn đặt', children: [
                    {
                        key: '', icon: <AiFillFileMarkdown />, label: 'Đơn hàng',
                        disabled: !dataCheckPermis['order.view_order']
                    },
                ],
            },
            {
                key: 'menu_product', icon: <AiFillShop />, label: 'Cửa hàng', children: [
                    {
                        key: 'manager/product', icon: <AiFillMobile />, label: 'Sản phẩm',
                        disabled: !dataCheckPermis['product.view_product']
                    },
                    {
                        key: 'manager/flash_sale_item', icon: <AiFillPayCircle />, label: 'Flash sale',
                        disabled: !dataCheckPermis['promotion.view_flashsaleitem']
                    },
                ],
            },
            {
                key: 'advertisement', icon: <AiFillProject />, label: 'Quảng cáo', children: [
                    {
                        key: 'manager/banner', icon: <AiFillBehanceSquare />, label: 'Băng rôn',
                        disabled: !dataCheckPermis['settings.view_banner']
                    },
                    {
                        key: 'manager/location', icon: <AiFillEnvironment />, label: 'Vị trí',
                        disabled: !dataCheckPermis['settings.view_location']
                    },
                ],
            },
            {
                key: 'menu_specification', icon: <AiFillSetting />, label: 'Thông số', children: [
                    {
                        key: 'manager/attribute_value', icon: <AiFillRocket />, label: 'Giá trị',
                        disabled: !dataCheckPermis['product.view_attributevalue']
                    },
                    {
                        key: 'manager/attribute', icon: <AiFillUsb />, label: 'Thông số',
                        disabled: !dataCheckPermis['product.view_attribute']
                    },
                    {
                        key: 'manager/group_attribute', icon: <AiFillFire />, label: 'Loại thông số',
                        disabled: !dataCheckPermis['product.view_groupattribute']
                    },
                    {
                        key: 'manager/variant_attribute_group', icon: <AiFillCrown />, label: 'Loại TS-SP',
                        disabled: !dataCheckPermis['product.view_variantattributegroup']
                    },
                ],
            },
            {
                key: 'menu_category', icon: <AiFillHdd />, label: 'Danh mục', children: [
                    {
                        key: 'manager/tag', icon: <AiFillTag />, label: 'Tag',
                        disabled: !dataCheckPermis['product.view_tag']
                    },
                    {
                        key: 'manager/brand', icon: <AiFillIdcard />, label: 'Thương hiệu',
                        disabled: !dataCheckPermis['product.view_brand']
                    },
                    {
                        key: 'manager/category', icon: <AiFillDropboxSquare />, label: 'Danh mục',
                        disabled: !dataCheckPermis['product.view_category']
                    },
                    {
                        key: 'manager/flash_sale', icon: <AiFillMoneyCollect />, label: 'Flash_sale',
                        disabled: !dataCheckPermis['promotion.view_flashsale']
                    },

                ],
            },
            {
                key: 'menu_post', icon: <AiFillBook />, label: 'Bài đăng', children: [
                    {
                        key: 'manager/post', icon: <AiOutlineBook />, label: 'Bài viết',
                        disabled: !dataCheckPermis['post.view_post']
                    },
                    {
                        key: 'manager/category_post', icon: <AiFillBuild />, label: 'Loại bài viết',
                        disabled: !dataCheckPermis['post.view_category']
                    },
                ],
            },
            {
                key: 'menu_system', icon: <AiFillAndroid />, label: 'Hệ thống', children: [
                    {
                        key: 'manager/sync_data', icon: <AiFillControl />, label: 'Đồng bộ',
                        disabled: !dataCheckPermis['sync.view_sync']
                    },
                    {
                        key: 'manager/task', icon: <AiFillSwitcher />, label: 'Lịch sử',
                        disabled: !dataCheckPermis['task.view_task']
                    },
                ],
            },
        ];
        return (

            <>
                {loggedIn ?
                    <Layout hasSider style={{ minHeight: '100vh', }} >
                        <Layout.Sider theme='dark' className='overflow-y-auto h-screen md:block hidden'
                            collapsible collapsed={collapsed} breakpoint="lg"
                            onCollapse={() => this.setCollapsed()}>
                            <Menu theme='dark' mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Layout.Sider>
                        <Drawer title="Menu" placement={'left'} width={250} className='md:hidden block'
                            onClose={() => this.closeDrawerMenu()}
                            open={drawerMenu}>
                            <Menu className='border p-[5px] shadow-sm rounded-[5px]'
                                theme="light" mode="inline" items={items} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Drawer>
                        <Layout className='overflow-auto h-screen'>
                            <HeaderDB openDrawerMenu={this.openDrawerMenu} />
                            <Layout.Content className='py-[10px]'>
                                <Switch>
                                    <Route exact path={`${url}statistical/view_web`}><StatisticalViewWeb /></Route>
                                    <Route exact path={`${url}statistical/view_product`}><StatisticalViewProduct /></Route>

                                    <Route exact path={`${url}system_staff/roll_call`}><StaffRollCall /></Route>
                                    <Route exact path={`${url}system_staff/history`}><HistoryRollCall /></Route>

                                    {dataCheckPermis['account.view_customer'] &&
                                        <Route exact path={`${url}manager/customer`}><ManagerCustomer /></Route>}
                                    {dataCheckPermis['account.view_user'] &&
                                        <Route Route exact path={`${url}manager/user`}><ManagerUser /></Route>}
                                    {dataCheckPermis['group.view_group'] &&
                                        <Route exact path={`${url}manager/group`}><ManagerGroup /></Route>}

                                    {dataCheckPermis['order.view_order'] &&
                                        <Route exact path={`${url}`}><ManagerOrder /></Route>}

                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/product`}><ManagerProduct /></Route>}
                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/product/edit/:id`}><EditProduct /></Route>}
                                    {dataCheckPermis['promotion.view_flashsaleitem'] &&
                                        <Route exact path={`${url}manager/flash_sale_item`}><ManagerFlashSaleItem /></Route>}


                                    {dataCheckPermis['settings.view_banner'] &&
                                        <Route exact path={`${url}manager/banner`}><ManagerBanner /></Route>}
                                    {dataCheckPermis['settings.view_location'] &&
                                        <Route exact path={`${url}manager/location`}><ManagerLocation /></Route>}

                                    {dataCheckPermis['product.view_attributevalue'] &&
                                        <Route exact path={`${url}manager/attribute_value`}><ManagerAttributeValue /></Route>}
                                    {dataCheckPermis['product.view_attribute'] &&
                                        <Route exact path={`${url}manager/attribute`}><ManagerAttribute /></Route>}
                                    {dataCheckPermis['product.view_groupattribute'] &&
                                        <Route exact path={`${url}manager/group_attribute`}><ManagerGroupAttribute /></Route>}
                                    {dataCheckPermis['product.view_variantattributegroup'] &&
                                        <Route exact path={`${url}manager/variant_attribute_group`}><ManagerVariantAttributeGroup /></Route>}

                                    {dataCheckPermis['product.view_tag'] &&
                                        <Route exact path={`${url}manager/tag`}><ManagerTag /></Route>}
                                    {dataCheckPermis['product.view_brand'] &&
                                        <Route exact path={`${url}manager/brand`}><ManagerBrand /></Route>}
                                    {dataCheckPermis['product.view_category'] &&
                                        <Route exact path={`${url}manager/category`}><ManagerCategory /></Route>}
                                    {dataCheckPermis['promotion.view_flashsale'] &&
                                        <Route exact path={`${url}manager/flash_sale`}><ManagerFlashSale /></Route>}

                                    {dataCheckPermis['post.view_post'] &&
                                        <Route exact path={`${url}manager/post`}><ManagerPost /></Route>}
                                    {dataCheckPermis['post.view_category'] &&
                                        <Route exact path={`${url}manager/category_post`}><ManagerCategoryPost /></Route>}
                                    {dataCheckPermis['sync.view_sync'] &&
                                        <Route exact path={`${url}manager/sync_data`}><ManagerSyncData /></Route>}
                                    {dataCheckPermis['task.view_task'] &&
                                        <Route exact path={`${url}manager/task`}><ManagerTask /></Route>}



                                    <Route exact path={`${url}login`}><Empty /></Route>
                                    <Route ><NotFound /></Route>
                                </Switch>
                            </Layout.Content>
                        </Layout>
                    </Layout >
                    :
                    <>
                        <Switch>
                            <Route exact path={`${url}`}><NotLogged /></Route>
                            <Route exact path={`${url}login`}>
                                <LoginDB />
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
        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
        loggedIn: state.login.loggedIn,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListUserPermission: (dataFilter) => dispatch(actions.getListUserPermissionRedux(dataFilter)),
        setLogin: (data) => dispatch(actions.setLoginRedux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
