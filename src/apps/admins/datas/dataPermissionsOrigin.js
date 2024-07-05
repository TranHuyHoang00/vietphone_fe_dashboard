const dataPermiViews = [
    "statistical.view_web", "statistical.view_product",
    "order.view_order",
    "product.view_product", "promotion.view_flashsaleitem",
    "account.view_customer", "account.view_user", "group.view_group",
    "product.view_comment",
    "product.view_promotioninfo", "promotion.view_flashsale",
    "product.view_warranty", "product.view_repair",
    "settings.view_banner", "settings.view_location",
    "product.view_attributevalue", "product.view_attribute", "product.view_groupattribute", "product.view_variantattributegroup",
    "product.view_tag", "product.view_brand", "product.view_category", "shop.view_shop",
    "post.view_post", "post.view_category",
    "analytic.view_shopmonthlytarget", "product.view_sapoproductcategory",
    "analytic.view_staffmonthlytarget",
    "account.view_staff",
    "sync.view_sync", "task.view_task",
];
const dataCustomers = [
    "account.view_customer", "account.change_customer", "account.delete_customer", "account.add_customer",
];
const dataUsers = [
    "account.view_user", "account.change_user", "account.delete_user", "account.add_user",
    "group.view_group",
];
const dataGroups = [
    "group.view_group", "group.change_group", "group.delete_group", "group.add_group",
];
const dataOrders = [
    "order.view_order", "order.change_order", "order.delete_order", "order.add_order",
];
const dataProducts = [
    "product.view_product", "product.change_product", "product.delete_product", "product.add_product",
];
const dataComments = [
    "product.view_comment", "product.change_comment", "product.delete_comment", "product.add_comment",
];
const dataFlashSaleItems = [
    "promotion.view_flashsaleitem", "promotion.change_flashsaleitem", "promotion.delete_flashsaleitem", "promotion.add_flashsaleitem",
];
const dataPromotions = [
    "product.view_promotioninfo", "product.change_promotioninfo", "product.delete_promotioninfo", "product.add_promotioninfo",
];
const dataWarrantys = [
    "product.view_warranty", "product.change_warranty", "product.delete_warranty", "product.add_warranty",
];
const dataRepairs = [
    "product.view_repair", "product.change_repair", "product.delete_repair", "product.add_repair",
];
const dataFlashSales = [
    "promotion.view_flashsale", "promotion.change_flashsale", "promotion.delete_flashsale", "promotion.add_flashsale",
];
const dataBanners = [
    "settings.view_banner", "settings.change_banner", "settings.delete_banner", "settings.add_banner",
];
const dataLocations = [
    "settings.view_location", "settings.change_location", "settings.delete_location", "settings.add_location",
];
const dataAttributeValues = [
    "product.view_attributevalue", "product.change_attributevalue", "product.delete_attributevalue", "product.add_attributevalue",
];
const dataAttributes = [
    "product.view_attribute", "product.change_attribute", "product.delete_attribute", "product.add_attribute",
];
const dataGroupAttributes = [
    "product.view_groupattribute", "product.change_groupattribute", "product.delete_groupattribute", "product.add_groupattribute",
];
const dataVariantAttributeGroups = [
    "product.view_variantattributegroup", "product.change_variantattributegroup", "product.delete_variantattributegroup", "product.add_variantattributegroup",
];
const dataTags = [
    "product.view_tag", "product.change_tag", "product.delete_tag", "product.add_tag",
];
const dataBrands = [
    "product.view_brand", "product.change_brand", "product.delete_brand", "product.add_brand",
];
const dataCategorys = [
    "product.view_category", "product.change_category", "product.delete_category", "product.add_category",
];
const dataShops = [
    "shop.view_shop", "shop.change_shop", "shop.delete_shop", "shop.add_shop",
];
const dataPosts = [
    "post.view_post", "post.change_post", "post.delete_post", "post.add_post",
];
const dataCategoryPosts = [
    "post.view_category", "post.change_category", "post.delete_category", "post.add_category",
];
const dataTargetShops = [
    "analytic.view_shopmonthlytarget", "analytic.change_shopmonthlytarget", "analytic.delete_shopmonthlytarget", "analytic.add_shopmonthlytarget",
]
const dataTargetStaffs = [
    "analytic.view_staffmonthlytarget", "analytic.change_staffmonthlytarget", "analytic.delete_staffmonthlytarget", "analytic.add_staffmonthlytarget",
]
const dataProductCategorys = [
    "product.view_sapoproductcategory", "product.delete_sapoproductcategory", "product.change_sapoproductcategory", "product.add_sapoproductcategory"
]
const dataStaffs = [
    "account.view_staff", "account.change_staff", "account.delete_staff", "account.add_staff",
];
const dataSyncs = [
    "sync.view_task", "sync.change_sync", "sync.delete_sync", "sync.add_sync",
];
const dataTasks = [
    "task.view_task", "task.change_task", "task.delete_task", "task.add_task",
];

export {
    dataPermiViews,
    dataCustomers, dataUsers, dataGroups,
    dataOrders,
    dataProducts, dataFlashSaleItems,
    dataComments,
    dataPromotions, dataFlashSales,
    dataWarrantys, dataRepairs,
    dataBanners, dataLocations,
    dataAttributeValues, dataAttributes, dataGroupAttributes, dataVariantAttributeGroups,
    dataTags, dataBrands, dataCategorys, dataShops,
    dataPosts, dataCategoryPosts,
    dataTargetShops, dataProductCategorys, dataStaffs,
    dataTargetStaffs,
    dataSyncs, dataTasks,
}