import { combineReducers } from 'redux';
// WEBSITE
import brandReducers from '@reducers/website/brandReducers';
import tagReducers from '@reducers/website/tagReducers';
import categoryReducers from '@reducers/website/categoryReducers';
import categoryPostReducers from '@reducers/website/categoryPostReducers';
import postReducers from '@reducers/website/postReducers';
import groupAttributeReducers from '@reducers/website/groupAttributeReducers';
import variantAttributeGroupReducers from '@reducers/website/variantAttributeGroupReducers';
import attributeReducers from '@reducers/website/attributeReducers';
import attributeValueReducers from '@reducers/website/attributeValueReducers';
import locationReducers from '@reducers/website/locationReducers';
import bannerReducers from '@reducers/website/bannerReducers';
import repairReducers from '@reducers/website/repairReducers';
import warrantyReducers from '@reducers/website/warrantyReducers';
import flashSaleReducers from '@reducers/website/flashSaleReducers';
import promotionReducers from '@reducers/website/promotionReducers';
import productReducers from '@reducers/website/productReducers';
import flashSaleItemReducers from '@reducers/website/flashSaleItemReducers';
import productPageReducers from '@reducers/website/productPageReducers';
import mediaBaseReducers from '@reducers/website/mediaBaseReducers';
import variantReducers from '@reducers/website/variantReducers';
// SAPO
import productCategoryReducers from '@reducers/sapo/productCategoryReducers';
import shopReducers from '@reducers/sapo/shopReducers';
import staffReducers from '@reducers/sapo/staffReducers';
import orderReducers from '@reducers/sapo/orderReducers';
import customerReducers from '@reducers/sapo/customerReducers';
import staffRoleReducers from '@reducers/sapo/staffRoleReducers';

// TARGET
import targetProductCategoryReducers from '@reducers/target/targetProductCategoryReducers';
import targetShopReducers from '@reducers/target/targetShopReducers';
import targetStaffReducers from '@reducers/target/targetStaffReducers';
import reportTargetReducers from '@reducers/target/reportTargetReducers';
// SYSTEM
import taskReducers from '@reducers/system/taskReducers';
import groupReducers from '@reducers/system/groupReducers';
import userReducers from '@reducers/system/userReducers';
import permissionReducers from '@reducers/system/permissionReducers';
import loginReducers from '@reducers/system/loginReducers';
import darkModeReducers from '@reducers/system/darkModeReducers';
// STATISTICAL
import statisticalReducers from '@reducers/statistical/statisticalReducers';
export default combineReducers({
    // WEBSITE
    brand: brandReducers,
    tag: tagReducers,
    category: categoryReducers,
    categoryPost: categoryPostReducers,
    post: postReducers,
    groupAttribute: groupAttributeReducers,
    variantAttributeGroup: variantAttributeGroupReducers,
    attribute: attributeReducers,
    attributeValue: attributeValueReducers,
    location: locationReducers,
    banner: bannerReducers,
    repair: repairReducers,
    warranty: warrantyReducers,
    promotion: promotionReducers,
    flashSale: flashSaleReducers,
    flashSaleItem: flashSaleItemReducers,
    product: productReducers,
    productPage: productPageReducers,
    mediaBase: mediaBaseReducers,
    variant: variantReducers,
    // SAPO
    shop: shopReducers,
    productCategory: productCategoryReducers,
    staff: staffReducers,
    order: orderReducers,
    customer: customerReducers,
    staffRole: staffRoleReducers,
    // TARGET
    targetProductCategory: targetProductCategoryReducers,
    targetShop: targetShopReducers,
    targetStaff: targetStaffReducers,
    reportTarget: reportTargetReducers,
    // SYSTEM
    task: taskReducers,
    permission: permissionReducers,
    group: groupReducers,
    user: userReducers,
    login: loginReducers,
    darkMode: darkModeReducers,
    // STATISTICAL
    statistical: statisticalReducers,
})