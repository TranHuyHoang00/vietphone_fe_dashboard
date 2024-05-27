import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Divider, Card, Spin, Popconfirm, Button, Space } from 'antd';
import { AiOutlineCloudDownload } from "react-icons/ai";
import { syncAllProducts, getDataTask } from '@services/task_service';
import { showNotification } from '@utils/handleFuncNotification';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataSyncs } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingSyncProduct: false,
            isResultSyncProduct: null,
            dataSyncProduct: {},

            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const { dataUserPermis, isSuperUser } = this.props;
        const dataCheckPermis = await handleCheckPermis(dataSyncs, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    handleLoading = (syncName, value, result) => {
        switch (syncName) {
            case 'syncProduct':
                this.setState({ isLoadingSyncProduct: value, isResultSyncProduct: result, })
                break;
            default:
                return;
        }
    }
    getDataTask = async (taskId, syncName) => {
        try {
            const data = await getDataTask(taskId);
            let { intervalTaskProduct } = this.state;
            if (data && data.data && data.data.success === 1) {
                switch (syncName) {
                    case 'syncProduct':
                        clearInterval(intervalTaskProduct);
                        this.setState({ dataSyncProduct: data.data.data, })
                        break;
                    default:
                        return;
                }
                this.handleLoading(syncName, false, true);
            }
        } catch (error) {
            showNotification(error);
            this.handleLoading(syncName, false, false);
        }

    }
    checkTask = async (taskId, syncName) => {
        switch (syncName) {
            case 'syncProduct':
                const intervalTaskProduct = setInterval(() => { this.getDataTask(taskId, syncName) }, 2000);
                this.setState({ intervalTaskProduct });
                return () => clearInterval(intervalTaskProduct);
            default:
                return;
        }
    }
    handleFuncSync = async (syncName) => {
        this.handleLoading(syncName, true, null);
        try {
            let data;
            switch (syncName) {
                case 'syncProduct':
                    data = await syncAllProducts();
                    break;
                default:
                    return;
            }
            if (data && data.data && data.data.success === 1) {
                const taskId = data.data.data.task_id;
                if (taskId) {
                    this.checkTask(taskId, syncName);
                } else {
                    this.handleLoading(syncName, false, false);
                }
            } else {
                this.handleLoading(syncName, false, false);
            }
        } catch (e) {
            this.handleLoading(syncName, false, false);
        }
    }
    render() {
        const syncSuscess = (name, data) => {
            return (
                <div class="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3">
                    <p class="font-bold">{`Đồng bộ ${name} thành công`}</p>
                    <p class="text-sm">Thời gian: {data.date_done}</p>
                    <p class="text-sm line-clamp-3">Kết quả: {data.result}</p>
                </div>
            )
        }
        const syncFailed = (name) => {
            return (
                <div class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3">
                    <p class="font-bold">Thất bại</p>
                    <p class="text-sm">{`Đồng bộ ${name} thất bại`}</p>
                </div>
            )
        }
        const { isLoadingSyncProduct, isResultSyncProduct, dataSyncProduct } = this.state;
        return (
            <div className="mx-[10px] space-y-[10px]">
                <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                    <Divider>ĐỒNG BỘ</Divider>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-[10px]'>
                        <div>
                            <Spin tip="Đang tải" spinning={isLoadingSyncProduct} size="large">
                                <Card title="Sản phẩm" className='shadow-md'
                                    extra={
                                        <Popconfirm title={"Đồng bộ sản phẩm"}
                                            description={"Bạn có chắn chắn muốn đồng bộ sản phẩm"}
                                            okText={"Đồng ý"} cancelText={"Hủy bỏ"} okType='default'
                                            onConfirm={() => this.handleFuncSync('syncProduct')}>
                                            <Button className='bg-[#0e97ff]'>
                                                <Space className='text-white'>
                                                    <AiOutlineCloudDownload className='text-[20px]' />
                                                    Đồng bộ
                                                </Space>
                                            </Button>
                                        </Popconfirm>
                                    }>
                                    {isResultSyncProduct === null && <></>}
                                    {isResultSyncProduct === false && <>{syncFailed('sản phẩm')}</>}
                                    {isResultSyncProduct && <> {syncSuscess('sản phẩm', dataSyncProduct)}</>}
                                </Card>
                            </Spin>
                        </div>
                    </div>
                </div>
            </div >
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