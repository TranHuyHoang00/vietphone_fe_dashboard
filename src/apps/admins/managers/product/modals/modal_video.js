import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Typography, Input, message } from 'antd';
class modal_vide0 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link_video: null,
            is_hide_video: false,
        }
    }
    async componentDidMount() {
    }
    handle_onchange_input = (event) => {
        this.setState({ link_video: event.target.value })
    }
    handle_create_video = () => {
        let link_video = this.state.link_video;
        if (link_video === null) {
            message.error("Không được bỏ trống 'Link video");
        } else {
            this.props.onchange_video(link_video);
            this.props.open_modal("video", false);
        }
    }
    onclick_show_video = () => {
        let link_video = this.state.link_video;
        if (link_video === null) {
            message.error("Không được bỏ trống 'Link video");
        } else {
            this.setState({ is_hide_video: true });
        }
    }
    render() {
        return (
            <Modal title="VIDEO" open={this.props.modal_video}
                onCancel={() => this.props.open_modal("video", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("video", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                        <Button onClick={() => this.handle_create_video()}
                            className='bg-[#0e97ff] text-white'>
                            Xác nhận
                        </Button>
                    </>
                ]}>
                <div className="space-y-[10px]">
                    <div className='space-y-[3px]'>
                        <Typography.Text italic strong>
                            Link video
                            <Typography.Text type="danger" strong> *</Typography.Text>
                        </Typography.Text>
                        <div className='flex items-center gap-[5px]'>
                            <Input onChange={(event) => this.handle_onchange_input(event)} />
                            <Button onClick={() => this.onclick_show_video()}>Xem trước</Button>
                        </div>
                        {this.state.is_hide_video &&
                            <div className='flex items-center justify-center'>
                                <iframe title='video_product'
                                    width="100%"
                                    height="250"
                                    src={this.state.link_video}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                >
                                </iframe>
                            </div>
                        }
                    </div>
                </div>

            </Modal>
        );
    }

}
export default withRouter(modal_vide0);