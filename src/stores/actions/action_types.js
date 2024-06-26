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
    ON_CHANGE_PRODUCT_DESCRIPTION: 'ON_CHANGE_PRODUCT_DESCRIPTION',
    SET_DATA_PRODUCT: 'SET_DATA_PRODUCT',
    CLICK_EDIT_PRODUCT: 'CLICK_EDIT_PRODUCT',
    SET_DATA_FILTER_PRODUCT: 'SET_DATA_FILTER_PRODUCT',
    SET_DATA_FILTER_PRODUCT_REPAIR: 'SET_DATA_FILTER_PRODUCT_REPAIR',
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
    SET_DATA_FILTER_VARIANT: 'SET_DATA_FILTER_VARIANT',


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

    // USER
    USER_START: 'USER_START',
    USER_FAIDED: 'USER_FAIDED',
    USER_SUCCESS: 'USER_SUCCESS',

    GET_LIST_USER_SUCCESS: 'GET_LIST_USER_SUCCESS',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    DELETE_LIST_USER_SUCCESS: 'DELETE_LIST_USER_SUCCESS',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_LIST_USER_SUCCESS: 'EDIT_LIST_USER_SUCCESS',
    ON_CHANGE_USER: 'ON_CHANGE_USER',
    SET_DATA_USER: 'SET_DATA_USER',

    GET_LIST_USER_PERMISSION_SUCCESS: 'GET_LIST_USER_PERMISSION_SUCCESS',
    SET_IS_SUPERUSER: 'SET_IS_SUPERUSER',

    // FLASH_SALE
    FLASH_SALE_START: 'FLASH_SALE_START',
    FLASH_SALE_FAIDED: 'FLASH_SALE_FAIDED',
    FLASH_SALE_SUCCESS: 'FLASH_SALE_SUCCESS',

    GET_LIST_FLASH_SALE_SUCCESS: 'GET_LIST_FLASH_SALE_SUCCESS',
    GET_FLASH_SALE_SUCCESS: 'GET_FLASH_SALE_SUCCESS',
    CREATE_FLASH_SALE_SUCCESS: 'CREATE_FLASH_SALE_SUCCESS',
    DELETE_LIST_FLASH_SALE_SUCCESS: 'DELETE_LIST_FLASH_SALE_SUCCESS',
    EDIT_FLASH_SALE_SUCCESS: 'EDIT_FLASH_SALE_SUCCESS',
    EDIT_LIST_FLASH_SALE_SUCCESS: 'EDIT_LIST_FLASH_SALE_SUCCESS',
    ON_CHANGE_FLASH_SALE: 'ON_CHANGE_FLASH_SALE',
    SET_DATA_FLASH_SALE: 'SET_DATA_FLASH_SALE',

    // FLASH_SALE_ITEM
    FLASH_SALE_ITEM_START: 'FLASH_SALE_ITEM_START',
    FLASH_SALE_ITEM_FAIDED: 'FLASH_SALE_ITEM_FAIDED',
    FLASH_SALE_ITEM_SUCCESS: 'FLASH_SALE_ITEM_SUCCESS',

    GET_LIST_FLASH_SALE_ITEM_SUCCESS: 'GET_LIST_FLASH_SALE_ITEM_SUCCESS',
    GET_FLASH_SALE_ITEM_SUCCESS: 'GET_FLASH_SALE_ITEM_SUCCESS',
    CREATE_FLASH_SALE_ITEM_SUCCESS: 'CREATE_FLASH_SALE_ITEM_SUCCESS',
    DELETE_LIST_FLASH_SALE_ITEM_SUCCESS: 'DELETE_LIST_FLASH_SALE_ITEM_SUCCESS',
    CREATE_LIST_FLASH_SALE_ITEM_SUCCESS: 'CREATE_LIST_FLASH_SALE_ITEM_SUCCESS',
    EDIT_FLASH_SALE_ITEM_SUCCESS: 'EDIT_FLASH_SALE_ITEM_SUCCESS',
    EDIT_LIST_FLASH_SALE_ITEM_SUCCESS: 'EDIT_LIST_FLASH_SALE_ITEM_SUCCESS',
    ON_CHANGE_FLASH_SALE_ITEM: 'ON_CHANGE_FLASH_SALE_ITEM',
    SET_DATA_FLASH_SALE_ITEM: 'SET_DATA_FLASH_SALE_ITEM',

    // TASK
    TASK_START: 'TASK_START',
    TASK_FAIDED: 'TASK_FAIDED',
    TASK_SUCCESS: 'TASK_SUCCESS',

    GET_LIST_TASK_SUCCESS: 'GET_LIST_TASK_SUCCESS',
    GET_TASK_SUCCESS: 'GET_TASK_SUCCESS',
    CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
    DELETE_LIST_TASK_SUCCESS: 'DELETE_LIST_TASK_SUCCESS',
    EDIT_TASK_SUCCESS: 'EDIT_TASK_SUCCESS',
    EDIT_LIST_TASK_SUCCESS: 'EDIT_LIST_TASK_SUCCESS',
    ON_CHANGE_TASK: 'ON_CHANGE_TASK',
    SET_DATA_TASK: 'SET_DATA_TASK',

    // LOCATION
    LOCATION_START: 'LOCATION_START',
    LOCATION_FAIDED: 'LOCATION_FAIDED',
    LOCATION_SUCCESS: 'LOCATION_SUCCESS',

    GET_LIST_LOCATION_SUCCESS: 'GET_LIST_LOCATION_SUCCESS',
    GET_LOCATION_SUCCESS: 'GET_LOCATION_SUCCESS',
    CREATE_LOCATION_SUCCESS: 'CREATE_LOCATION_SUCCESS',
    DELETE_LIST_LOCATION_SUCCESS: 'DELETE_LIST_LOCATION_SUCCESS',
    EDIT_LOCATION_SUCCESS: 'EDIT_LOCATION_SUCCESS',
    EDIT_LIST_LOCATION_SUCCESS: 'EDIT_LIST_LOCATION_SUCCESS',
    ON_CHANGE_LOCATION: 'ON_CHANGE_LOCATION',
    SET_DATA_LOCATION: 'SET_DATA_LOCATION',

    // BANNER
    BANNER_START: 'BANNER_START',
    BANNER_FAIDED: 'BANNER_FAIDED',
    BANNER_SUCCESS: 'BANNER_SUCCESS',

    GET_LIST_BANNER_SUCCESS: 'GET_LIST_BANNER_SUCCESS',
    GET_BANNER_SUCCESS: 'GET_BANNER_SUCCESS',
    CREATE_BANNER_SUCCESS: 'CREATE_BANNER_SUCCESS',
    DELETE_LIST_BANNER_SUCCESS: 'DELETE_LIST_BANNER_SUCCESS',
    EDIT_BANNER_SUCCESS: 'EDIT_BANNER_SUCCESS',
    EDIT_LIST_BANNER_SUCCESS: 'EDIT_LIST_BANNER_SUCCESS',
    ON_CHANGE_BANNER: 'ON_CHANGE_BANNER',
    SET_DATA_BANNER: 'SET_DATA_BANNER',

    // PRODUCT_PAGE
    PRODUCT_PAGE_START: 'PRODUCT_PAGE_START',
    PRODUCT_PAGE_FAIDED: 'PRODUCT_PAGE_FAIDED',
    PRODUCT_PAGE_SUCCESS: 'PRODUCT_PAGE_SUCCESS',

    GET_LIST_PRODUCT_PAGE_SUCCESS: 'GET_LIST_PRODUCT_PAGE_SUCCESS',
    GET_PRODUCT_PAGE_SUCCESS: 'GET_PRODUCT_PAGE_SUCCESS',
    CREATE_PRODUCT_PAGE_SUCCESS: 'CREATE_PRODUCT_PAGE_SUCCESS',
    DELETE_LIST_PRODUCT_PAGE_SUCCESS: 'DELETE_LIST_PRODUCT_PAGE_SUCCESS',
    EDIT_PRODUCT_PAGE_SUCCESS: 'EDIT_PRODUCT_PAGE_SUCCESS',
    EDIT_LIST_PRODUCT_PAGE_SUCCESS: 'EDIT_LIST_PRODUCT_PAGE_SUCCESS',
    ON_CHANGE_PRODUCT_PAGE: 'ON_CHANGE_PRODUCT_PAGE',
    SET_DATA_PRODUCT_PAGE: 'SET_DATA_PRODUCT_PAGE',

    // MEIDA_BASE
    MEIDA_BASE_START: 'MEIDA_BASE_START',
    MEIDA_BASE_FAIDED: 'MEIDA_BASE_FAIDED',
    MEIDA_BASE_SUCCESS: 'MEIDA_BASE_SUCCESS',

    GET_LIST_MEIDA_BASE_SUCCESS: 'GET_LIST_MEIDA_BASE_SUCCESS',
    GET_MEIDA_BASE_SUCCESS: 'GET_MEIDA_BASE_SUCCESS',
    CREATE_MEIDA_BASE_SUCCESS: 'CREATE_MEIDA_BASE_SUCCESS',
    DELETE_LIST_MEIDA_BASE_SUCCESS: 'DELETE_LIST_MEIDA_BASE_SUCCESS',
    EDIT_MEIDA_BASE_SUCCESS: 'EDIT_MEIDA_BASE_SUCCESS',
    EDIT_LIST_MEIDA_BASE_SUCCESS: 'EDIT_LIST_MEIDA_BASE_SUCCESS',
    ON_CHANGE_MEIDA_BASE: 'ON_CHANGE_MEIDA_BASE',
    SET_DATA_MEIDA_BASE: 'SET_DATA_MEIDA_BASE',

    // CATEGORY_POST
    CATEGORY_POST_START: 'CATEGORY_POST_START',
    CATEGORY_POST_FAIDED: 'CATEGORY_POST_FAIDED',
    CATEGORY_POST_SUCCESS: 'CATEGORY_POST_SUCCESS',

    GET_LIST_CATEGORY_POST_SUCCESS: 'GET_LIST_CATEGORY_POST_SUCCESS',
    GET_CATEGORY_POST_SUCCESS: 'GET_CATEGORY_POST_SUCCESS',
    CREATE_CATEGORY_POST_SUCCESS: 'CREATE_CATEGORY_POST_SUCCESS',
    DELETE_LIST_CATEGORY_POST_SUCCESS: 'DELETE_LIST_CATEGORY_POST_SUCCESS',
    EDIT_CATEGORY_POST_SUCCESS: 'EDIT_CATEGORY_POST_SUCCESS',
    EDIT_LIST_CATEGORY_POST_SUCCESS: 'EDIT_LIST_CATEGORY_POST_SUCCESS',
    ON_CHANGE_CATEGORY_POST: 'ON_CHANGE_CATEGORY_POST',
    SET_DATA_CATEGORY_POST: 'SET_DATA_CATEGORY_POST',

    // POST
    POST_START: 'POST_START',
    POST_FAIDED: 'POST_FAIDED',
    POST_SUCCESS: 'POST_SUCCESS',

    GET_LIST_POST_SUCCESS: 'GET_LIST_POST_SUCCESS',
    GET_POST_SUCCESS: 'GET_POST_SUCCESS',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    DELETE_LIST_POST_SUCCESS: 'DELETE_LIST_POST_SUCCESS',
    EDIT_POST_SUCCESS: 'EDIT_POST_SUCCESS',
    EDIT_LIST_POST_SUCCESS: 'EDIT_LIST_POST_SUCCESS',
    ON_CHANGE_POST: 'ON_CHANGE_POST',
    SET_DATA_POST: 'SET_DATA_POST',

    // GROUP
    GROUP_START: 'GROUP_START',
    GROUP_FAIDED: 'GROUP_FAIDED',
    GROUP_SUCCESS: 'GROUP_SUCCESS',

    GET_LIST_GROUP_SUCCESS: 'GET_LIST_GROUP_SUCCESS',
    GET_GROUP_SUCCESS: 'GET_GROUP_SUCCESS',
    CREATE_GROUP_SUCCESS: 'CREATE_GROUP_SUCCESS',
    DELETE_LIST_GROUP_SUCCESS: 'DELETE_LIST_GROUP_SUCCESS',
    EDIT_GROUP_SUCCESS: 'EDIT_GROUP_SUCCESS',
    EDIT_LIST_GROUP_SUCCESS: 'EDIT_LIST_GROUP_SUCCESS',
    ON_CHANGE_GROUP: 'ON_CHANGE_GROUP',
    SET_DATA_GROUP: 'SET_DATA_GROUP',

    // PERMISSION
    PERMISSION_START: 'PERMISSION_START',
    PERMISSION_FAIDED: 'PERMISSION_FAIDED',
    PERMISSION_SUCCESS: 'PERMISSION_SUCCESS',

    GET_LIST_PERMISSION_SUCCESS: 'GET_LIST_PERMISSION_SUCCESS',

    // DARK MODE
    SET_DARK_MODE: 'SET_DARK_MODE',

    // LOGIN
    SET_LOGIN: 'SET_LOGIN',

    // STATISTICAL
    STATISTICAL_START: 'STATISTICAL_START',
    STATISTICAL_FAIDED: 'STATISTICAL_FAIDED',
    STATISTICAL_SUCCESS: 'STATISTICAL_SUCCESS',
    GET_VIEW_WEB_SUCCESS: 'GET_VIEW_WEB_SUCCESS',
    GET_VIEW_PRODUCT_SUCCESS: 'GET_VIEW_PRODUCT_SUCCESS',
    ON_CHANGE_STATISTICAL: 'ON_CHANGE_STATISTICAL',
    SET_STATISTICAL: 'SET_STATISTICAL',

    // PROMOTION
    PROMOTION_START: 'PROMOTION_START',
    PROMOTION_FAIDED: 'PROMOTION_FAIDED',
    PROMOTION_SUCCESS: 'PROMOTION_SUCCESS',

    GET_LIST_PROMOTION_SUCCESS: 'GET_LIST_PROMOTION_SUCCESS',
    GET_PROMOTION_SUCCESS: 'GET_PROMOTION_SUCCESS',
    CREATE_PROMOTION_SUCCESS: 'CREATE_PROMOTION_SUCCESS',
    DELETE_LIST_PROMOTION_SUCCESS: 'DELETE_LIST_PROMOTION_SUCCESS',
    EDIT_PROMOTION_SUCCESS: 'EDIT_PROMOTION_SUCCESS',
    EDIT_LIST_PROMOTION_SUCCESS: 'EDIT_LIST_PROMOTION_SUCCESS',
    ON_CHANGE_PROMOTION: 'ON_CHANGE_PROMOTION',
    SET_DATA_PROMOTION: 'SET_DATA_PROMOTION',

    // WARRANTY
    WARRANTY_START: 'WARRANTY_START',
    WARRANTY_FAIDED: 'WARRANTY_FAIDED',
    WARRANTY_SUCCESS: 'WARRANTY_SUCCESS',

    GET_LIST_WARRANTY_SUCCESS: 'GET_LIST_WARRANTY_SUCCESS',
    GET_WARRANTY_SUCCESS: 'GET_WARRANTY_SUCCESS',
    CREATE_WARRANTY_SUCCESS: 'CREATE_WARRANTY_SUCCESS',
    DELETE_LIST_WARRANTY_SUCCESS: 'DELETE_LIST_WARRANTY_SUCCESS',
    EDIT_WARRANTY_SUCCESS: 'EDIT_WARRANTY_SUCCESS',
    EDIT_LIST_WARRANTY_SUCCESS: 'EDIT_LIST_WARRANTY_SUCCESS',
    ON_CHANGE_WARRANTY: 'ON_CHANGE_WARRANTY',
    SET_DATA_WARRANTY: 'SET_DATA_WARRANTY',

    // REPAIR
    REPAIR_START: 'REPAIR_START',
    REPAIR_FAIDED: 'REPAIR_FAIDED',
    REPAIR_SUCCESS: 'REPAIR_SUCCESS',

    GET_LIST_REPAIR_SUCCESS: 'GET_LIST_REPAIR_SUCCESS',
    GET_REPAIR_SUCCESS: 'GET_REPAIR_SUCCESS',
    CREATE_REPAIR_SUCCESS: 'CREATE_REPAIR_SUCCESS',
    DELETE_LIST_REPAIR_SUCCESS: 'DELETE_LIST_REPAIR_SUCCESS',
    EDIT_REPAIR_SUCCESS: 'EDIT_REPAIR_SUCCESS',
    EDIT_LIST_REPAIR_SUCCESS: 'EDIT_LIST_REPAIR_SUCCESS',
    ON_CHANGE_REPAIR: 'ON_CHANGE_REPAIR',
    SET_DATA_REPAIR: 'SET_DATA_REPAIR',

    // ADDRESS
    ADDRESS_START: 'ADDRESS_START',
    ADDRESS_FAIDED: 'ADDRESS_FAIDED',
    ADDRESS_SUCCESS: 'ADDRESS_SUCCESS',

    GET_LIST_PROVINCE_SUCCESS: 'GET_LIST_PROVINCE_SUCCESS',
    GET_PROVINCE_SUCCESS: 'GET_PROVINCE_SUCCESS',
    SET_DATA_PROVINCE: 'SET_DATA_PROVINCE',

    GET_LIST_DISTRICT_SUCCESS: 'GET_LIST_DISTRICT_SUCCESS',
    GET_DISTRICT_SUCCESS: 'GET_DISTRICT_SUCCESS',
    SET_DATA_DISTRICT: 'SET_DATA_DISTRICT',

    GET_LIST_WARD_SUCCESS: 'GET_LIST_WARD_SUCCESS',
    GET_WARD_SUCCESS: 'GET_WARD_SUCCESS',
    SET_DATA_WARD: 'SET_DATA_WARD',


    // SHOP
    SHOP_START: 'SHOP_START',
    SHOP_FAIDED: 'SHOP_FAIDED',
    SHOP_SUCCESS: 'SHOP_SUCCESS',

    GET_LIST_SHOP_SUCCESS: 'GET_LIST_SHOP_SUCCESS',
    GET_SHOP_SUCCESS: 'GET_SHOP_SUCCESS',
    CREATE_SHOP_SUCCESS: 'CREATE_SHOP_SUCCESS',
    DELETE_LIST_SHOP_SUCCESS: 'DELETE_LIST_SHOP_SUCCESS',
    EDIT_SHOP_SUCCESS: 'EDIT_SHOP_SUCCESS',
    EDIT_LIST_SHOP_SUCCESS: 'EDIT_LIST_SHOP_SUCCESS',
    ON_CHANGE_SHOP: 'ON_CHANGE_SHOP',
    SET_DATA_SHOP: 'SET_DATA_SHOP',

    // COMMENT
    COMMENT_START: 'COMMENT_START',
    COMMENT_FAIDED: 'COMMENT_FAIDED',
    COMMENT_SUCCESS: 'COMMENT_SUCCESS',

    GET_LIST_COMMENT_SUCCESS: 'GET_LIST_COMMENT_SUCCESS',
    GET_COMMENT_SUCCESS: 'GET_COMMENT_SUCCESS',
    CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS',
    DELETE_LIST_COMMENT_SUCCESS: 'DELETE_LIST_COMMENT_SUCCESS',
    EDIT_COMMENT_SUCCESS: 'EDIT_COMMENT_SUCCESS',
    EDIT_LIST_COMMENT_SUCCESS: 'EDIT_LIST_COMMENT_SUCCESS',
    ON_CHANGE_COMMENT: 'ON_CHANGE_COMMENT',
    SET_DATA_COMMENT: 'SET_DATA_COMMENT',

    // TARGET
    TARGET_START: 'TARGET_START',
    TARGET_FAIDED: 'TARGET_FAIDED',
    TARGET_SUCCESS: 'TARGET_SUCCESS',

    GET_LIST_TARGET_SUCCESS: 'GET_LIST_TARGET_SUCCESS',
    GET_TARGET_SUCCESS: 'GET_TARGET_SUCCESS',
    CREATE_TARGET_SUCCESS: 'CREATE_TARGET_SUCCESS',
    DELETE_LIST_TARGET_SUCCESS: 'DELETE_LIST_TARGET_SUCCESS',
    EDIT_TARGET_SUCCESS: 'EDIT_TARGET_SUCCESS',
    EDIT_LIST_TARGET_SUCCESS: 'EDIT_LIST_TARGET_SUCCESS',
    ON_CHANGE_TARGET: 'ON_CHANGE_TARGET',
    SET_DATA_TARGET: 'SET_DATA_TARGET',
})

export default action_types;