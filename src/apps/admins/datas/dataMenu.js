import {
    AiOutlineUser, AiFillHdd, AiFillAndroid, AiFillShop, AiFillSwitcher, AiFillBehanceSquare
    , AiFillDropboxSquare, AiFillIdcard, AiFillSetting, AiFillTag, AiFillMobile, AiFillBook, AiFillBuild,
    AiFillContainer, AiFillFileMarkdown, AiFillCrown, AiFillPayCircle, AiFillProject, AiOutlineBook, AiOutlineUserSwitch,
    AiFillFire, AiFillUsb, AiFillRocket, AiFillControl, AiFillMoneyCollect, AiFillEnvironment, AiFillRobot, AiFillDashboard,
    AiFillChrome, AiFillSnippets, AiOutlineAudit, AiFillTool, AiFillBug, AiOutlineQq,
} from "react-icons/ai";
import { IoStatsChart, IoBarChartSharp } from "react-icons/io5";
import { FaUserShield, FaDatabase } from "react-icons/fa6";
import {
    FaCcDiscover, FaUserGraduate, FaUserTie, FaBlender,
    // Fa500Px, FaCalendarAlt, FaAndroid 
} from "react-icons/fa";
import {
    BsFillBox2HeartFill, BsCalendar2PlusFill, BsAward, BsBox2HeartFill,
    BsApple,
} from "react-icons/bs";
const itemMenuLeftLayoutSider = [
    {
        key: 'website', icon: <AiFillChrome />, label: 'Website', children: [
            {
                key: 'statistical_website', icon: <AiFillDashboard />, label: 'Thống kê', children: [
                    { key: 'manager/statistical/view_web', icon: <IoStatsChart />, label: 'Lượt truy cập', title: 'statistical.view_web' },
                    { key: 'manager/statistical/view_product', icon: <IoBarChartSharp />, label: 'Lượt xem sản phẩm', title: 'statistical.view_product' },
                ],
            },
            {
                key: 'order_website', icon: <AiFillContainer />, label: 'Đơn đặt', children: [
                    { key: '', icon: <AiFillFileMarkdown />, label: 'Đơn hàng', title: 'order.view_order' },
                ],
            },
            {
                key: 'store_website', icon: <AiFillShop />, label: 'Gian hàng', children: [
                    { key: 'manager/website/product', icon: <AiFillMobile />, label: 'Sản phẩm', title: 'product.view_product' },
                    { key: 'manager/website/product_repair', icon: <AiFillTool />, label: 'Sửa chữa', title: 'product.view_product' },
                    { key: 'manager/website/flash_sale_item', icon: <AiFillPayCircle />, label: 'Giảm giá', title: 'promotion.view_flashsaleitem' },
                ],
            },
            {
                key: 'promotion_product_webiste', icon: <FaCcDiscover />, label: 'Khuyến mãi', children: [
                    { key: 'manager/website/promotion', icon: <BsFillBox2HeartFill />, label: 'Quà tặng', title: 'product.view_promotioninfo' },
                    { key: 'manager/website/flash_sale', icon: <AiFillMoneyCollect />, label: 'Flash_sale', title: 'promotion.view_flashsale' },
                ],
            },
            {
                key: 'service_product_webiste', icon: <AiFillSnippets />, label: 'Dịch vụ', children: [
                    { key: 'manager/website/warranty', icon: <AiOutlineAudit />, label: 'Bảo hành', title: 'product.view_warranty' },
                    { key: 'manager/website/repair', icon: <AiFillTool />, label: 'Sửa chữa', title: 'product.view_repair' },
                ],
            },
            {
                key: 'advertisement_website', icon: <AiFillProject />, label: 'Quảng cáo', children: [
                    { key: 'manager/website/banner', icon: <AiFillBehanceSquare />, label: 'Băng rôn', title: 'settings.view_banner' },
                    { key: 'manager/website/location', icon: <AiFillEnvironment />, label: 'Vị trí', title: 'settings.view_location' },
                ],
            },
            {
                key: 'specification_product_website', icon: <AiFillSetting />, label: 'Thông số kỹ thuật', children: [
                    { key: 'manager/website/attribute_value', icon: <AiFillRocket />, label: 'Giá trị', title: 'product.view_attributevalue' },
                    { key: 'manager/website/attribute', icon: <AiFillUsb />, label: 'Thông số', title: 'product.view_attribute' },
                    { key: 'manager/website/group_attribute', icon: <AiFillFire />, label: 'Loại thông số', title: 'product.view_groupattribute' },
                    { key: 'manager/website/variant_attribute_group', icon: <AiFillCrown />, label: 'Loại TS-SP', title: 'product.view_variantattributegroup' },
                ],
            },
            {
                key: 'category_product_website', icon: <AiFillHdd />, label: 'Danh mục', children: [
                    { key: 'manager/website/tag', icon: <AiFillTag />, label: 'Thẻ tag', title: 'product.view_tag' },
                    { key: 'manager/website/brand', icon: <AiFillIdcard />, label: 'Thương hiệu', title: 'product.view_brand' },
                    { key: 'manager/website/category', icon: <AiFillDropboxSquare />, label: 'Danh mục', title: 'product.view_category' },
                ],
            },
            {
                key: 'post_website', icon: <AiFillBook />, label: 'Bài đăng', children: [
                    { key: 'manager/website/post', icon: <AiOutlineBook />, label: 'Bài viết', title: 'post.view_post' },
                    { key: 'manager/website/category_post', icon: <AiFillBuild />, label: 'Loại bài viết', title: 'post.view_category' },
                ],
            },
        ],
    },
    {
        key: 'sapo', icon: <AiOutlineQq />, label: 'Sapo', children: [
            {
                key: 'sapo_manager', icon: <AiFillBug />, label: 'Quản lý', children: [
                    { key: 'manager/sapo/shop', icon: <AiFillShop />, label: 'Cửa hàng', title: 'shop.view_shop' },
                    { key: 'manager/sapo/product_category', icon: <BsApple />, label: 'Loại sản phẩm', title: 'product.view_sapoproductcategory' },
                    { key: 'manager/sapo/product_category_target', icon: <FaBlender />, label: 'Loại sản phẩm TG', title: 'product.view_sapotargetproductcategory' },
                    { key: 'manager/sapo/staff', icon: <FaUserGraduate />, label: 'Nhân viên', title: 'account.view_staff' },
                    { key: 'manager/sapo/customer', icon: <AiOutlineUser />, label: 'Khách hàng', title: 'account.view_customer' },
                ],
            },
            {
                key: 'sapo_role', icon: <AiFillRobot />, label: 'Phân quyền', children: [
                    { key: 'role/sapo/staff', icon: <FaUserGraduate />, label: 'Nhân viên', title: 'account.view_staffrole' },
                ]
            }
        ]
    },
    {
        key: 'target', icon: <BsAward />, label: 'Target', children: [

            {
                key: 'set_target', icon: <BsCalendar2PlusFill />, label: 'Đặt ra', children: [
                    { key: 'set/target/shop', icon: <AiFillShop />, label: 'Cửa hàng', title: 'analytic.view_shopmonthlytarget' },
                    { key: 'set/target/staff', icon: <FaUserTie />, label: 'Nhân viên', title: 'analytic.view_staffmonthlytarget' },

                ],
            },
            {
                key: 'achieve_target', icon: <BsBox2HeartFill />, label: 'Đạt được', children: [
                    { key: 'achieve/target/shop', icon: <AiFillShop />, label: 'Cửa hàng', title: 'analytic.view_shopmonthlytarget' },
                    { key: 'achieve/target/staff', icon: <FaUserTie />, label: 'Nhân viên', title: 'analytic.view_staffmonthlytarget' },
                ],
            },
        ]

    },
    // {
    //     key: 'timekeeping', icon: <Fa500Px />, label: 'Chấm công', children: [

    //         {
    //             key: 'manager_timekeeping', icon: <FaAndroid />, label: 'Quản lý', children: [
    //                 { key: 'manager/timekeeping/work_schedule', icon: <FaCalendarAlt />, label: 'Lịch làm việc', title: 'account.view_user' },
    //             ],
    //         },
    //     ]

    // },
    {
        key: 'sytem', icon: <AiFillAndroid />, label: 'Hệ thống', children: [
            {
                key: 'data_sytem', icon: <FaDatabase />, label: 'Dữ liệu', children: [
                    { key: 'manager/system/sync_data', icon: <AiFillControl />, label: 'Đồng bộ', title: 'sync.view_sync' },
                    { key: 'manager/system/task', icon: <AiFillSwitcher />, label: 'Lịch sử', title: 'task.view_task' }
                ],
            },
            {
                key: 'user_system', icon: <FaUserShield />, label: 'Người dùng', children: [
                    { key: 'manager/system/user', icon: <AiOutlineUserSwitch />, label: 'Tài khoản', title: 'account.view_user' },
                    { key: 'manager/system/group', icon: <AiFillRobot />, label: 'Phân quyền', title: 'group.view_group' },
                ],
            }
        ],
    },
];
export {
    itemMenuLeftLayoutSider
}