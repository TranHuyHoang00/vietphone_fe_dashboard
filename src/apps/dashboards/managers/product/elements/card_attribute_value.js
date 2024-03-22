import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'antd';
import Modal_attribute_value from '../modals/modal_attribute_value';
import Table_attribute_value from '../components/table/table_attribute_value';
class card_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_attribute_value: false,
            data_attribute_value_ids: [],
            data_raw: [
                {
                    id: 1, value: "6.8 inches",
                    attribute: {
                        id: 1,
                        name: 'Kích thước màn hình',
                        group_attribute: {
                            id: 1,
                            name: 'Màn hình'
                        }
                    }
                },
                {
                    id: 2, value: "Dynamic AMOLED 2X",
                    attribute: {
                        id: 2,
                        name: 'Công nghệ màn hình',
                        group_attribute: {
                            id: 1,
                            name: 'Màn hình'
                        }
                    }
                },
                {
                    id: 3, value: "Dynamic AMOLED 2X",
                    attribute: {
                        id: 3,
                        name: 'Công nghệ màn hình',
                        group_attribute: {
                            id: 2,
                            name: 'Camera sau'
                        }
                    }
                }
            ],
            data_attribute_values: [

            ],
        }
    }
    async componentDidMount() {
        this.handle_data(this.state.data_raw);
    }

    handle_data = async (original_data) => {
        let unique_ids = new Set();
        let unique_datas = [];
        original_data.forEach(obj => {
            if (!unique_ids.has(obj.attribute.group_attribute.id)) {
                unique_ids.add(obj.attribute.group_attribute.id);
                unique_datas.push(obj.attribute.group_attribute);
            }
        });
        let mapA = new Map(unique_datas.map(obj => [obj.id, obj]));
        original_data.forEach(objB => {
            if (mapA.has(objB.attribute.group_attribute.id)) {
                let objA = mapA.get(objB.attribute.group_attribute.id);
                if (!objA.data) objA.data = [];
                objA.data.push(objB);
            }
        });
        this.setState({ data_attribute_values: unique_datas })
    }
    open_modal = async (name, value, id) => {
        if (name == 'attribute_value') { this.setState({ modal_attribute_value: value }); }
    }
    render() {
        let data_attribute_values = this.state.data_attribute_values;
        return (
            <>
                <Card title="Thông số kỹ thuật">
                    <div className='space-y-[10px]'>
                        <Button onClick={() => this.open_modal('attribute_value', true)}>Thêm mới</Button>
                        {data_attribute_values && data_attribute_values.map((item, index) => {
                            return (
                                <Table_attribute_value data_attribute_value={item} />
                            )
                        })}
                    </div>
                </Card>
                <Modal_attribute_value modal_attribute_value={this.state.modal_attribute_value}
                    open_modal={this.open_modal} />
            </>
        );
    }

}
export default withRouter(card_attribute_value);