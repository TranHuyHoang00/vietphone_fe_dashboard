import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import TableRevenueDetail from '../component/tableRevenueDetail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReportTargetShops: [],
        }
    }
    async componentDidMount() {
        const { match, dataReportTargetShops } = this.props;
        if (match && match.params) {
            const shopId = match.params.id;
            if (shopId) {
                // eslint-disable-next-line
                const dataReportTargetShop = dataReportTargetShops.find(item => item?.shop?.id == shopId);
                this.setState({ dataReportTargetShops: [dataReportTargetShop] });
            }
        }
    }
    render() {
        const { dataReportTargetShops } = this.state;
        return (
            <div className="mx-[10px] space-y-[10px]">
                <Button
                    onClick={() => this.props.history.push(`/admin/achieve/target/shop`)}
                    className='bg-[#e94138] text-white'>
                    Quay lại
                </Button>
                <div id='tableReportTargetShop'>
                    <TableRevenueDetail dataReportTargetShops={dataReportTargetShops} />
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataReportTargetShops: state.reportTarget.dataReportTargetShops,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
