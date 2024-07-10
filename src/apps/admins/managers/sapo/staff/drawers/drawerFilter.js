import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Drawer, Space, Typography, Radio } from 'antd';
import FormSelectSingle from '@components/selects/formSelectSingle';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100 }

        }
    }
    async componentDidMount() {
        const { getListStaffRole } = this.props;
        const { dataFilter } = this.state;
        await getListStaffRole(dataFilter);
    }
    render() {
        const { dataFilter, openDrawer, drawerFilter, onChangePage, dataStaffRoles } = this.props;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter.status} buttonStyle="solid"
                            onChange={(event) => onChangePage(event.target.value, 'status')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="active">Mở</Radio.Button>
                            <Radio.Button value="inactive">Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <FormSelectSingle
                        name={'Phân quyền'} variable={'role'} value={dataFilter.role}
                        important={false} width={'100%'}
                        options={[
                            { label: 'Tất cả', value: '' },
                            ...dataStaffRoles && dataStaffRoles
                                .map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                })),
                        ]}
                        onChangeInput={onChangePage} />
                </Space>
            </Drawer>
        );
    }

}


const mapStateToProps = state => {
    return {
        dataStaffRoles: state.staffRole.dataStaffRoles,
        isLoading: state.staffRole.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaffRole: (dataFilter) => dispatch(actions.getListStaffRoleRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));