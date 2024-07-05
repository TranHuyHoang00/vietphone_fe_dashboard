import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Typography, Input, message } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkVideo: null,
            isShowVideo: false,
        }
    }
    async componentDidMount() {
    }
    onChangeInput = (event) => {
        this.setState({ linkVideo: event.target.value })
    }
    handleCreateVideo = () => {
        const { linkVideo } = this.state;
        const { onChangeVideo, openModal } = this.props;
        if (linkVideo === null) {
            message.error("Không được bỏ trống 'Link video");
        } else {
            onChangeVideo(linkVideo);
            openModal("video", false);
        }
    }
    onClickShowVideo = () => {
        const { linkVideo } = this.state;
        if (linkVideo === null) {
            message.error("Không được bỏ trống 'Link video");
        } else {
            this.setState({ isShowVideo: true });
        }
    }
    render() {
        const { modalVideo, openModal } = this.props;
        const { isShowVideo, linkVideo } = this.state;
        return (
            <Modal title="VIDEO" open={modalVideo}
                onCancel={() => openModal("video", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => openModal("video", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                        <Button onClick={() => this.handleCreateVideo()}
                            className='bg-[#0e97ff] dark:bg-white text-white'>
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
                            <Input onChange={(event) => this.onChangeInput(event)} />
                            <Button onClick={() => this.onClickShowVideo()}>Xem trước</Button>
                        </div>
                        {isShowVideo &&
                            <div className='flex items-center justify-center'>
                                <iframe title='video_product'
                                    width="100%"
                                    height="250"
                                    src={linkVideo}
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
export default withRouter(index);