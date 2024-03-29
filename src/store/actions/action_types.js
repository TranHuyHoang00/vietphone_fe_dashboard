const action_types = Object.freeze({

    // PRODUCT
    PRODUCT_START: 'PRODUCT_START',
    PRODUCT_FAIDED: 'PRODUCT_FAIDED',
    PRODUCT_SUCCESS: 'PRODUCT_SUCCESS',

    GET_LIST_PRODUCT_SUCCESS: 'GET_LIST_PRODUCT_SUCCESS',
    GET_PRODUCT_SUCCESS: 'GET_PRODUCT_SUCCESS',
    CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
    DELETE_LIST_PRODUCT_SUCCESS: 'DELETE_LIST_PRODUCT_SUCCESS',
    EDIT_PRODUCT_SUCCESS: 'EDIT_PRODUCT_SUCCESS',
    EDIT_LIST_PRODUCT_SUCCESS: 'EDIT_LIST_PRODUCT_SUCCESS',
    ON_CHANGE_PRODUCT: 'ON_CHANGE_PRODUCT',
    SET_DATA_PRODUCT: 'SET_DATA_PRODUCT',
    CLICK_EDIT_PRODUCT: 'CLICK_EDIT_PRODUCT',
    SET_DATA_FILTER_PRODUCT: 'SET_DATA_FILTER_PRODUCT',

    // VARIANT
    VARIANT_START: 'VARIANT_START',
    VARIANT_FAIDED: 'VARIANT_FAIDED',
    VARIANT_SUCCESS: 'VARIANT_SUCCESS',

    GET_LIST_VARIANT_SUCCESS: 'GET_LIST_VARIANT_SUCCESS',
    GET_VARIANT_SUCCESS: 'GET_VARIANT_SUCCESS',
    CREATE_VARIANT_SUCCESS: 'CREATE_VARIANT_SUCCESS',
    DELETE_LIST_VARIANT_SUCCESS: 'DELETE_LIST_VARIANT_SUCCESS',
    EDIT_VARIANT_SUCCESS: 'EDIT_VARIANT_SUCCESS',
    EDIT_LIST_VARIANT_SUCCESS: 'EDIT_LIST_VARIANT_SUCCESS',
    ON_CHANGE_VARIANT: 'ON_CHANGE_VARIANT',
    SET_DATA_VARIANT: 'SET_DATA_VARIANT',
    CLICK_EDIT_VARIANT: 'CLICK_EDIT_VARIANT',

    // BRAND
    BRAND_START: 'BRAND_START',
    BRAND_FAIDED: 'BRAND_FAIDED',
    BRAND_SUCCESS: 'BRAND_SUCCESS',

    GET_LIST_BRAND_SUCCESS: 'GET_LIST_BRAND_SUCCESS',
    GET_BRAND_SUCCESS: 'GET_BRAND_SUCCESS',
    CREATE_BRAND_SUCCESS: 'CREATE_BRAND_SUCCESS',
    DELETE_LIST_BRAND_SUCCESS: 'DELETE_LIST_BRAND_SUCCESS',
    EDIT_BRAND_SUCCESS: 'EDIT_BRAND_SUCCESS',
    EDIT_LIST_BRAND_SUCCESS: 'EDIT_LIST_BRAND_SUCCESS',
    ON_CHANGE_BRAND: 'ON_CHANGE_BRAND',
    SET_DATA_BRAND: 'SET_DATA_BRAND',

    // TAG
    TAG_START: 'TAG_START',
    TAG_FAIDED: 'TAG_FAIDED',
    TAG_SUCCESS: 'TAG_SUCCESS',

    GET_LIST_TAG_SUCCESS: 'GET_LIST_TAG_SUCCESS',
    GET_TAG_SUCCESS: 'GET_TAG_SUCCESS',
    CREATE_TAG_SUCCESS: 'CREATE_TAG_SUCCESS',
    DELETE_LIST_TAG_SUCCESS: 'DELETE_LIST_TAG_SUCCESS',
    EDIT_TAG_SUCCESS: 'EDIT_TAG_SUCCESS',
    EDIT_LIST_TAG_SUCCESS: 'EDIT_LIST_TAG_SUCCESS',
    ON_CHANGE_TAG: 'ON_CHANGE_TAG',
    SET_DATA_TAG: 'SET_DATA_TAG',

    // CATEGORY
    CATEGORY_START: 'CATEGORY_START',
    CATEGORY_FAIDED: 'CATEGORY_FAIDED',
    CATEGORY_SUCCESS: 'CATEGORY_SUCCESS',

    GET_LIST_CATEGORY_SUCCESS: 'GET_LIST_CATEGORY_SUCCESS',
    GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
    CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
    DELETE_LIST_CATEGORY_SUCCESS: 'DELETE_LIST_CATEGORY_SUCCESS',
    EDIT_CATEGORY_SUCCESS: 'EDIT_CATEGORY_SUCCESS',
    EDIT_LIST_CATEGORY_SUCCESS: 'EDIT_LIST_CATEGORY_SUCCESS',
    ON_CHANGE_CATEGORY: 'ON_CHANGE_CATEGORY',
    SET_DATA_CATEGORY: 'SET_DATA_CATEGORY',

    // VARIANT_ATTRIBUTE_GROUP
    VARIANT_ATTRIBUTE_GROUP_START: 'VARIANT_ATTRIBUTE_GROUP_START',
    VARIANT_ATTRIBUTE_GROUP_FAIDED: 'VARIANT_ATTRIBUTE_GROUP_FAIDED',
    VARIANT_ATTRIBUTE_GROUP_SUCCESS: 'VARIANT_ATTRIBUTE_GROUP_SUCCESS',

    GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS: 'GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS',
    GET_VARIANT_ATTRIBUTE_GROUP_SUCCESS: 'GET_VARIANT_ATTRIBUTE_GROUP_SUCCESS',
    CREATE_VARIANT_ATTRIBUTE_GROUP_SUCCESS: 'CREATE_VARIANT_ATTRIBUTE_GROUP_SUCCESS',
    DELETE_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS: 'DELETE_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS',
    EDIT_VARIANT_ATTRIBUTE_GROUP_SUCCESS: 'EDIT_VARIANT_ATTRIBUTE_GROUP_SUCCESS',
    EDIT_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS: 'EDIT_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS',
    ON_CHANGE_VARIANT_ATTRIBUTE_GROUP: 'ON_CHANGE_VARIANT_ATTRIBUTE_GROUP',
    SET_DATA_VARIANT_ATTRIBUTE_GROUP: 'SET_DATA_VARIANT_ATTRIBUTE_GROUP',

    // GROUP_ATTRIBUTE
    GROUP_ATTRIBUTE_START: 'GROUP_ATTRIBUTE_START',
    GROUP_ATTRIBUTE_FAIDED: 'GROUP_ATTRIBUTE_FAIDED',
    GROUP_ATTRIBUTE_SUCCESS: 'GROUP_ATTRIBUTE_SUCCESS',

    GET_LIST_GROUP_ATTRIBUTE_SUCCESS: 'GET_LIST_GROUP_ATTRIBUTE_SUCCESS',
    GET_GROUP_ATTRIBUTE_SUCCESS: 'GET_GROUP_ATTRIBUTE_SUCCESS',
    CREATE_GROUP_ATTRIBUTE_SUCCESS: 'CREATE_GROUP_ATTRIBUTE_SUCCESS',
    DELETE_LIST_GROUP_ATTRIBUTE_SUCCESS: 'DELETE_LIST_GROUP_ATTRIBUTE_SUCCESS',
    EDIT_GROUP_ATTRIBUTE_SUCCESS: 'EDIT_GROUP_ATTRIBUTE_SUCCESS',
    EDIT_LIST_GROUP_ATTRIBUTE_SUCCESS: 'EDIT_LIST_GROUP_ATTRIBUTE_SUCCESS',
    ON_CHANGE_GROUP_ATTRIBUTE: 'ON_CHANGE_GROUP_ATTRIBUTE',
    SET_DATA_GROUP_ATTRIBUTE: 'SET_DATA_GROUP_ATTRIBUTE',

    // ATTRIBUTE
    ATTRIBUTE_START: 'ATTRIBUTE_START',
    ATTRIBUTE_FAIDED: 'ATTRIBUTE_FAIDED',
    ATTRIBUTE_SUCCESS: 'ATTRIBUTE_SUCCESS',

    GET_LIST_ATTRIBUTE_SUCCESS: 'GET_LIST_ATTRIBUTE_SUCCESS',
    GET_ATTRIBUTE_SUCCESS: 'GET_ATTRIBUTE_SUCCESS',
    CREATE_ATTRIBUTE_SUCCESS: 'CREATE_ATTRIBUTE_SUCCESS',
    DELETE_LIST_ATTRIBUTE_SUCCESS: 'DELETE_LIST_ATTRIBUTE_SUCCESS',
    EDIT_ATTRIBUTE_SUCCESS: 'EDIT_ATTRIBUTE_SUCCESS',
    EDIT_LIST_ATTRIBUTE_SUCCESS: 'EDIT_LIST_ATTRIBUTE_SUCCESS',
    ON_CHANGE_ATTRIBUTE: 'ON_CHANGE_ATTRIBUTE',
    SET_DATA_ATTRIBUTE: 'SET_DATA_ATTRIBUTE',

    // ATTRIBUTE_VALUE
    ATTRIBUTE_VALUE_START: 'ATTRIBUTE_VALUE_START',
    ATTRIBUTE_VALUE_FAIDED: 'ATTRIBUTE_VALUE_FAIDED',
    ATTRIBUTE_VALUE_SUCCESS: 'ATTRIBUTE_VALUE_SUCCESS',

    GET_LIST_ATTRIBUTE_VALUE_SUCCESS: 'GET_LIST_ATTRIBUTE_VALUE_SUCCESS',
    GET_ATTRIBUTE_VALUE_SUCCESS: 'GET_ATTRIBUTE_VALUE_SUCCESS',
    CREATE_ATTRIBUTE_VALUE_SUCCESS: 'CREATE_ATTRIBUTE_VALUE_SUCCESS',
    DELETE_LIST_ATTRIBUTE_VALUE_SUCCESS: 'DELETE_LIST_ATTRIBUTE_VALUE_SUCCESS',
    EDIT_ATTRIBUTE_VALUE_SUCCESS: 'EDIT_ATTRIBUTE_VALUE_SUCCESS',
    EDIT_LIST_ATTRIBUTE_VALUE_SUCCESS: 'EDIT_LIST_ATTRIBUTE_VALUE_SUCCESS',
    ON_CHANGE_ATTRIBUTE_VALUE: 'ON_CHANGE_ATTRIBUTE_VALUE',
    SET_DATA_ATTRIBUTE_VALUE: 'SET_DATA_ATTRIBUTE_VALUE',

    // ORDER
    ORDER_START: 'ORDER_START',
    ORDER_FAIDED: 'ORDER_FAIDED',
    ORDER_SUCCESS: 'ORDER_SUCCESS',

    GET_LIST_ORDER_SUCCESS: 'GET_LIST_ORDER_SUCCESS',
    GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS',
    CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
    DELETE_LIST_ORDER_SUCCESS: 'DELETE_LIST_ORDER_SUCCESS',
    EDIT_ORDER_SUCCESS: 'EDIT_ORDER_SUCCESS',
    EDIT_LIST_ORDER_SUCCESS: 'EDIT_LIST_ORDER_SUCCESS',
    ON_CHANGE_ORDER: 'ON_CHANGE_ORDER',
    SET_DATA_ORDER: 'SET_DATA_ORDER',

    // CUSTOMER
    CUSTOMER_START: 'CUSTOMER_START',
    CUSTOMER_FAIDED: 'CUSTOMER_FAIDED',
    CUSTOMER_SUCCESS: 'CUSTOMER_SUCCESS',

    GET_LIST_CUSTOMER_SUCCESS: 'GET_LIST_CUSTOMER_SUCCESS',
    GET_CUSTOMER_SUCCESS: 'GET_CUSTOMER_SUCCESS',
    CREATE_CUSTOMER_SUCCESS: 'CREATE_CUSTOMER_SUCCESS',
    DELETE_LIST_CUSTOMER_SUCCESS: 'DELETE_LIST_CUSTOMER_SUCCESS',
    EDIT_CUSTOMER_SUCCESS: 'EDIT_CUSTOMER_SUCCESS',
    EDIT_LIST_CUSTOMER_SUCCESS: 'EDIT_LIST_CUSTOMER_SUCCESS',
    ON_CHANGE_CUSTOMER: 'ON_CHANGE_CUSTOMER',
    SET_DATA_CUSTOMER: 'SET_DATA_CUSTOMER',
})

export default action_types;