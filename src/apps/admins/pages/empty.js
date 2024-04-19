import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class empty extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div className='bg-white'>

            </div>
        );
    }

}
export default withRouter(empty);
