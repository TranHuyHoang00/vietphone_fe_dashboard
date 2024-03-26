import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse, Typography, Radio } from 'antd';
class variant_overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_variant: {},
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_variants = this.props.data_variants;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Phiên bản" key="1">
                    <Radio.Group className='w-full' value={this.props.active_variant}
                        onChange={(value) => this.props.select_variant(value.target.value)}>
                        <div className='space-y-[10px] '>
                            {data_variants && data_variants.map((item, index) => {
                                return (
                                    <div onClick={() => this.props.select_variant(index)}
                                        className='flex gap-[10px] cursor-pointer '>
                                        <Radio value={index}></Radio>
                                        <div>
                                            <Typography.Text strong>{item.sku}</Typography.Text><br />
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