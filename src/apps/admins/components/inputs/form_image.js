import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Image } from 'antd';
import { image_to_base64 } from '@utils/base64';
class form_image extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    onchange_image = async (image) => {
        let image_new = await image_to_base64(image);
        if (this.props.htmlFor === 'load_file_create') {
            this.props.handle_onchange_input(image_new, this.props.variable)
        }
        if (this.props.htmlFor === 'load_file_edit') {
            this.props.onchange_image(image_new);
        }
    }
    render() {
        return (
            <div className='space-y-[3px]'>
                <Typography.Text italic strong>
                    {this.props.name}
                    {this.props.important && <Typography.Text type="danger" strong> *</Typography.Text>}
                </Typography.Text>
                <div className='flex items-center justify-center'>
                    <div className='space-y-[5px]'>
                        <Image width={this.props.width} height={this.props.height} className='object-cover' src={this.props.value} />
                        <input id={this.props.htmlFor} type="file" accept="image/*" hidden
                            onChange={(image) => this.onchange_image(image, this.props.variable)} />
                        <div className='text-center'>
                            <label htmlFor={this.props.htmlFor}
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
export default withRouter(form_image);