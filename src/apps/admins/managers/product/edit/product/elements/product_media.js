import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Button, Dropdown, Image, Collapse } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { image_to_base64 } from '../../../../../../../utils/base64';
import ModalVideo from '../../../modals/modal_video';
class product_media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_edit: false,
            type_menu: 1,
            modal_video: false,

            data_media_raws: [],
            data_media_ids: [],
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_media_raws !== this.props.data_media_raws) {
            this.handle_data_id(this.props.data_media_raws);
            this.setState({
                data_media_raws: this.props.data_media_raws,
            })
        }
    }
    handle_data_id = (data) => {
        let data_media_ids = [];
        if (data && data.length !== 0) {
            for (const item of data) {
                data_media_ids.push(item.id);
            }
        }
        this.setState({
            data_media_ids: data_media_ids,
        })
    }
    onchange_image = async (event, type, index, id) => {
        let data_media_raws = this.state.data_media_raws;
        let data_media_ids = this.state.data_media_ids;

        if (type === 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await image_to_base64(event, i);
                data_media_raws.push({ image: image_new, media_type: 'image', alt: this.props.data_product.name });
            }
        }
        if (type === 'delete') {
            if (id !== undefined) {
                data_media_ids = data_media_ids.filter(item => item !== id);
            }
            data_media_raws.splice(index, 1);
        }
        this.setState({ data_media_raws: data_media_raws, data_media_ids: data_media_ids });
        this.props.get_data_media(data_media_ids, data_media_raws);
    }
    open_modal = async (name, value) => {
        if (name === 'video') { this.setState({ modal_video: value }); }
    }
    onchange_video = (value) => {
        let data_media_raws = this.state.data_media_raws;
        let data_media_ids = this.state.data_media_ids;
        data_media_raws.push({ external_url: value, media_type: 'video', alt: this.props.data_product.name });
        this.setState({ data_media_raws: data_media_raws });
        this.props.get_data_media(data_media_ids, data_media_raws);
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
        let type_menu = this.state.type_menu;
        let data_media_raws = this.state.data_media_raws;
        return (
            <>
                <Collapse defaultActiveKey={[1]}>
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
                            {data_media_raws && data_media_raws.length !== 0 &&
                                <Carousel responsive={responsive} swipeable={true} draggable={true}
                                    infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                    {data_media_raws && data_media_raws.map((item, index) => {
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
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
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
                            }
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