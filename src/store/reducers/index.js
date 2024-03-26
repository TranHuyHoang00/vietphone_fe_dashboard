import { combineReducers } from 'redux';
import product_reducers from './product_reducers';
import variant_reducers from './variant_reducers';
import brand_reducers from './brand_reducers';
import tag_reducers from './tag_reducers';
import category_reducers from './category_reducers';
import variant_attribute_group_reducers from './variant_attribute_group_reducers';

export default combineReducers({
    product: product_reducers,
    variant: variant_reducers,
    brand: brand_reducers,
    tag: tag_reducers,
    category: category_reducers,
    variant_attribute_group: variant_attribute_group_reducers,

})