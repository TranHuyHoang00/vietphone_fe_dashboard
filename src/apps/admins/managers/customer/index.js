import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Input,
    Spin, Pagination, Typography, Avatar
} from 'antd';
import { AiFillEye } from "react-icons/ai";
import FormSelectPage from '@components/selects/form_select_page';
import ModalDetail from './modals/modal_detail';
import AvatarNone from '@assets/images/avatar_none.jpg';
import { check_permission } from '@utils/check_permission';
import { data_customers } from '@datas/data_after_check_permissions';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_selected: [],
            modal_detail: false,
            data_filter: {
                page: 1,
                limit: 5,
                search: ''
            },
            data_before_checks: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_customer(this.state.data_filter);
        let data_before_checks = await check_permission(data_customers, this.props.data_user_permissions, this.props.is_superuser);
        this.setState({
            data_before_checks: data_before_checks,
        });
    }
    open_modal = async (name, value, id) => {
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_customer: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_customer(id);
            }
        }
    }
    handle_funtion_menu = async () => {
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_customer(data_filter);
    }
    render() {
        const columns = [
            {
                title: 'Mã KH', dataIndex: 'code', width: 120, responsive: ['sm'],
                render: (code) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{code}</Typography.Text>,
                sorter: (a, b) => a.code - b.code,
            },
            {
                title: 'Thông tin', dataIndex: 'user',
                render: (user, item) =>
                    <div className='flex items-center justify-start gap-x-[5px]'>
                        <Avatar size={60} src={AvatarNone} />
                        <div>
                            <Typography.Text strong className='text-[#0574b8] dark:text-white'>{user.full_name}</Typography.Text><br />
                            <Typography.Text italic strong>{user.phone}</Typography.Text><br />
                            {item.email === '' || item.email === null ?
                                <Typography.Text italic>none@gmail.com</Typography.Text>
                                :
                                <Typography.Text italic>{item.email}</Typography.Text>
                            }
                        </div>
                    </div>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!data_before_checks['account.view_customer']} onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let data_filter = this.state.data_filter;
        let data_before_checks = this.state.data_before_checks;
        return (
            <>
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div>
                            </div>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên, Mã KH, SĐT !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-sm bcustomer'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={data_filter.limit} onchange_page={this.onchange_page} />
                            </div>
                            <Divider>KHÁCH HÀNG</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_customers} pagination={false}
                                    size="middle" bcustomered scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modal_detail && data_before_checks['account.view_customer'] &&
                    <ModalDetail modal_detail={this.state.modal_detail}
                        open_modal={this.open_modal} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_customers: state.customer.data_customers,
        data_customer: state.customer.data_customer,
        data_meta: state.customer.data_meta,
        is_loading: state.customer.is_loading,
        is_result: state.customer.is_result,

        data_user_permissions: state.user.data_user_permissions,
        is_superuser: state.user.is_superuser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_customer: (data_filter) => dispatch(actions.get_list_customer_redux(data_filter)),
        get_customer: (id) => dispatch(actions.get_customer_redux(id)),
        edit_list_customer: (id, data) => dispatch(actions.edit_list_customer_redux(id, data)),
        delete_list_customer: (id) => dispatch(actions.delete_list_customer_redux(id)),
        set_data_customer: (id) => dispatch(actions.set_data_customer_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));