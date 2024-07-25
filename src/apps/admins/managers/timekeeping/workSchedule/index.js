import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataWorkSchedules: [
                {
                    id: 1,
                    shop: { id: 1, name: 'VIET PHONE 16' },
                    workSchedule: [
                        {
                            id: 1,
                            staff: { id: 1, name: 'LÊ THỊ TÚ SƯƠNG' },
                            workSchedule: [
                                {
                                    id: 1,
                                    date: '2024-07-01',
                                    shift: { id: 1, name: 'Làm' }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div className="mx-[10px] space-y-[10px]">
                <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-sm'>

                </div>
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
