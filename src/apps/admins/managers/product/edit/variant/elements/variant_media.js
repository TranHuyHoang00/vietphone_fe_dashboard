import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Carousel, Image, Collapse } from 'antd';
import { convertImageToBase64 } from '@utils/base64';
import { DeleteOutlined } from '@ant-design/icons';

class variant_media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_media_ids: [],
            data_media_raws: [],
        }
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_media_raws !== this.props.data_media_raws) {
            this.setState({ data_media_raws: this.props.data_media_raws });
            this.handle_data_id(this.props.data_media_raws);
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
    onChangeImage = async (event, type, index, id) => {
        let data_media_raws = this.state.data_media_raws;
        let data_media_ids = this.state.data_media_ids;
        if (type === 'create') {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let image_new = await convertImageToBase64(event, i);
                data_media_raws.push({ image: image_new, media_type: 'image', alt: this.props.data_variant.name });
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
    render() {
        let data_media_raws = this.state.data_media_raws;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Hinh ảnh" key="1">
                    <div className='space-y-[10px] text-center'>
                        <Carousel>
                            {data_media_raws && data_media_raws.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Image height={150} width={150} src={item.image} className='object-cover' />
                                        <div >
                                            <Button disabled={!this.props.is_edit} onClick={() => this.onChangeImage(null, 'delete', index, item.id)}
                                                className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                        </div>
                                    </div>

                                )
                            })}
                        </Carousel>
                        <input id="media_variant" type="file" accept="image/*" hidden
                            onChange={(event) => this.onChangeImage(event, 'create')} />
                        <Button disabled={!this.props.is_edit}>
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
        is_edit: state.variant.is_edit,
        data_variant: state.variant.data_variant,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_media));
