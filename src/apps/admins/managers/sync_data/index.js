import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Divider, Card, Spin } from 'antd';
import FormPopconfirm from '@components/popconfirms/form_popconfirm';
import { sync_all_products, getDataTask } from '@services/task_service';
import { showNotification } from '@utils/handleFuncNotification';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { data_syncs } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading_sync_product: false,
            sync_product: null,
            data_sync_product: {},
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        let dataCheckPermis = await handleCheckPermis(data_syncs, this.props.dataUserPermis, this.props.isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    handle_loading = (funtion_name, value, result) => {
        if (funtion_name === 'sync_product') {
            this.setState({
                loading_sync_product: value,
                sync_product: result,
            })
        }
    }

    getDataTask = async (id, funtion_name) => {
        try {
            let data = await getDataTask(id);
            if (data && data.data && data.data.success === 1) {
                if (funtion_name === 'sync_product') {
                    clearInterval(this.state.interval_task_product);
                    this.setState({ data_sync_product: data.data.data, })
                }
                this.handle_loading(funtion_name, false, true);
            }
        } catch (error) {
            showNotification(error);
            this.handle_loading(funtion_name, false, false);
        }

    }
    check_task = async (id, funtion_name) => {
        if (funtion_name === 'sync_product') {
            const interval_task_product = setInterval(() => { this.getDataTask(id, funtion_name) }, 2000);
            this.setState({ interval_task_product });
            return () => clearInterval(interval_task_product);
        }
    }
    handle_sync = async (funtion_name) => {
        this.handle_loading(funtion_name, true, null);
        try {
            let data;
            if (funtion_name === 'sync_product') { data = await sync_all_products(); }
            if (data && data.data && data.data.success === 1) {
                let task_id = data.data.data.task_id;
                if (task_id) {
                    this.check_task(task_id, funtion_name);
                } else {
                    this.handle_loading(funtion_name, false, false);
                }
            } else {
                this.handle_loading(funtion_name, false, false);
            }
        } catch (e) {
            this.handle_loading(funtion_name, false, false);
        }
    }
    render() {
        const suscess = (name, data) => {
            return (
                <div class="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3">
                    <p class="font-bold">{`Đồng bộ ${name} thành công`}</p>
                    <p class="text-sm">Thời gian: {data.date_done}</p>
                    <p class="text-sm line-clamp-3">Kết quả: {data.result}</p>
                </div>
            )
        }
        const failed = (name) => {
            return (
                <div class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3">
                    <p class="font-bold">Thất bại</p>
                    <p class="text-sm">{`Đồng bộ ${name} thất bại`}</p>
                </div>
            )
        }
        return (
            <>
                <div className="mx-[10px] space-y-[10px]">
                    <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                        <Divider>ĐỒNG BỘ</Divider>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-[10px]'>
                            <div>
                                <Spin tip="Đang tải" spinning={this.state.loading_sync_product} size="large">
                                    <Card title="Sản phẩm" className='shadow-md'
                                        extra={
                                            <FormPopconfirm title={"Đồng bộ sản phẩm"}
                                                description={"Bạn có chắn chắn muốn đồng bộ sản phẩm"}
                                                okText={"Đồng ý"} cancelText={"Hủy bỏ"}
                                                funtion_name={'sync_product'}
                                                disabled={false}
                                                onConfirm={this.handle_sync} />
                                        }>
                                        {this.state.sync_product === null && <></>}
                                        {this.state.sync_product === false && <>{failed('sản phẩm')}</>}
                                        {this.state.sync_product && <> {suscess('sản phẩm', this.state.data_sync_product)}</>}

                                    </Card>
                                </Spin>
                            </div>
                            <div>
                                <Spin tip="Đang tải" spinning={false} size="large">
                                    <Card title="Đơn hàng" className='shadow-md'
                                        extra={
                                            <FormPopconfirm title={"Đồng bộ sản phẩm"}
                                                description={"Bạn có chắn chắn muốn đồng bộ sản phẩm"}
                                                okText={"Đồng ý"} cancelText={"Hủy bỏ"}
                                                funtion_name={'sync_product'}
                                                disabled={true}
                                                onConfirm={this.handle_sync} />
                                        }>
                                    </Card>
                                </Spin>
                            </div>
                            <div>
                                <Spin tip="Đang tải" spinning={false} size="large">
                                    <Card title="Khách hàng" className='shadow-md'
                                        extra={
                                            <FormPopconfirm title={"Đồng bộ sản phẩm"}
                                                description={"Bạn có chắn chắn muốn đồng bộ sản phẩm"}
                                                okText={"Đồng ý"} cancelText={"Hủy bỏ"}
                                                funtion_name={'sync_product'}
                                                disabled={true}
                                                onConfirm={this.handle_sync} />
                                        }>
                                    </Card>
                                </Spin>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));