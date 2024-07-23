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
            dropButtonType: 1,
            modalVideo: false,
        }
    }
    async componentDidMount() {
    }
    onChangeImage = async (valueImage, nameFuntion, indexImage) => {
        const { dataProduct, setDataProduct } = this.props;
        let newDataProduct = { ...dataProduct };
        switch (nameFuntion) {
            case 'create':
                const files = valueImage.target.files;
                for (let i = 0; i < files.length; i++) {
                    const newImage = await convertImageToBase64(valueImage, i);
                    (newDataProduct.media).push({ image: newImage, media_type: 'image', name: dataProduct.name, alt: dataProduct.name });
                }
                break;
            case 'delete':
                (newDataProduct.media).splice(indexImage, 1);
                break;
            default:
                break;
        }
        setDataProduct(newDataProduct);
    }
    openModal = (modalName, modalValue) => {
        switch (modalName) {
            case 'video':
                this.setState({ modalVideo: modalValue });
                break;
            default:
                break;
        }
    }
    onChangeVideo = (valueVideo) => {
        const { dataProduct, setDataProduct } = this.props;
        let newDataProduct = { ...dataProduct };
        (newDataProduct.media).push({ external_url: valueVideo, media_type: 'video', name: dataProduct.name, alt: dataProduct.name });
        setDataProduct(newDataProduct);
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
        const { dropButtonType, modalVideo } = this.state;
        const { dataProduct, isEdit } = this.props;
        const itemCollapses = [
            {
                key: '1',
                label: 'Hình ảnh sản phẩm',
                children:
                    <div className='space-y-[10px]'>
                        <input id="mediaProduct" type="file" accept="image/*" hidden multiple
                            onChange={(event) => this.onChangeImage(event, 'create')} />
                        <Dropdown.Button disabled={!isEdit} menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                            <div>
                                {dropButtonType === 1 && <label htmlFor="mediaProduct">Thêm ảnh</label>}
                                {dropButtonType === 2 && <label onClick={() => this.setState({ modalVideo: true })}>Thêm video</label>}
                            </div>
                        </Dropdown.Button>
                        {dataProduct && dataProduct.media && dataProduct.media.length !== 0 &&
                            <Carousel responsive={responsive} swipeable={true} draggable={true}
                                infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                {dataProduct.media.map((item, index) => {
                                    return (
                                        <div key={index} className="slider" >
                                            <div className='space-y-[5px]'>
                                                <div className='w-[140px] h-[140px] flex items-center justify-center'>
                                                    {item.media_type === 'image' &&
                                                        <Image width={140} height={140} className='object-cover' src={item?.image} />
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
                                                <Button disabled={!isEdit} onClick={() => this.onChangeImage(null, 'delete', index)}
                                                    className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>

                                            </div>
                                        </div>
                                    );
                                })}
                            </Carousel>
                        }
                    </div>
            }
        ];
        return (
            <>
                <Collapse defaultActiveKey={[1]} items={itemCollapses}></Collapse>
                {modalVideo &&
                    <ModalVideo modalVideo={modalVideo} openModal={this.openModal}
                        onChangeVideo={this.onChangeVideo} />}
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
        onChangeProduct: (event, id) => dispatch(actions.onChangeProductRedux(event, id)),
        setDataProduct: (id) => dispatch(actions.setDataProductRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_media));