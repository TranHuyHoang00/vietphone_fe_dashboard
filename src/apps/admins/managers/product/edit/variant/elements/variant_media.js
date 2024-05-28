import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Carousel, Image, Collapse } from 'antd';
import { convertImageToBase64 } from '@utils/handleFuncImage';
import { DeleteOutlined } from '@ant-design/icons';

class variant_media extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onChangeImage = async (valueImage, nameFuntion, indexImage) => {
        const { dataVariant, setDataVariant } = this.props;
        let newDataVariant = { ...dataVariant };
        switch (nameFuntion) {
            case 'create':
                const files = valueImage.target.files;
                for (let i = 0; i < files.length; i++) {
                    const newImage = await convertImageToBase64(valueImage, i);
                    (newDataVariant.media).push({ image: newImage, media_type: 'image', name: dataVariant.name, alt: dataVariant.name });
                }
                break;
            case 'delete':
                (newDataVariant.media).splice(indexImage, 1);
                break;
            default:
                break;
        }
        setDataVariant(newDataVariant);
    }
    render() {
        const { dataVariant, isEdit } = this.props;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Hinh ảnh" key="1">
                    <div className='space-y-[10px] text-center'>
                        <Carousel>
                            {dataVariant && dataVariant.media && dataVariant.media.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Image height={150} width={150} src={item.image} className='object-cover' />
                                        <div >
                                            <Button disabled={!isEdit} onClick={() => this.onChangeImage(null, 'delete', index)}
                                                className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </Carousel>
                        <input id="media_variant" type="file" accept="image/*" hidden
                            onChange={(event) => this.onChangeImage(event, 'create')} />
                        <Button disabled={!isEdit}>
                            <label className='w-full h-full' htmlFor="media_variant">Thêm ảnh</label>
                        </Button>
                    </div>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        isEdit: state.variant.isEdit,
        dataVariant: state.variant.dataVariant,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setDataVariant: (data) => dispatch(actions.setDataVariantRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_media));
