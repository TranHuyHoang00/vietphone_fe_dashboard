import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Collapse, Checkbox } from 'antd';
import ModalFooter from '@components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_permission_uniques: [],
            data_permission_ids: [],
        }
    }
    async componentDidMount() {
        await this.props.get_list_permission({ page: 1, limit: 1000, search: '' });
        await this.handle_data_unique(this.props.data_permissions);
        this.setState({ data_permission_ids: this.props.data_group.permissions })
    }
    handle_data_unique = async (data) => {
        if (data && data.length !== 0) {
            let unique_ids = new Set();
            let unique_datas = [];
            for (const obj of data) {
                if (obj?.content_type?.id) {
                    if (!unique_ids.has(obj.content_type.id)) {
                        unique_ids.add(obj.content_type.id);
                        unique_datas.push(obj.content_type);
                    }
                }
            }
            this.setState({ data_permission_uniques: unique_datas });
        }
    }
    handle_edit = async () => {
        let data_group = this.props.data_group;
        data_group.permissions = this.state.data_permission_ids;
        await this.props.edit_group(data_group.id, data_group);
        let is_result = this.props.is_result;
        if (is_result) {
            this.props.open_modal("edit", false);
            await this.props.get_list_group(this.props.data_filter);
        }
    }
    onchange_checkbox = (value) => {
        let data_permission_ids = this.state.data_permission_ids;
        const index = data_permission_ids.indexOf(value);
        if (index !== -1) {
            data_permission_ids.splice(index, 1);
        } else {
            data_permission_ids.push(value)
        }
        this.setState({ data_permission_ids: data_permission_ids })

    }
    handle_checked = (id) => {
        if (id) {
            let data_group = this.props.data_group;
            if (data_group?.permissions) {
                const found = (data_group.permissions).includes(id);
                if (found) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }

    }
    render() {
        let is_loading = this.props.is_loading;
        let data_permission_uniques = this.state.data_permission_uniques;
        let data_permissions = this.props.data_permissions;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={600}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="overflow-y-scroll">
                        <div className='h-[350px] space-y-[10px] '>
                            {data_permission_uniques && data_permission_uniques.map((permission, index) => {
                                return (
                                    <div key={permission.id}>
                                        <Collapse defaultActiveKey={permission.id}>
                                            <Collapse.Panel header={`${permission.app_label} - ${permission.model}`} key={permission.id}>
                                                {data_permissions && data_permissions.map((item, index) => {
                                                    return (
                                                        <div key={item.id} className=''>
                                                            {permission?.id === item?.content_type?.id &&
                                                                <Checkbox checked={this.handle_checked(item.id)} onChange={(event) => this.onchange_checkbox(event.target.value)} value={item.id}>{item.name}</Checkbox>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </Collapse.Panel>
                                        </Collapse>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_group: state.group.data_group,
        is_loading: state.group.is_loading,
        is_result: state.group.is_result,
        data_permissions: state.permission.data_permissions,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_group: (data_filter) => dispatch(actions.get_list_group_redux(data_filter)),
        edit_group: (id, data) => dispatch(actions.edit_group_redux(id, data)),
        on_change_group: (id, value) => dispatch(actions.on_change_group_redux(id, value)),
        get_list_permission: (data_filter) => dispatch(actions.get_list_permission_redux(data_filter)),
        set_data_group: (data) => dispatch(actions.set_data_group_redux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));