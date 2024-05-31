import {
    AiOutlineUser, AiFillHdd, AiFillAndroid, AiFillShop, AiFillSwitcher, AiFillBehanceSquare
    , AiFillDropboxSquare, AiFillIdcard, AiFillSetting, AiFillTag, AiFillMobile, AiFillBook, AiFillBuild,
    AiFillContainer, AiFillFileMarkdown, AiFillCrown, AiFillPayCircle, AiFillProject, AiOutlineBook, AiOutlineUserSwitch,
    AiFillFire, AiFillUsb, AiFillRocket, AiFillControl, AiFillMoneyCollect, AiFillEnvironment, AiFillRobot, AiFillDashboard
} from "react-icons/ai";
import { IoStatsChart, IoBarChartSharp, IoBookSharp } from "react-icons/io5";
import { FaUserNurse, FaAndroid, FaUserShield } from "react-icons/fa6";

const itemMenuLeftLayoutSider = [
    {
        key: 1, icon: <AiFillDashboard />, label: 'Dashboard', children: [
            { key: 'statistical/view_web', icon: <IoStatsChart />, label: 'Lượt truy cập', title: 'statistical.view_web' },
            { key: 'statistical/view_product', icon: <IoBarChartSharp />, label: 'Lượt xem sản phẩm', title: 'statistical.view_product' },
        ],
    },
    {
        key: 2, icon: <FaUserNurse />, label: 'Nhân viên', children: [
            { key: 'system_staff/roll_call', icon: <FaAndroid />, label: 'Chấm công', },
            { key: 'system_staff/history', icon: <IoBookSharp />, label: 'Lịch sử', },
        ],
    },
    {
        key: 3, icon: <FaUserShield />, label: 'Người dùng', children: [
            { key: 'manager/customer', icon: <AiOutlineUser />, label: 'Khách hàng', title: 'account.view_customer' },
            { key: 'manager/user', icon: <AiOutlineUserSwitch />, label: 'Tài khoản', title: 'account.view_user' },
            { key: 'manager/group', icon: <AiFillRobot />, label: 'Phân quyền', title: 'group.view_group' },
        ],
    },
    {
        key: 4, icon: <AiFillContainer />, label: 'Đơn đặt', children: [
            { key: '', icon: <AiFillFileMarkdown />, label: 'Đơn hàng', title: 'order.view_order' },
        ],
    },
    {
        key: 5, icon: <AiFillShop />, label: 'Cửa hàng', children: [
            { key: 'manager/product', icon: <AiFillMobile />, label: 'Sản phẩm', title: 'product.view_product' },
            { key: 'manager/flash_sale_item', icon: <AiFillPayCircle />, label: 'Flash sale', title: 'promotion.view_flashsaleitem' },
        ],
    },
    {
        key: 6, icon: <AiFillProject />, label: 'Quảng cáo', children: [
            { key: 'manager/banner', icon: <AiFillBehanceSquare />, label: 'Băng rôn', title: 'settings.view_banner' },
            { key: 'manager/location', icon: <AiFillEnvironment />, label: 'Vị trí', title: 'settings.view_location' },
        ],
    },
    {
        key: 7, icon: <AiFillSetting />, label: 'Thông số', children: [
            { key: 'manager/attribute_value', icon: <AiFillRocket />, label: 'Giá trị', title: 'product.view_attributevalue' },
            { key: 'manager/attribute', icon: <AiFillUsb />, label: 'Thông số', title: 'product.view_attribute' },
            { key: 'manager/group_attribute', icon: <AiFillFire />, label: 'Loại thông số', title: 'product.view_groupattribute' },
            { key: 'manager/variant_attribute_group', icon: <AiFillCrown />, label: 'Loại TS-SP', title: 'product.view_variantattributegroup' },
        ],
    },
    {
        key: 8, icon: <AiFillHdd />, label: 'Danh mục', children: [
            { key: 'manager/tag', icon: <AiFillTag />, label: 'Thẻ tag', title: 'product.view_tag' },
            { key: 'manager/brand', icon: <AiFillIdcard />, label: 'Thương hiệu', title: 'product.view_brand' },
            { key: 'manager/category', icon: <AiFillDropboxSquare />, label: 'Danh mục', title: 'product.view_category' },
            { key: 'manager/flash_sale', icon: <AiFillMoneyCollect />, label: 'Flash_sale', title: 'promotion.view_flashsale' },
        ],
    },
    {
        key: 9, icon: <AiFillBook />, label: 'Bài đăng', children: [
            { key: 'manager/post', icon: <AiOutlineBook />, label: 'Bài viết', title: 'post.view_post' },
            { key: 'manager/category_post', icon: <AiFillBuild />, label: 'Loại bài viết', title: 'post.view_category' },
        ],
    },
    {
        key: 10, icon: <AiFillAndroid />, label: 'Hệ thống', children: [
            { key: 'manager/sync_data', icon: <AiFillControl />, label: 'Đồng bộ', title: 'sync.view_sync' },
            { key: 'manager/task', icon: <AiFillSwitcher />, label: 'Lịch sử', title: 'task.view_task' }
        ],
    },
];
export {
    itemMenuLeftLayoutSider
}