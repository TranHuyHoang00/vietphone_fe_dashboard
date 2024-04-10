import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Button, Dropdown, Image, message, Collapse } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { image_to_base64 } from '../../../../../../../utils/base64';
import { get_media } from '../../../../../../../services/media_service';
import ModalVideo from '../../../modals/modal_video';
class product_media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_edit: false,
            type_menu: 1,
            data_medias: [],
            data_media_ids: [],
            modal_video: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_media_ids !== this.props.data_media_ids) {
            this.setState({ data_media_ids: this.props.data_media_ids });
            if (this.props.data_media_ids && this.props.data_media_ids.length !== 0) {
                await this.get_list_media(this.props.data_media_ids);
            }
        }
    }
    get_list_media = async (media) => {
        let data_medias = [];
        for (const item of media) {
            let data = await this.get_media(item);
            data_medias.push(data);
        }
        this.setState({ data_medias: data_medias });
    }
    get_media = async (id) => {
        try {
            let data = await get_media(id);
            if (data && data.data && data.data.success === 1) {
                return data.data.data
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        }
    }

    onchange_image = async (event, type, index, id) => {
        let data_medias = this.state.data_medias;
        let data_media_ids = this.state.data_media_ids;
        if (type === 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await image_to_base64(event, i);
                data_medias.push({ image: image_new, media_type: 'image', alt: this.props.data_product.name });
            }
        }
        if (type === 'delete') {
            if (id !== undefined) {
                data_media_ids = data_media_ids.filter(item => item !== id);
            }
            data_medias.splice(index, 1);
        }
        this.setState({ data_medias: data_medias, data_media_ids: data_media_ids });
        this.props.handle_get_media(data_medias, data_media_ids);
    }
    open_modal = async (name, value) => {
        if (name === 'video') { this.setState({ modal_video: value }); }
    }
    onchange_video = (value) => {
        let data_medias = this.state.data_medias;
        let data_media_ids = this.state.data_media_ids;
        data_medias.push({ external_url: value, media_type: 'video', alt: this.props.data_product.name });
        this.setState({ data_medias: data_medias });
        this.props.handle_get_media(data_medias, data_media_ids);
    }
    render() {
        const responsive = {
            desktop: { breakpoint: { max: 3000, min: 640 }, items: 3, slidesToSlide: 2 },
            mobile: { breakpoint: { max: 640, min: 300 }, items: 2, slidesToSlide: 1 }
        };
        const items = [
            { key: 1, label: 'Thêm ảnh' },
            { key: 2, label: 'Thêm video' },
        ];
        let is_edit = this.props.is_edit;
        let data_medias = this.state.data_medias;
        let type_menu = this.state.type_menu;
        return (
            <>
                <Collapse defaultActiveKey={['1']}>
                    <Collapse.Panel header="Hình ảnh sản phẩm" key="1">
                        <div className='space-y-[10px]'>
                            <input id="media_product" type="file" accept="image/*" hidden multiple
                                onChange={(event) => this.onchange_image(event, 'create')} />
                            <Dropdown.Button disabled={!is_edit} menu={{ items, onClick: (value) => { this.setState({ type_menu: parseInt(value.key) }) } }}  >
                                <div>
                                    {type_menu === 1 && <label htmlFor="media_product">Thêm ảnh</label>}
                                    {type_menu === 2 && <label onClick={() => this.setState({ modal_video: true })}>Thêm video</label>}
                                </div>
                            </Dropdown.Button>
                            <Carousel responsive={responsive} swipeable={true} draggable={true}
                                infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                {data_medias && data_medias.map((item, index) => {
                                    return (
                                        <div key={index} className="slider" >
                                            <div className='space-y-[5px]'>
                                                <div className='w-[140px] h-[140px] flex items-center justify-center'>
                                                    {item.media_type === 'image' &&
                                                        <Image width={140} height={140} className='object-cover' src={item.image} />
                                                    }
                                                    {item.media_type === 'video' &&
                                                        <iframe title='product_media'
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
                    </Collapse.Panel>
                </Collapse>
                <ModalVideo modal_video={this.state.modal_video} open_modal={this.open_modal}
                    onchange_video={this.onchange_video} />
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        is_edit: state.product.is_edit,
        data_product: state.product.data_product,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_product: (event, id, type) => dispatch(actions.on_change_product_redux(event, id, type)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_media));