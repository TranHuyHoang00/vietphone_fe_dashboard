import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Button, Space, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { image_to_base64 } from '../../../../../../../utils/base64';
class select_images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_images: [],
        }
    }
    async componentDidMount() {
    }
    onchange_image = async (event, type, index) => {
        let data_images = this.state.data_images;
        if (type == 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await image_to_base64(event, i);
                data_images.push(image_new);
            }
        }
        if (type == 'delete') {
            data_images.splice(index, 1);
        }
        this.setState({ data_images: data_images });
    }
    render() {
        const responsive = {
            desktop: { breakpoint: { max: 3000, min: 640 }, items: 3, slidesToSlide: 2 },
            mobile: { breakpoint: { max: 640, min: 300 }, items: 2, slidesToSlide: 1 }
        };
        let data_images = this.state.data_images;
        return (
            <div className='space-y-[3px]'>
                <div>
                    <Typography.Text italic strong>Hỉnh ảnh</Typography.Text>
                </div>
                <div className='space-y-[10px]'>
                    <input id="load_file" type="file" accept="image/*" hidden multiple
                        onChange={(event) => this.onchange_image(event, 'create')} />
                    <div className='text-center'>
                        <label htmlFor="load_file"
                            className='border bg-[#1677ff] text-white px-[10px] py-[3px] cursor-pointer '>
                            Thêm ảnh
                        </label>
                    </div>
                    <Carousel responsive={responsive} swipeable={true} draggable={true} showDots={true}
                        infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                        {data_images && data_images.map((item, index) => {
                            return (
                                <div key={index} className="slider" >
                                    <div className='relative'>
                                        <Image width={150} height={150} className='object-cover' src={item} />
                                        <div className='absolute top-0'>
                                            <Button onClick={() => this.onchange_image(null, 'delete', index)}
                                                className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </div>
        );
    }

}
export default withRouter(select_images);