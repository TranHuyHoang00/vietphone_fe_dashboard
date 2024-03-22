import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image, Typography, Radio, Carousel } from 'antd';
class card_variant_overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_variant: {},
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate() {
    }
    render() {
        let data_variants = this.props.data_variants;
        return (
            <>
                <Card title="Phiên bản">
                    <Radio.Group className='w-full' value={this.props.active_variant} onChange={(value) => this.props.handle_select_variant(value, 'radio')}>
                        <div className='space-y-[5px] '>
                            {data_variants && data_variants.map((item, index) => {
                                return (
                                    <div onClick={() => this.props.handle_select_variant(index, 'button')}
                                        className='flex gap-[10px] cursor-pointer '>
                                        <Radio value={index}></Radio>
                                        {(item.media && item.media.length !== 0) ?
                                            <Carousel >
                                                {item.media && item.media.map((media, index) => {
                                                    return (
                                                        <div>
                                                            <Image width={60} height={60} className='object-cover'
                                                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                                                        </div>
                                                    )
                                                })}
                                            </Carousel>
                                            :
                                            <Image width={60} height={60} className='object-cover'
                                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                                        }
                                        <div>
                                            <Typography.Text strong>{item.sku}</Typography.Text><br />
                                            <Typography.Text type='secondary'>Số lượng: {item.quantity} cái</Typography.Text>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Radio.Group>
                </Card>
            </>
        );
    }

}
export default withRouter(card_variant_overview);