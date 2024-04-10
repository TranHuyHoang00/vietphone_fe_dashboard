import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import CardVisitPurchase from './cards/card_visit_purchase';
import CardEvaluateComment from './cards/card_evaluate_comment';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
    }

    render() {
        return (
            <div className="mx-[10px] space-y-[10px]">
                <CardEvaluateComment />
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));