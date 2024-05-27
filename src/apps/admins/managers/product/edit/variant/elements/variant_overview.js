import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse, Typography, Radio } from 'antd';
class variant_overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVariant: {},
        }
    }
    async componentDidMount() {
    }
    render() {
        let dataVariants = this.props.dataVariants;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Phiên bản" key="1">
                    <Radio.Group className='w-full' value={this.props.active_variant}
                        onChange={(value) => this.props.select_variant(value.target.value)}>
                        <div className='space-y-[10px] '>
                            {dataVariants && dataVariants.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => this.props.select_variant(index)}
                                        className='flex gap-[10px] cursor-pointer '>
                                        <Radio value={index}></Radio>
                                        <div>
                                            <Typography.Text strong>{item.sku}</Typography.Text><br />
                                            <Typography.Text strong>{item.name}</Typography.Text><br />
                                            <Typography.Text type='secondary'>Số lượng: {item.quantity} cái</Typography.Text>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Radio.Group>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
export default withRouter(variant_overview);