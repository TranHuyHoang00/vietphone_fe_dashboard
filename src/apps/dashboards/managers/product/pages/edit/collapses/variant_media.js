import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { message, Button, Carousel, Image, Collapse } from 'antd';
import { get_media } from '../../../../../../../services/media_service';
import { image_to_base64 } from '../../../../../../../utils/base64';
import { DeleteOutlined } from '@ant-design/icons';

class variant_media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_medias: [],
            data_media_ids: [],
        }
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_medias !== this.props.data_medias) {
            let data_medias = this.props.data_medias;
            this.setState({ data_media_ids: data_medias });
            if (data_medias && data_medias.length !== 0) {
                await this.get_list_media(data_medias);
            } else {
                this.setState({ data_medias: [] })
            }
        }
    }
    get_list_media = async (media) => {
        let data_medias = [];
        for (const id of media) {
            let data = await this.get_media(id);
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
                data_medias.push({ image: image_new, media_type: 'image', alt: this.props.data_variant.name });
            }
        }
        if (type === 'delete') {
            if (id !== undefined) {
                data_media_ids = data_media_ids.filter(item => item !== id);
            }
            data_medias.splice(index, 1);
        }
        this.setState({ data_medias: data_medias, data_media_ids: data_media_ids });
        this.props.handle_data_media(data_medias, data_media_ids);
    }
    render() {
        let data_medias = this.state.data_medias;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Hinh ảnh" key="1">
                    <div className='space-y-[10px] text-center'>
                        <Carousel>
                            {data_medias && data_medias.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Image height={150} width={150} src={item.image} className='object-cover' />
                                        <div >
                                            <Button disabled={!this.props.is_edit} onClick={() => this.onchange_image(null, 'delete', index, item.id)}
                                                className='bg-[#e94138] text-white' icon={<DeleteOutlined />}
                                            ></Button>
                                        </div>
                                    </div>

                                )
                            })}
                        </Carousel>
                        <input id="media_variant" type="file" accept="image/*" hidden
                            onChange={(event) => this.onchange_image(event, 'create')} />
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
