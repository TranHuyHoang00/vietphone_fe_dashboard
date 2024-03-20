import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spin, Card, Button, Dropdown, Image, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { image_to_base64 } from '../../../../../utils/base64';
import { create_media, get_media } from '../../../../../services/media_service';
import Modal_video from '../modals/modal_video';
import modal_video from '../modals/modal_video';
class card_media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_edit: false,
            type_menu: 1,
            data_medias_old: [],
            data_medias_new: [],
            data_product: [],
            modal_video: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_product !== this.props.data_product) {
            let data_product = this.props.data_product;
            this.setState({ data_product: data_product, data_medias_new: data_product.media });
            if (data_product.media && data_product.media.length !== 0) {
                await this.get_list_media(data_product.media);
            }
        }
    }
    get_list_media = async (media) => {
        let data_medias_old = [];
        for (const item of media) {
            let data = await this.get_media(item);
            data_medias_old.push(data);
        }
        this.setState({ data_medias_old: data_medias_old });
    }
    get_media = async (id) => {
        try {
            let data = await get_media(id);
            if (data && data.data && data.data.success == 1) {
                return data.data.data
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        }
    }
    onchange_image = async (event, type, index, id) => {
        let data_medias_old = this.state.data_medias_old;
        if (type == 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await image_to_base64(event, i);
                data_medias_old.push({ image: image_new, media_type: 'image', alt: this.state.data_product.name });
            }
        }
        if (type == 'delete') {
            let data_medias_new = this.state.data_medias_new;
            let data_filter = [];
            if (id !== undefined) {
                data_filter = data_medias_new.filter(item => item !== id);
            }
            data_medias_old.splice(index, 1);
            this.setState({ data_medias_new: data_filter })
        }
        this.setState({ data_medias_old: data_medias_old });
    }
    onclick_edit = async () => {
        this.props.handle_active(2);
        if (this.state.is_edit == true) {
            let data_product = this.state.data_product;
            let media = await this.handle_create_media(this.state.data_medias_old);
            data_product.media = media;
            this.props.handle_edit(data_product);
            this.props.handle_active(0);
            this.setState({ is_edit: false });
        } else {
            this.setState({ is_edit: true, });
        }
    }
    handle_create_media = async (data_medias_old) => {
        try {
            let list_id_new = [];
            let data_medias_new = this.state.data_medias_new;
            for (const item of data_medias_old) {
                if (!item.id) {
                    let data = await create_media(item);
                    if (data && data.data && data.data.success == 1) {
                        list_id_new.push(data.data.data.id);
                    }
                }
            }
            return [...list_id_new, ...data_medias_new];
        } catch (e) {
            message.error('Lỗi hệ thống');
        }
    }
    open_modal = async (name, value) => {
        if (name == 'video') { this.setState({ modal_video: value }); }
    }
    onchange_video = (value) => {
        let data_medias_old = this.state.data_medias_old;
        data_medias_old.push({ external_url: value, media_type: 'video', alt: this.state.data_product.name });
        this.setState({ data_medias_old: data_medias_old });
    }
    render() {
        let is_active = this.props.is_active;
        let is_edit = this.state.is_edit;
        const responsive = {
            desktop: { breakpoint: { max: 3000, min: 640 }, items: 3, slidesToSlide: 2 },
            mobile: { breakpoint: { max: 640, min: 300 }, items: 2, slidesToSlide: 1 }
        };
        let data_medias_old = this.state.data_medias_old;
        const items = [
            { key: '1', label: 'Thêm ảnh' },
            { key: '2', label: 'Thêm video' },
        ];
        let type_menu = this.state.type_menu;
        return (
            <>
                <Spin size='large' spinning={(is_active == 0 || is_active == 2) ? false : true}>
                    <Card title="Hình ảnh sản phẩm"
                        extra={
                            <>
                                {is_active == 2 &&
                                    <Button onClick={() => { this.props.handle_active(0); this.setState({ is_edit: false }) }}
                                        className='bg-[#e94138] text-white '>
                                        Hủy
                                    </Button>
                                }
                                <Button onClick={() => this.onclick_edit()}
                                    className='bg-[#0e97ff] text-white '>
                                    {this.state.is_edit == false ? 'Sửa' : 'Lưu'}
                                </Button>
                            </>
                        }>
                        <div className='space-y-[7px]'>
                            <div className='flex items-center justify-end'>
                                <input id="load_file" type="file" accept="image/*" hidden multiple
                                    onChange={(event) => this.onchange_image(event, 'create')} />
                                <div>
                                    <Dropdown.Button disabled={!is_edit} menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
                                        <div>
                                            {type_menu == 1 && <label htmlFor="load_file">Thêm ảnh</label>}
                                            {type_menu == 2 && <label onClick={() => this.setState({ modal_video: true })}>Thêm video</label>}
                                        </div>
                                    </Dropdown.Button>
                                </div>
                            </div>
                            <Carousel responsive={responsive} swipeable={true} draggable={true}
                                infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                {data_medias_old && data_medias_old.map((item, index) => {
                                    return (
                                        <div key={index} className="slider" >
                                            <div className='space-y-[5px]'>
                                                <div className='w-[140px] h-[140px] flex items-center justify-center'>
                                                    {item.media_type == 'image' &&
                                                        <Image width={140} height={140} className='object-cover' src={item.image} />
                                                    }
                                                    {item.media_type == 'video' &&
                                                        <iframe
                                                            width="140"
                                                            height="140"
                                                            src={item.external_url}
                                                            frameborder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowfullscreen
                                                        >
                                                        </iframe>
                                                    }
                                                </div>
                                                <Button disabled={!is_edit} onClick={() => this.onchange_image(null, 'delete', index, item.id)}
                                                    className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>

                                            </div>
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </div>
                    </Card>
                    <Modal_video modal_video={this.state.modal_video} open_modal={this.open_modal}
                        onchange_video={this.onchange_video} />
                </Spin>
            </>
        );
    }

}
export default withRouter(card_media);