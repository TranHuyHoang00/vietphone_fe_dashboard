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
// COMPONENT
import HeaderDB from './layouts/header';
// PAGE
import LoginDB from './pages/login';
import Empty from './pages/empty';
// PAGE ERROR
import NotLogged from './pageErrors/notLogged';
import NotFound from './pageErrors/notFound';
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
import ManagerLocation from './managers/website/location/index';
import ManagerBanner from './managers/website/banner/index';
import ManagerWarranty from './managers/website/warranty/index';
import ManagerRepair from './managers/website/repair/index';
import ManagerFlashSale from './managers/website/flashSale/index';
import ManagerPromotion from './managers/website/promotion/index';
import EditPromotion from './managers/website/promotion/edit/index';
import ManagerProduct from './managers/website/product/index';
import ManagerProductRepair from './managers/website/productRepair/index';
import EditProduct from './managers/website/product/edit/index';
import ManagerFlashSaleItem from './managers/website/flashSaleItem/index';
// SAPO
import ManagerShop from './managers/sapo/shop/index';
import ManagerStaff from './managers/sapo/staff/index';
import ManagerProductCategory from './managers/sapo/productCategory/index';
import ManagerProductCategoryTarget from './managers/sapo/productCategoryTarget/index';
import ManagerCustomer from './managers/sapo/customer/index';
import ManagerOrder from './managers/sapo/order/index';
import ManagerStaffRole from './managers/sapo/staffRole/index';
// SYSTEM
import ManagerSyncData from './managers/system/syncData/index';
import ManagerTask from './managers/system/task/index';
import ManagerGroup from './managers/system/group/index';
import ManagerUser from './managers/system/user/index';
// TARGET
import SetTargetShop from './managers/target/set/shop/index';
import SetTargetStaff from './managers/target/set/staff/index';
import AchieveTargetShop from './managers/target/achieve/shop/index';
import AchieveTargetStaff from './managers/target/achieve/staff/index';
import DetailAchieveTargetShop from './managers/target/achieve/shop/detail/index';
import DetailAchieveTargetStaff from './managers/target/achieve/staff/detail/index';
// STATISTICAL
import StatisticalViewWeb from './managers/statistical/viewWeb/index';
import StatisticalViewProduct from './managers/statistical/viewProduct/index';

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
        if (dataCheckPermis) { this.setState({ dataCheckPermis: dataCheckPermis }); }
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
                if (filteredChildren.length > 0 || dataCheckPermis[item.title] || item.title === true) {
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
                                    {/* WEBSITE */}
                                    <Route exact path={`${url}manager/statistical/view_web`}><StatisticalViewWeb /></Route>
                                    <Route exact path={`${url}manager/statistical/view_product`}><StatisticalViewProduct /></Route>
                                    {dataCheckPermis['account.view_customer'] &&
                                        <Route exact path={`${url}manager/sapo/customer`}><ManagerCustomer /></Route>}

                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/website/product`}><ManagerProduct /></Route>}
                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/website/product_repair`}><ManagerProductRepair /></Route>}
                                    {dataCheckPermis['product.view_product'] &&
                                        <Route exact path={`${url}manager/website/product/edit/:id`}><EditProduct /></Route>}
                                    {dataCheckPermis['promotion.view_flashsaleitem'] &&
                                        <Route exact path={`${url}manager/website/flash_sale_item`}><ManagerFlashSaleItem /></Route>}
                                    {dataCheckPermis['product.view_promotioninfo'] &&
                                        <Route exact path={`${url}manager/website/promotion`}><ManagerPromotion /></Route>}
                                    {dataCheckPermis['product.view_promotioninfo'] &&
                                        <Route exact path={`${url}manager/website/promotion/edit/:id`}><EditPromotion /></Route>}
                                    {dataCheckPermis['product.view_warranty'] &&
                                        <Route exact path={`${url}manager/website/warranty`}><ManagerWarranty /></Route>}
                                    {dataCheckPermis['product.view_repair'] &&
                                        <Route exact path={`${url}manager/website/repair`}><ManagerRepair /></Route>}
                                    {dataCheckPermis['settings.view_banner'] &&
                                        <Route exact path={`${url}manager/website/banner`}><ManagerBanner /></Route>}
                                    {dataCheckPermis['settings.view_location'] &&
                                        <Route exact path={`${url}manager/website/location`}><ManagerLocation /></Route>}
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
                                        <Route exact path={`${url}manager/website/flash_sale`}><ManagerFlashSale /></Route>}
                                    {dataCheckPermis['post.view_post'] &&
                                        <Route exact path={`${url}manager/website/post`}><ManagerPost /></Route>}
                                    {dataCheckPermis['post.view_post'] &&
                                        <Route exact path={`${url}manager/website/post/edit/:id`}><EditPost /></Route>}
                                    {dataCheckPermis['post.view_category'] &&
                                        <Route exact path={`${url}manager/website/category_post`}><ManagerCategoryPost /></Route>}
                                    {/* SAPO */}
                                    {dataCheckPermis['product.view_sapoproductcategory'] &&
                                        <Route exact path={`${url}manager/sapo/product_category`}><ManagerProductCategory /></Route>}
                                    {dataCheckPermis['product.view_sapotargetproductcategory'] &&
                                        <Route exact path={`${url}manager/sapo/product_category_target`}><ManagerProductCategoryTarget /></Route>}
                                    {dataCheckPermis['shop.view_shop'] &&
                                        <Route exact path={`${url}manager/sapo/shop`}><ManagerShop /></Route>}
                                    {dataCheckPermis['account.view_staff'] &&
                                        <Route exact path={`${url}manager/sapo/staff`}><ManagerStaff /></Route>}
                                    {dataCheckPermis['account.view_staffrole'] &&
                                        <Route exact path={`${url}role/sapo/staff`}><ManagerStaffRole /></Route>}
                                    {dataCheckPermis['order.view_order'] &&
                                        <Route exact path={`${url}`}><ManagerOrder /></Route>}
                                    {/* TARGET */}
                                    {dataCheckPermis['analytic.view_shopmonthlytarget'] &&
                                        <Route exact path={`${url}set/target/shop`}><SetTargetShop /></Route>}
                                    {dataCheckPermis['analytic.view_staffmonthlytarget'] &&
                                        <Route exact path={`${url}set/target/staff`}><SetTargetStaff /></Route>}
                                    {dataCheckPermis['analytic.view_shopmonthlytarget'] &&
                                        <Route exact path={`${url}achieve/target/shop`}><AchieveTargetShop /></Route>}
                                    {dataCheckPermis['analytic.view_staffmonthlytarget'] &&
                                        <Route exact path={`${url}achieve/target/staff`}><AchieveTargetStaff /></Route>}

                                    {dataCheckPermis['analytic.view_shopmonthlytarget'] &&
                                        <Route exact path={`${url}achieve/target/shop/detail/:id`}><DetailAchieveTargetShop /></Route>}
                                    {dataCheckPermis['analytic.view_staffmonthlytarget'] &&
                                        <Route exact path={`${url}achieve/target/staff/detail/:id`}><DetailAchieveTargetStaff /></Route>}
                                    {/* SYSTEM */}
                                    {dataCheckPermis['account.view_user'] &&
                                        <Route Route exact path={`${url}manager/system/user`}><ManagerUser /></Route>}
                                    {dataCheckPermis['group.view_group'] &&
                                        <Route exact path={`${url}manager/system/group`}><ManagerGroup /></Route>}
                                    {dataCheckPermis['sync.view_sync'] &&
                                        <Route exact path={`${url}manager/system/sync_data`}><ManagerSyncData /></Route>}
                                    {dataCheckPermis['task.view_task'] &&
                                        <Route exact path={`${url}manager/system/task`}><ManagerTask /></Route>}
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
