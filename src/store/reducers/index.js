import { combineReducers } from 'redux';
import product_reducers from '@reducers/product_reducers';
import variant_reducers from '@reducers/variant_reducers';
import brand_reducers from '@reducers/brand_reducers';
import tag_reducers from '@reducers/tag_reducers';
import category_reducers from '@reducers/category_reducers';
import variant_attribute_group_reducers from '@reducers/variant_attribute_group_reducers';
import group_attribute_reducers from '@reducers/group_attribute_reducers';
import attribute_reducers from '@reducers/attribute_reducers';
import attribute_value_reducers from '@reducers/attribute_value_reducers';
import order_reducers from '@reducers/order_reducers';
import customer_reducers from '@reducers/customer_reducers';
import promotion_reducers from '@reducers/promotion_reducers';
import flash_sale_reducers from '@reducers/flash_sale_reducers';
import flash_sale_item_reducers from '@reducers/flash_sale_item_reducers';
import task_reducers from '@reducers/task_reducers';
import location_reducers from '@reducers/location_reducers';
import banner_reducers from '@reducers/banner_reducers';
import product_page_reducers from '@reducers/product_page_reducers';
import media_base_reducers from '@reducers/media_base_reducers';
import category_post_reducers from '@reducers/category_post_reducers';
import post_reducers from '@reducers/post_reducers';
import group_reducers from '@reducers/group_reducers';
import permission_reducers from '@reducers/permission_reducers';
import dark_mode_reducers from '@reducers/dark_mode_reducers';
import user_reducers from '@reducers/user_reducers';
export default combineReducers({
    product: product_reducers,
    customer: customer_reducers,
    variant: variant_reducers,
    brand: brand_reducers,
    tag: tag_reducers,
    order: order_reducers,
    category: category_reducers,
    group_attribute: group_attribute_reducers,
    attribute: attribute_reducers,
    attribute_value: attribute_value_reducers,
    variant_attribute_group: variant_attribute_group_reducers,
    promotion: promotion_reducers,
    flash_sale: flash_sale_reducers,
    flash_sale_item: flash_sale_item_reducers,
    task: task_reducers,
    location: location_reducers,
    banner: banner_reducers,
    product_page: product_page_reducers,
    media_base: media_base_reducers,
    category_post: category_post_reducers,
    post: post_reducers,
    group: group_reducers,
    permission: permission_reducers,
    dark_mode: dark_mode_reducers,
    user: user_reducers,
})