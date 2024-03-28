import { combineReducers } from 'redux';
import product_reducers from './product_reducers';
import variant_reducers from './variant_reducers';
import brand_reducers from './brand_reducers';
import tag_reducers from './tag_reducers';
import category_reducers from './category_reducers';
import variant_attribute_group_reducers from './variant_attribute_group_reducers';
import group_attribute_reducers from './group_attribute_reducers';
import attribute_reducers from './attribute_reducers';
import attribute_value_reducers from './attribute_value_reducers';
import order_reducers from './order_reducers';
import customer_reducers from './customer_reducers';
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

})