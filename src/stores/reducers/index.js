import { combineReducers } from 'redux';
import productReducers from '@reducers/product_reducers';
import variantReducers from '@reducers/variant_reducers';
import brandReducers from '@reducers/brand_reducers';
import tagReducers from '@reducers/tag_reducers';
import categoryReducers from '@reducers/category_reducers';
import variantAttributeGroupReducers from '@reducers/variant_attribute_group_reducers';
import groupAttributeReducers from '@reducers/group_attribute_reducers';
import attributeReducers from '@reducers/attribute_reducers';
import attributeValueReducers from '@reducers/attribute_value_reducers';
import orderReducers from '@reducers/order_reducers';
import customerReducers from '@reducers/customer_reducers';
import flashSaleReducers from '@reducers/flash_sale_reducers';
import flashSaleItemReducers from '@reducers/flash_sale_item_reducers';
import taskReducers from '@reducers/task_reducers';
import locationReducers from '@reducers/location_reducers';
import bannerReducers from '@reducers/banner_reducers';
import productPageReducers from '@reducers/product_page_reducers';
import mediaBaseReducers from '@reducers/media_base_reducers';
import categoryPostReducers from '@reducers/category_post_reducers';
import postReducers from '@reducers/post_reducers';
import groupReducers from '@reducers/group_reducers';
import permissionReducers from '@reducers/permission_reducers';
import darkModeReducers from '@reducers/dark_mode_reducers';
import userReducers from '@reducers/user_reducers';
import statisticalReducers from '@reducers/statistical_reducers';
import loginReducers from '@reducers/login_reducers';
export default combineReducers({
    product: productReducers,
    customer: customerReducers,
    variant: variantReducers,
    brand: brandReducers,
    tag: tagReducers,
    order: orderReducers,
    category: categoryReducers,
    group_attribute: groupAttributeReducers,
    attribute: attributeReducers,
    attribute_value: attributeValueReducers,
    variant_attribute_group: variantAttributeGroupReducers,
    flash_sale: flashSaleReducers,
    flash_sale_item: flashSaleItemReducers,
    task: taskReducers,
    location: locationReducers,
    banner: bannerReducers,
    product_page: productPageReducers,
    media_base: mediaBaseReducers,
    category_post: categoryPostReducers,
    post: postReducers,
    group: groupReducers,
    permission: permissionReducers,
    darkMode: darkModeReducers,
    user: userReducers,
    statistical: statisticalReducers,
    login: loginReducers,
})