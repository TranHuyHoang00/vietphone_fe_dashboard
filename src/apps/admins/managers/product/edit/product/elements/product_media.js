import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Dropdown, Image, Collapse } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { convertImageToBase64 } from '@utils/handleFuncImage';
import ModalVideo from '../../../modals/modal_video';
class product_media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            dropButtonType: 1,
            modal_video: false,

            data_media_raws: [],
            dataMediaIds: [],
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
        let dataMediaIds = [];
        if (data && data.length !== 0) {
            for (const item of data) {
                dataMediaIds.push(item.id);
            }
        }
        this.setState({
            dataMediaIds: dataMediaIds,
        })
    }
    onChangeImage = async (event, type, index, id) => {
        let data_media_raws = this.state.data_media_raws;
        let dataMediaIds = this.state.dataMediaIds;

        if (type === 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await convertImageToBase64(event, i);
                data_media_raws.push({ image: image_new, media_type: 'image', alt: this.props.dataProduct.name });
            }
        }
        if (type === 'delete') {
            if (id !== undefined) {
                dataMediaIds = dataMediaIds.filter(item => item !== id);
            }
            data_media_raws.splice(index, 1);
        }
        this.setState({ data_media_raws: data_media_raws, dataMediaIds: dataMediaIds });
        this.props.get_data_media(dataMediaIds, data_media_raws);
    }
    openModal = async (name, value) => {
        if (name === 'video') { this.setState({ modal_video: value }); }
    }
    onchange_video = (value) => {
        let data_media_raws = this.state.data_media_raws;
        let dataMediaIds = this.state.dataMediaIds;
        data_media_raws.push({ external_url: value, media_type: 'video', alt: this.props.dataProduct.name });
        this.setState({ data_media_raws: data_media_raws });
        this.props.get_data_media(dataMediaIds, data_media_raws);
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
        let isEdit = this.props.isEdit;
        let dropButtonType = this.state.dropButtonType;
        let data_media_raws = this.state.data_media_raws;
        return (
            <>
                <Collapse defaultActiveKey={[1]}>
                    <Collapse.Panel header="Hình ảnh sản phẩm" key="1">
                        <div className='space-y-[10px]'>
                            <input id="media_product" type="file" accept="image/*" hidden multiple
                                onChange={(event) => this.onChangeImage(event, 'create')} />
                            <Dropdown.Button disabled={!isEdit} menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                <div>
                                    {dropButtonType === 1 && <label htmlFor="media_product">Thêm ảnh</label>}
                                    {dropButtonType === 2 && <label onClick={() => this.setState({ modal_video: true })}>Thêm video</label>}
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
                                                    <Button disabled={!isEdit} onClick={() => this.onChangeImage(null, 'delete', index, item.id)}
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
                <ModalVideo modal_video={this.state.modal_video} openModal={this.openModal}
                    onchange_video={this.onchange_video} />
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        isEdit: state.product.isEdit,
        dataProduct: state.product.dataProduct,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_product: (event, id, type) => dispatch(actions.onChangeProductRedux(event, id, type)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_media));