import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Webcam from "react-webcam";
import { Modal, message, Button } from 'antd';
import dayjs from 'dayjs';
class web_cam extends Component {
    constructor(props) {
        super(props);
        this.webcamRef = React.createRef();
        this.canvasRef = React.createRef();

        this.state = {
            data_create: {
                image: '',
                address: '',
            },
            is_capture: false,
        }
    }
    async componentDidMount() {
        this.get_location_current();
        this.get_date_time();
    }
    get_location_current = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
                        const data = await response.json();
                        this.setState({
                            data_create: {
                                ...this.state.data_create,
                                address: data.display_name,
                            }
                        })
                    } catch (error) {
                        message.error('Gặp lỗi khi lấy vị trí Map');
                    }
                },
                (error) => {
                    message.error('Trình duyệt không hỗ trợ lấy vị trí Map');
                }
            );
        } else {

        }
    }
    get_date_time = () => {
        let date_time = dayjs().format('HH:mm:ss - DD/MM/YYYY');
        return date_time;
    }
    capture_image = () => {
        let data_create = this.state.data_create;
        let data_image = this.webcamRef.current.getScreenshot();
        if (data_image) { this.drawOnCanvas(data_image, this.get_date_time(), data_create?.address); }
    };
    re_capture_image = () => {
        this.get_location_current();
        this.setState({
            data_create: {
                image: '',
                address: '',
            },
            is_capture: false,
        });
    }

    wrapText = (context, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let offsetY = y;
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, offsetY);
                line = words[n] + ' ';
                offsetY += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, offsetY);
    }
    drawOnCanvas(data_image, time, text) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = data_image;

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            const maxWidth = canvas.width - 10;
            const lineHeight = 20;
            const x = 5;
            let y = 40;
            ctx.font = '14px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(time, 5, 20);

            this.wrapText(ctx, text, x, y, maxWidth, lineHeight);
            const image_new = canvas.toDataURL();
            this.setState({
                data_create: {
                    ...this.state.data_create,
                    image: image_new,
                },
                is_capture: true,
            });
        };
    }
    render() {
        const videoConstraints = {
            width: 400,
            height: 400,
            facingMode: "environment"
        };
        let data_create = this.state.data_create;
        return (
            <>
                <Modal title="VÀO CA" open={this.props.modal_webcam}
                    onCancel={() => this.props.openModal("web_cam", false)} width={400}
                    footer={[
                        <>
                            <Button
                                className='bg-[#e94138] text-white'>
                                Hủy bỏ
                            </Button>
                            <Button
                                className='bg-[#0e97ff] text-white'>
                                Xác nhận
                            </Button>
                        </>
                    ]}>
                    <div className='space-y-[10px] '>
                        <div className=' flex items-center justify-center'>
                            {this.state.is_capture ?
                                <img src={data_create?.image} className='object-cover' alt='web cam' />
                                :
                                <div className='relative shadow-sm'>
                                    <Webcam
                                        audio={false}
                                        ref={this.webcamRef}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints} />
                                    <div className='absolute bottom-0 left-0 text-white p-[10px]'>
                                        <span>{this.get_date_time()}</span><br />
                                        <span>{data_create?.address}</span>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='text-center'>
                            {this.state.is_capture ?
                                <Button className='bg-green-600 text-white'
                                    onClick={() => this.re_capture_image()}>Chụp lại</Button>
                                :
                                <Button className='bg-green-600 text-white'
                                    onClick={() => this.capture_image()}>Chụp ảnh</Button>
                            }
                        </div>
                    </div>
                </Modal>
                <canvas ref={this.canvasRef} style={{ display: 'none' }} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(web_cam));