import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Spin } from 'antd';
import TableRevenueDetail from '../component/tableRevenueDetail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
        const { match, getListReportTargetShop, dataFilter } = this.props;
        if (match && match.params) {
            const shopId = match.params.id;
            if (shopId) { await getListReportTargetShop(dataFilter, [shopId]); }
        }
    }
    render() {
        const { dataReportTargetShops, isLoadingReportTargetShop, dataFilter,
            typeActive, dataProductCategorys, isLoadingProductCategory
        } = this.props;
        return (
            <Spin spinning={isLoadingProductCategory || isLoadingReportTargetShop}>
                <div className="mx-[10px] space-y-[10px]">
                    <Button onClick={() => this.props.history.push(`/admin/achieve/target/shop`)}
                        className='bg-[#e94138] text-white'>
                        Quay lại
                    </Button>
                    <TableRevenueDetail typeActive={typeActive} dataFilter={dataFilter}
                        dataReportTargetShops={dataReportTargetShops}
                        dataProductCategorys={dataProductCategorys} />
                </div>
            </Spin>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataReportTargetShops: state.reportTarget.dataReportTargetShops,
        isLoadingReportTargetShop: state.reportTarget.isLoading,

        dataFilter: state.reportTarget.dataFilterShop,
        typeActive: state.reportTarget.typeActiveShop,

        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListReportTargetShop: (dataFilter, listId) => dispatch(actions.getListReportTargetShopRedux(dataFilter, listId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
