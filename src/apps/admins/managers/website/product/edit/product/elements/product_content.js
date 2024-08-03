import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '@actions';
import { connect } from 'react-redux';
import { Collapse, Button, Image, Spin, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { moduleQuills, formatQuills } from '@datas/dataModuleReactQuill';
import '../../../statics/product.css';
import Quill from 'quill';
import { LuPin, LuPinOff } from "react-icons/lu";
import { convertImageToBase64 } from '@utils/handleFuncImage';
import { AiFillCopy, AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { createMedia } from '@services/website/mediaServices';
import { showNotification } from '@utils/handleFuncNotification';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToolbarFixed: false,
            isImageFixed: false,
            dataImages: [],
            isLoadingImage: false,
        }
        this.quillRef = createRef();
    }
    componentDidMount() {
        document.querySelectorAll(".ql-picker").forEach(tool => {
            tool.addEventListener("mousedown", function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        });
    }
    componentDidUpdate() {
        document.querySelectorAll(".ql-picker").forEach(tool => {
            tool.addEventListener("mousedown", function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        });
    }
    toggleToolbarFixed = (event) => {
        event.stopPropagation();
        this.setState({ isToolbarFixed: !this.state.isToolbarFixed });
    };
    toggleImageFixed = (event) => {
        event.stopPropagation();
        this.setState({ isImageFixed: !this.state.isImageFixed });
    };

    handleImageFromURL = () => {
        const url = prompt('Bỏ đường dẫn hình ảnh vào đây');
        if (url) {
            const quill = this.quillRef.current.getEditor();
            const range = quill.getSelection();

            if (range) {
                const { dataProduct } = this.props;
                quill.insertEmbed(range.index, 'image', url, Quill.sources.USER);
                const img = quill.container.querySelector(`img[src="${url}"]`);
                if (img) {
                    img.setAttribute('alt', dataProduct?.name || '');
                    img.setAttribute('title', dataProduct?.name || '');
                }
            }
        }
    };
    getModules = () => ({
        toolbar: {
            container: moduleQuills.toolbar,
            handlers: {
                'image': this.handleImageFromURL
            }
        },
        clipboard: moduleQuills.clipboard
    });

    onChangeImage = async (valueImage, nameFuntion, indexImage) => {
        const { dataImages } = this.state;
        const { dataProduct } = this.props;
        const newDataImages = [...dataImages];
        switch (nameFuntion) {
            case 'create':
                const files = valueImage.target.files;
                for (let i = 0; i < files.length; i++) {
                    const newImage = await convertImageToBase64(valueImage, i);
                    newDataImages.push({ image: newImage, media_type: 'image', name: dataProduct?.name, alt: dataProduct?.name });
                }
                break;
            case 'delete':
                newDataImages.splice(indexImage, 1);
                break;
            default:
                break;
        }
        this.setState({ dataImages: newDataImages })
    }
    createMediaHandler = async (media) => {
        try {
            const response = await createMedia(media);
            if (response && response.data && response.data.success === 1) {
                return response.data.data;
            }
        } catch (error) {
            showNotification(error);
        }
    };
    handleCreateMediaForAll = async () => {
        this.setState({ isLoadingImage: true })
        const { dataImages } = this.state;
        if (!dataImages || dataImages.length === 0) return;
        const mediaToCreate = dataImages
            .filter(media => !media.id)
            .map(media => this.createMediaHandler(media));
        const mediaResults = await Promise.all(mediaToCreate);
        const updatedDataImages = dataImages.map(media =>
            media.id ? media : mediaResults.shift()
        );
        this.setState({ dataImages: updatedDataImages, isLoadingImage: false });
        message.success('Thành công');
    };
    handleCoppy = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            message.info('Sao chép');
        } catch (err) {
            message.error('Lỗi sao chép');
        }
    }
    render() {
        const { isEdit, description, onChangeProductDescription } = this.props;
        const { isToolbarFixed, isImageFixed, dataImages, isLoadingImage } = this.state;
        const itemCollapses = [
            {
                key: '1',
                label: 'Thông tin sản phẩm',
                extra:
                    <div className='flex items-center'>
                        <Button className='bg-[#0e97ff] dark:bg-white'
                            onClick={(event) => this.toggleToolbarFixed(event)}>
                            <div className='flex items-center space-x-[5px] text-white dark:text-black'>
                                {isToolbarFixed ? <LuPinOff /> : <LuPin />}
                                <span >Menu</span>
                            </div>
                        </Button>
                        <Button className='bg-[#0e97ff] dark:bg-white'
                            onClick={(event) => this.toggleImageFixed(event)}>
                            <div className='flex items-center space-x-[5px] text-white dark:text-black'>
                                {isImageFixed ? <LuPinOff /> : <LuPin />}
                                <span >Ảnh</span>
                            </div>
                        </Button>
                    </div>,
                children: <div className={`editor-container ${isToolbarFixed ? 'toolbar-fixed' : ''}`}>
                    <ReactQuill theme="snow" readOnly={!isEdit}
                        ref={this.quillRef}
                        modules={this.getModules()}
                        formats={formatQuills}
                        bounds={'.editor-container'}
                        value={description}
                        onChange={(value) => onChangeProductDescription(value)}
                    />
                </div>
            }
        ]
        return (
            <>
                {isImageFixed &&
                    <div class="fixed top-1/2 right-0 w-[200px] h-[200px] z-50 border bg-white">
                        <Spin spinning={isLoadingImage}>
                            <div className='h-[30px]'>
                                <input id="mediaProductContent" type="file" accept="image/*" hidden multiple
                                    onChange={(event) => this.onChangeImage(event, 'create')} />
                                <div className='flex items-center justify-between p-[2px]'>
                                    <Button className='bg-[#0e97ff] dark:bg-white'
                                        size='small'>
                                        <label className='text-white dark:text-black' htmlFor="mediaProductContent">Thêm ảnh</label>
                                    </Button>
                                    {dataImages && dataImages.length !== 0 &&
                                        <Button onClick={() => this.handleCreateMediaForAll()}
                                            className='bg-green-500 dark:bg-white '
                                            size='small'>
                                            <span className='text-white'>Tạo ảnh</span>
                                        </Button>
                                    }
                                    <Button onClick={() => this.setState({ isImageFixed: false })}
                                        className='bg-red-500 dark:bg-white' size='small'>
                                        <AiOutlineClose className='text-white' />
                                    </Button>
                                </div>
                            </div>
                            <div className='h-[170px] overflow-y-auto'>
                                <div className='grid grid-cols-2 gap-[5px] p-[5px]'>
                                    {dataImages && dataImages.map((item, index) => {
                                        return (
                                            <div className='flex space-x-[5px]' key={index}>
                                                <Image width={50} height={50} src={item?.image} className='object-cover' />
                                                <div>
                                                    <Button onClick={() => this.onChangeImage(null, 'delete', index)}
                                                        className='bg-red-600 ' size='small'>
                                                        <AiFillDelete className='text-white' />
                                                    </Button>
                                                    {item?.id &&
                                                        <Button onClick={() => this.handleCoppy(item?.image)}
                                                            className='bg-blue-500' size='small'>
                                                            <AiFillCopy className='text-white' />
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Spin>
                    </div>
                }
                <Collapse defaultActiveKey={[1]} items={itemCollapses}></Collapse>
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        isEdit: state.product.isEdit,
        description: state.product.description,
        dataProduct: state.product.dataProduct,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onChangeProductDescription: (value) => dispatch(actions.onChangeProductDescriptionRedux(value)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
