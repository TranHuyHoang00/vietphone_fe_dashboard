import { combineReducers } from 'redux';
import productReducers from '@reducers/product_reducers';
import variantReducers from '@reducers/variant_reducers';




import customerReducers from '@reducers/customer_reducers';

import flashSaleItemReducers from '@reducers/flash_sale_item_reducers';
import taskReducers from '@reducers/task_reducers';
import productPageReducers from '@reducers/product_page_reducers';
import mediaBaseReducers from '@reducers/media_base_reducers';


import groupReducers from '@reducers/group_reducers';
import permissionReducers from '@reducers/permission_reducers';
import darkModeReducers from '@reducers/dark_mode_reducers';
import userReducers from '@reducers/user_reducers';
import statisticalReducers from '@reducers/statistical_reducers';
import loginReducers from '@reducers/login_reducers';

import addressReducers from '@reducers/address_reducers';

import commentReducers from '@reducers/comment_reducers';
import targetReducers from '@reducers/target_reducers';

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

// SAPO
import productCategoryReducers from '@reducers/sapo/productCategoryReducers';
import shopReducers from '@reducers/sapo/shopReducers';
import staffReducers from '@reducers/sapo/staffReducers';
import orderReducers from '@reducers/sapo/orderReducers';

// TARGET
import targetProductCategoryReducers from '@reducers/targets/targetProductCategoryReducers';
import targetShopReducers from '@reducers/targets/targetShopReducers';

export default combineReducers({
    product: productReducers,
    customer: customerReducers,
    variant: variantReducers,
    flash_sale: flashSaleReducers,
    flash_sale_item: flashSaleItemReducers,
    task: taskReducers,
    product_page: productPageReducers,
    media_base: mediaBaseReducers,
    group: groupReducers,
    permission: permissionReducers,
    darkMode: darkModeReducers,
    user: userReducers,
    statistical: statisticalReducers,
    login: loginReducers,
    address: addressReducers,
    comment: commentReducers,
    target: targetReducers,

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

    // SAPO
    shop: shopReducers,
    productCategory: productCategoryReducers,
    staff: staffReducers,
    order: orderReducers,
    // TARGET
    targetProductCategory: targetProductCategoryReducers,
    targetShop: targetShopReducers,
})