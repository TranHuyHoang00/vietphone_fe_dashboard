import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Collapse, Checkbox } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPermisUniques: [],
            dataPermisIds: [],
            isLoadingHandleDataUnique: false,
        }
    }
    async componentDidMount() {
        const { getListPermission, dataPermissions, dataGroup, isResultPermis } = this.props;
        await getListPermission({ page: 1, limit: '1000' });
        if (isResultPermis) {
            await this.handleDataUnique(dataPermissions);
            this.setState({ dataPermisIds: dataGroup.permissions })
        }
    }
    handleDataUnique = async (data) => {
        this.setState({ isLoadingHandleDataUnique: true });
        if (data && data.length !== 0) {
            let uniqueIds = new Set();
            let uniqueDatas = [];
            for (const obj of data) {
                if (obj?.content_type?.id) {
                    if (!uniqueIds.has(obj.content_type.id)) {
                        uniqueIds.add(obj.content_type.id);
                        uniqueDatas.push(obj.content_type);
                    }
                }
            }
            this.setState({ dataPermisUniques: uniqueDatas, isLoadingHandleDataUnique: false });
        }
    }
    handleEdit = async () => {
        const { dataGroup, editGroup, isResult, openModal, dataFilter, getListGroup } = this.props;
        const { dataPermisIds } = this.state;
        const newDataGroup = {
            ...dataGroup,
            permissions: dataPermisIds
        };
        await editGroup(newDataGroup.id, newDataGroup);
        if (isResult) {
            openModal("edit", false);
            await getListGroup(dataFilter);
        }
    }
    onChangeCheckbox = (value) => {
        const { dataPermisIds } = this.state;
        const index = dataPermisIds.indexOf(value);
        if (index !== -1) {
            dataPermisIds.splice(index, 1);
        } else {
            dataPermisIds.push(value)
        }
        this.setState({ dataPermisIds: dataPermisIds })

    }
    handleChecked = (id) => {
        if (id) {
            const { dataGroup } = this.props;
            if (dataGroup?.permissions) {
                const found = (dataGroup.permissions).includes(id);
                if (found) { return true }
                else { return false }
            } else {
                return false
            }
        } else {
            return false
        }

    }
    render() {
        const { dataPermisUniques, isLoadingHandleDataUnique } = this.state;
        const { dataPermissions, isLoadingGroup, isLoadingPermis, modalEdit, openModal } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={600}
                maskClosable={!isLoadingGroup}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoadingGroup} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoadingGroup || isLoadingPermis || isLoadingHandleDataUnique}>
                    <div className="overflow-y-scroll">
                        <div className='h-[350px] space-y-[10px] '>
                            {dataPermisUniques && dataPermisUniques.map((permission, index) => {
                                return (
                                    <div key={permission.id}>
                                        <Collapse defaultActiveKey={permission.id}>
                                            <Collapse.Panel
                                                header={`${permission.app_label} - ${permission.model}`} key={permission.id}>
                                                {dataPermissions && dataPermissions.map((item, index) => {
                                                    return (
                                                        <div key={item.id}>
                                                            {permission?.id === item?.content_type?.id &&
                                                                <Checkbox checked={this.handleChecked(item.id)} onChange={(event) => this.onChangeCheckbox(event.target.value)} value={item.id}>
                                                                    {item.name} - {item?.content_type?.app_label}.{item?.codename}
                                                                </Checkbox>
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
        dataGroup: state.group.dataGroup,
        isLoadingGroup: state.group.isLoading,
        isLoadingPermis: state.permission.isLoading,

        isResult: state.group.isResult,

        dataPermissions: state.permission.dataPermissions,
        isResultPermis: state.permission.isResult,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListGroup: (dataFilter) => dispatch(actions.getListGroupRedux(dataFilter)),
        editGroup: (id, data) => dispatch(actions.editGroupRedux(id, data)),
        onChangeGroup: (id, value) => dispatch(actions.onChangeGroupRedux(id, value)),
        getListPermission: (dataFilter) => dispatch(actions.getListPermissionRedux(dataFilter)),
        setDataGroup: (data) => dispatch(actions.setDataGroupRedux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));