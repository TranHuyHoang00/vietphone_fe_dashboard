import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalWebCam from './modals/web_cam';
import { Card, Collapse, Avatar, Typography, Timeline, Image } from 'antd';
import AvatarNone from '@assets/images/avatar_none.jpg';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_webcam: false,
        }
    }
    async componentDidMount() {
    }
    open_modal = async (name, value, id) => {
        if (name === 'web_cam') {
            this.setState({ modal_webcam: value });
        }

    }

    render() {

        return (
            <>
                <div className="mx-[10px] space-y-[10px]">
                    <Collapse defaultActiveKey={['1']}>
                        <Collapse.Panel header="Hôm nay" key="1">
                            <div>
                                <div className='flex items-start space-x-[10px]'>
                                    <Avatar size={60} src={AvatarNone} />
                                    <span className='font-medium'>Trần Huy Hoàng</span>
                                </div>
                                <div>
                                    <Timeline
                                        mode='right'
                                        items={[
                                            {
                                                label: (
                                                    <div className='border p-[5px] flex items-start space-x-[5px] shadow-sm rounded-[5px]'>
                                                        <Image width={50} height={50} src={AvatarNone} />
                                                        <div>
                                                            <Typography.Text strong>12:30:12 - 05/06/2024</Typography.Text>
                                                        </div>
                                                    </div>
                                                ),
                                                children: 'Vào ca',
                                                // dot: (
                                                //     <Avatar size={30} src={AvatarNone} />
                                                // ),
                                            },
                                            {
                                                label: '2015-09-01 09:12:11',
                                                children: 'Ra ca',
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                </div>
                {/* <div>
                        <button onClick={() => this.open_modal('web_cam', true)}>Chụp ảnh</button>
                    </div>
                {this.state.modal_webcam &&
                    <ModalWebCam modal_webcam={this.state.modal_webcam}
                        open_modal={this.open_modal} />} */}
            </>
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
