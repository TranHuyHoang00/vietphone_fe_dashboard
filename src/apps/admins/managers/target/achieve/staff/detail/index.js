import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import TableRevenueDetail from '../component/tableRevenueDetail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReportTargetStaffs: [],
        }
    }
    async componentDidMount() {
        const { match, dataReportTargetStaffs } = this.props;
        if (match && match.params) {
            const shopId = match.params.id;
            if (shopId) {
                // eslint-disable-next-line
                const dataReportTargetStaff = dataReportTargetStaffs.find(item => item?.staff?.id == shopId);
                this.setState({ dataReportTargetStaffs: [dataReportTargetStaff] });
            }
        }
    }
    render() {
        const { dataReportTargetStaffs } = this.state;
        return (
            <div className="mx-[10px] space-y-[10px]">
                <Button onClick={() => this.props.history.push(`/admin/achieve/target/staff`)}
                    className='bg-[#e94138] text-white'>
                    Quay lại
                </Button>
                <div id='tableReportTargetStaff'>
                    <TableRevenueDetail dataReportTargetStaffs={dataReportTargetStaffs} />
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataReportTargetStaffs: state.reportTarget.dataReportTargetStaffs,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
