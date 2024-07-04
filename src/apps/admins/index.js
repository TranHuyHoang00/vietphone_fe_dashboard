import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Layout, Menu, Drawer } from 'antd';
import { withRouter } from 'react-router-dom';
import { getDataLocal } from '@auths/localStorage';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataPermiViews } from '@datas/dataPermissionsOrigin';
import { itemMenuLeftLayoutSider } from '@datas/dataMenu';
import HeaderDB from './layouts/header';
import LoginDB from './pages/login';
import NotLogged from './pages_error/not_logged';
import NotFound from './pages_error/not_found';
import Empty from './pages/empty';

import ManagerCustomer from './managers/customer/index';



import ManagerOrder from './managers/sapo/order/index';


import ManagerProduct from './managers/product/index';
import ManagerProductRepair from './managers/product_repair/index';
import EditProduct from './managers/product/edit/index';

import ManagerSyncData from './managers/sync_data/index';
import ManagerFlashSale from './managers/flash_sale/index';
import ManagerFlashSaleItem from './managers/flash_sale_item/index';
import ManagerTask from './managers/task/index';
import ManagerLocation from './managers/location/index';
import ManagerBanner from './managers/banner/index';


import ManagerGroup from './managers/group/index';
import ManagerUser from './managers/user/index';
import ManagerPromotion from './managers/promotion/index';
import EditPromotion from './managers/promotion/edit/index';
import ManagerWarranty from './managers/warranty/index';
import ManagerRepair from './managers/repair/index';

// WEBSITE
import ManagerBrand from './managers/website/brand/index';
import ManagerTag from './managers/website/tag/index';
import ManagerCategory from './managers/website/category/index';
import ManagerCategoryPost from './managers/website/categoryPost/index';
import ManagerPost from './managers/website/post/index';
import EditPost from './managers/website/post/edit/index';
import ManagerVariantAttributeGroup from './managers/website/variantAttributeGroup/index';
import ManagerGroupAttribute from './managers/website/groupAttribute/index';
import ManagerAttribute from './managers/website/attribute/index';
import ManagerAttributeValue from './managers/website/attributeValue/index';
// SAPO
import ManagerShop from './managers/sapo/shop/index';
import ManagerStaff from './managers/sapo/staff/index';
import ManagerProductCategory from './managers/sapo/productCategory/index';

// import ManagerComment from './managers/comment/index';
import SetTargetShop from './managers/target/set/shop/index';
// import SetOverviewTarget from './managers/target/set/overview/index';
// import AchieveIndividualTarget from './managers/target/achieve/individual/index';
import AchieveOverviewTarget from './managers/target/achieve/overview/index';


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
    handleMenuWithPermis = (menuItems) => {
        const { dataCheckPermis } = this.state;
        const filterItems = (items) => {
            return items.map(item => {
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                const filteredChildren = hasChildren ? filterItems(item.children) : false;
                if (filteredChildren.length > 0 || dataCheckPermis[item.title]) {
                    return { ...item, children: filteredChildren };
                }
                return null;
            }).filter(item => item !== null);
        };
        return filterItems(menuItems);
    };
    render() {
        const { dataCheckPermis, url, collapsed, drawerMenu } = this.state;
        const { loggedIn } = this.props;
        return (
            <>
                {loggedIn ?
                    <Layout hasSider style={{ minHeight: '100vh', }} >
                        <Layout.Sider theme='dark' className='overflow-y-auto h-screen md:block hidden'
                            collapsible collapsed={collapsed} breakpoint="lg" width={250}
                            onCollapse={() => this.setCollapsed()}>
                            <Menu theme='dark' mode="inline" items={this.handleMenuWithPermis(itemMenuLeftLayoutSider)} defaultSelectedKeys={['manager']}
                                onClick={(value) => this.onClickPage(value)} />
                        </Layout.Sider>
                        <Drawer title="Menu" placement={'left'} width={250} className='md:hidden block'
                            onClose={() => this.closeDrawerMenu()}
                            open={drawerMenu}>
                            <Menu className='border p-[5px] shadow-sm rounded-[5px]'
                                theme="light" mode="inline" items={this.handleMenuWithPermis(itemMenuLeftLayoutSider)} defaultSelectedKeys={['manager']}
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



                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/product`}><ManagerProduct /></Route>}

                                    {/* {dataCheckPermis['product.view_comment'] &&
                                        <Route exact path={`${url}manager/comment`}><ManagerComment /></Route>} */}

                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/product_repair`}><ManagerProductRepair /></Route>}

                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/product/edit/:id`}><EditProduct /></Route>}

                                    {dataCheckPermis['promotion.view_flashsaleitem'] &&
                                        <Route exact path={`${url}manager/flash_sale_item`}><ManagerFlashSaleItem /></Route>}

                                    {dataCheckPermis['product.view_promotioninfo'] &&
                                        <Route exact path={`${url}manager/promotion`}><ManagerPromotion /></Route>}
                                    {dataCheckPermis['product.view_promotioninfo'] &&
                                        <Route exact path={`${url}manager/promotion/edit/:id`}><EditPromotion /></Route>}

                                    {dataCheckPermis['product.view_warranty'] &&
                                        <Route exact path={`${url}manager/warranty`}><ManagerWarranty /></Route>}
                                    {dataCheckPermis['product.view_repair'] &&
                                        <Route exact path={`${url}manager/repair`}><ManagerRepair /></Route>}

                                    {dataCheckPermis['settings.view_banner'] &&
                                        <Route exact path={`${url}manager/banner`}><ManagerBanner /></Route>}
                                    {dataCheckPermis['settings.view_location'] &&
                                        <Route exact path={`${url}manager/location`}><ManagerLocation /></Route>}

                                    {dataCheckPermis['product.view_attributevalue'] &&
                                        <Route exact path={`${url}manager/website/attribute_value`}><ManagerAttributeValue /></Route>}
                                    {dataCheckPermis['product.view_attribute'] &&
                                        <Route exact path={`${url}manager/website/attribute`}><ManagerAttribute /></Route>}
                                    {dataCheckPermis['product.view_groupattribute'] &&
                                        <Route exact path={`${url}manager/website/group_attribute`}><ManagerGroupAttribute /></Route>}
                                    {dataCheckPermis['product.view_variantattributegroup'] &&
                                        <Route exact path={`${url}manager/website/variant_attribute_group`}><ManagerVariantAttributeGroup /></Route>}

                                    {dataCheckPermis['product.view_tag'] &&
                                        <Route exact path={`${url}manager/website/tag`}><ManagerTag /></Route>}
                                    {dataCheckPermis['product.view_brand'] &&
                                        <Route exact path={`${url}manager/website/brand`}><ManagerBrand /></Route>}
                                    {dataCheckPermis['product.view_category'] &&
                                        <Route exact path={`${url}manager/website/category`}><ManagerCategory /></Route>}
                                    {dataCheckPermis['promotion.view_flashsale'] &&
                                        <Route exact path={`${url}manager/flash_sale`}><ManagerFlashSale /></Route>}



                                    {dataCheckPermis['post.view_post'] &&
                                        <Route exact path={`${url}manager/website/post`}><ManagerPost /></Route>}
                                    {dataCheckPermis['post.view_post'] &&
                                        <Route exact path={`${url}manager/website/post/edit/:id`}><EditPost /></Route>}

                                    {dataCheckPermis['post.view_category'] &&
                                        <Route exact path={`${url}manager/website/category_post`}><ManagerCategoryPost /></Route>}

                                    {dataCheckPermis['analytic.view_shopmonthlytarget'] &&
                                        <Route exact path={`${url}set/target/shop`}><SetTargetShop /></Route>}


                                    {dataCheckPermis['product.view_sapoproductcategory'] &&
                                        <Route exact path={`${url}manager/sapo/product_category`}><ManagerProductCategory /></Route>}
                                    {dataCheckPermis['shop.view_shop'] &&
                                        <Route exact path={`${url}manager/sapo/shop`}><ManagerShop /></Route>}
                                    {dataCheckPermis['account.view_staff'] &&
                                        <Route exact path={`${url}manager/sapo/staff`}><ManagerStaff /></Route>}
                                    {dataCheckPermis['order.view_order'] &&
                                        <Route exact path={`${url}`}><ManagerOrder /></Route>}


                                    {/* <Route exact path={`${url}set/target/overview`}><SetOverviewTarget /></Route>
                                    <Route exact path={`${url}achieve/target/individual`}><AchieveIndividualTarget /></Route> */}
                                    <Route exact path={`${url}achieve/target/overview`}><AchieveOverviewTarget /></Route>


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
