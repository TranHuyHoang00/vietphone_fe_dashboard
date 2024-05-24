import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Typography, Radio } from 'antd';
import FormSelectInput from '@components/selects/formSelectInput'
class drawer_filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let dataFilter = this.props.dataFilter;
        let data_groups = [{ name: 'TẤT CẢ', id: '' }, ...this.props.data_groups];

        return (
            <Drawer title="Bộ lọc nâng cao" onClose={() => this.props.open_drawer('filter', false)} open={this.props.drawer_filter}>
                <div className='space-y-[10px]'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter.is_active} onChange={(event) => this.props.onChangePage(event.target.value, 'is_active')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Mở</Radio.Button>
                            <Radio.Button value={false}>Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Toàn quyền</Typography.Text>
                        <Radio.Group value={dataFilter.isSuperUser} onChange={(event) => this.props.onChangePage(event.target.value, 'isSuperUser')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value={true}>Có</Radio.Button>
                            <Radio.Button value={false}>Không</Radio.Button>
                        </Radio.Group>
                    </div>
                    <FormSelectInput name={'Phân quyền'} variable={'groups'} value={dataFilter.groups}
                        important={false} width={'100%'}
                        options={data_groups.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        onChangeInput={this.props.onChangePage} />
                </div>
            </Drawer>
        );
    }

}
export default withRouter(drawer_filter);