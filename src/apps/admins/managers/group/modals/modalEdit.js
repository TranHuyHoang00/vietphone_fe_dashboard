import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Collapse, Checkbox } from 'antd';
import ModalFooter from '@components/modal/modalFooter';
class index extends Component {
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
    handleEdit = async () => {
        let data_group = this.props.data_group;
        data_group.permissions = this.state.data_permission_ids;
        await this.props.edit_group(data_group.id, data_group);
        let isResult = this.props.isResult;
        if (isResult) {
            this.props.openModal("edit", false);
            await this.props.getListGroup(this.props.dataFilter);
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
        let isLoading = this.props.isLoading;
        let data_permission_uniques = this.state.data_permission_uniques;
        let data_permissions = this.props.data_permissions;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modalEdit}
                onCancel={() => this.props.openModal("edit", false)} width={600}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="overflow-y-scroll">
                        <div className='h-[350px] space-y-[10px] '>
                            {data_permission_uniques && data_permission_uniques.map((permission, index) => {
                                return (
                                    <div key={permission.id}>
                                        <Collapse defaultActiveKey={permission.id}>
                                            <Collapse.Panel
                                                header={`${permission.app_label} - ${permission.model}`} key={permission.id}
                                            >
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
        isLoading: state.group.isLoading,
        isResult: state.group.isResult,
        data_permissions: state.permission.data_permissions,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListGroup: (dataFilter) => dispatch(actions.getListGroupRedux(dataFilter)),
        edit_group: (id, data) => dispatch(actions.edit_group_redux(id, data)),
        on_change_group: (id, value) => dispatch(actions.on_change_group_redux(id, value)),
        get_list_permission: (dataFilter) => dispatch(actions.get_list_permission_redux(dataFilter)),
        set_data_group: (data) => dispatch(actions.set_data_group_redux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));