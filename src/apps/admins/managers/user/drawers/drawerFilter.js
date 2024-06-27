import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Typography, Radio } from 'antd';
import { connect } from 'react-redux';
import * as actions from '@actions';
import FormSelectSingle from '@components/selects/formSelectSingle'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListGroup } = this.props;
        await getListGroup({ page: 1, limit: 50, search: '' });
    }
    render() {
        const { dataFilter, dataGroups, onChangePage, openDrawer, drawerFilter } = this.props;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <div className='space-y-[10px]'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter.is_active} onChange={(event) => onChangePage(event.target.value, 'is_active')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Mở</Radio.Button>
                            <Radio.Button value={false}>Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Toàn quyền</Typography.Text>
                        <Radio.Group value={dataFilter.is_superuser} onChange={(event) => onChangePage(event.target.value, 'is_superuser')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Có</Radio.Button>
                            <Radio.Button value={false}>Không</Radio.Button>
                        </Radio.Group>
                    </div>
                    <FormSelectSingle name={'Phân quyền'} variable={'groups'} value={dataFilter.groups}
                        important={false} width={'100%'}
                        options={[
                            { value: "", label: 'Tất cả' },
                            ...dataGroups.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))]}
                        onChangeInput={onChangePage} />
                </div>
            </Drawer>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataGroups: state.group.dataGroups,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListGroup: (dataFilter) => dispatch(actions.getListGroupRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));