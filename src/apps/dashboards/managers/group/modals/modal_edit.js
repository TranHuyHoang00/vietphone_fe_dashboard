import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin, Collapse } from 'antd';
import ModalFooter from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_filter: {
                page: 1,
                limit: 5,
                search: ''
            },
            unique_permission_datas: [],
        }
    }
    async componentDidMount() {
        this.props.get_list_permission(this.state.data_filter);
        this.handle_data_unique(this.props.data_permissions);
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
            this.setState({ unique_permission_datas: unique_datas });
        }
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_group);
        if (result.code === 0) {
            let data_group = this.props.data_group;
            await this.props.edit_group(data_group.id, data_group);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("edit", false);
                await this.props.get_list_group(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_group = this.props.data_group;
        let is_loading = this.props.is_loading;
        let unique_permission_datas = this.state.unique_permission_datas;
        console.log('unique_permission_datas', unique_permission_datas);
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={600}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">
                        {unique_permission_datas && unique_permission_datas.map((permission, index) => {
                            return (
                                <div key={index}>
                                    <Collapse >
                                        <Collapse.Panel header={`${permission.app_label} - ${permission.model}`} key="1">

                                        </Collapse.Panel>
                                    </Collapse>
                                </div>
                            )

                        })}


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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));