import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Collapse, Button, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import data_react_quill from '../../../datas/data_react_quill';
class card_content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value_quill: '',
            data_product: {},
        }
    }
    componentDidMount() {

    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_product !== this.props.data_product) {
            let description = this.props.data_product.description;
            if (description == '') {
                this.setState({
                    value_quill: data_react_quill,
                })
            } else {
                this.setState({
                    value_quill: description,
                })
            }
        }
    }
    handle_save = () => {
        this.props.handle_onchange_input(this.state.value_quill, "description", 'select');
        message.success('Thành công');
    }
    render() {
        console.log();
        return (
            <Card title={'Mô tả sản phẩm'}
                extra={
                    <>
                        <Button disabled={!this.props.is_edit}
                            onClick={() => this.handle_save()} className='bg-[#0e97ff] text-white'>
                            Lưu
                        </Button>
                    </>
                }>
                <Collapse >
                    <Collapse.Panel header="Xem chi tiết" key="1">
                        <ReactQuill theme="snow"
                            modules={card_content.modules}
                            formats={card_content.formats}
                            bounds={'.app'}
                            value={this.state.value_quill}
                            onChange={(value) => { this.setState({ value_quill: value }) }}
                        />
                    </Collapse.Panel>
                </Collapse>

            </Card>
        );
    }

}
export default withRouter(card_content);
card_content.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}

card_content.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]
