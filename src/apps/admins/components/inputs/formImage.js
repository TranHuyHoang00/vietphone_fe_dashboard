import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Image } from 'antd';
import { convertImageToBase64 } from '@utils/handleFuncImage';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    onChangeImageInput = async (image) => {
        const { htmlFor, variable, onChangeInput, onChangeImage } = this.props;
        const imageNew = await convertImageToBase64(image);
        switch (htmlFor) {
            case 'loadImageCreate':
                onChangeInput(imageNew, variable);
                break;
            case 'loadImageCreateBg':
                onChangeInput(imageNew, variable);
                break;
            case 'loadImageEdit':
                onChangeImage(imageNew);
                break;
            case 'loadImageEditBg':
                onChangeImage(imageNew);
                break;
            default:
                return;
        }
    }
    render() {
        const { name, important, width, height, value, htmlFor } = this.props;
        return (
            <div className='space-y-[3px]'>
                <Typography.Text italic strong>
                    {name}
                    {important && <Typography.Text type="danger" strong> *</Typography.Text>}
                </Typography.Text>
                <div className='flex items-center justify-center'>
                    <div className='space-y-[5px]'>
                        <Image width={width} height={height} className='object-cover' src={value} />
                        <input id={htmlFor} type="file" accept="image/*" hidden
                            onChange={(image) => this.onChangeImageInput(image)} />
                        <div className='text-center'>
                            <label htmlFor={htmlFor}
                                className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
                                Thêm ảnh
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withRouter(index);