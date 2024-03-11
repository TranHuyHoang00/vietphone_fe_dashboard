import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Image, Carousel, Modal, Collapse, Space, Input } from 'antd';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_schedule = this.props.data_schedule;
        return (
            <>
                <Modal title={`DETAIL A SCHEDULE FOR DATE: ${this.props.date_select == undefined ? (data_schedule.time_localtion_id && data_schedule.time_localtion_id.show_date) : this.props.date_select}`} open={this.props.modal_detail}
                    okText={"EXIT"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.props.open_Form("detail", false)}
                    onCancel={() => this.props.open_Form("detail", false)}
                    width={400}>
                    <Collapse defaultActiveKey={['1']} size="small">
                        <Collapse.Panel header="ARTIST" key="1" >
                            <div className='space-y-[10px]'>
                                <div className='flex items-center justify-center'>
                                    <Image width={150} height={150}
                                        className=' object-cover rounded-[5px]'
                                        src={(data_schedule.user_id && (data_schedule.user_id.avatar == "" || data_schedule.user_id.avatar == null)) ?
                                            require(`../../../../../assets/images/None.jpg`).default : data_schedule.user_id && data_schedule.user_id.avatar} />
                                </div>
                                <Space >
                                    <label>Name :</label>
                                    <Input className='font-[600] italic'
                                        value={data_schedule.user_id && data_schedule.user_id.fullname} />
                                </Space>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="BRAND" key="2">
                            <div className='space-y-[10px]'>
                                <Space >
                                    <label >Name :</label>
                                    <Input className='font-[600] italic'
                                        value={data_schedule.brand_id && data_schedule.brand_id.name} />
                                </Space>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="STYLIST" key="3">
                            <div className='space-y-[10px]'>
                                {data_schedule.stylist_id && data_schedule.stylist_id.images && data_schedule.stylist_id.images.length !== 0 ?
                                    <div className='space-y-[5px]'>
                                        <div className='flex items-center justify-center'>
                                            <button ><AiOutlineDoubleLeft /></button>
                                            <div className='h-[150px] w-[150px] '>
                                                <Carousel arrows autoplay >
                                                    {data_schedule.stylist_id && data_schedule.stylist_id.images.map((item, index) => {
                                                        return (
                                                            <div key={item.id} className='flex items-center justify-center'>
                                                                <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                                    src={item.value} />
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                            <button ><AiOutlineDoubleRight /></button>
                                        </div>
                                    </div>
                                    :
                                    <div className='flex items-center justify-center'>
                                        <Image width={150} height={150} className='object-cover rounded-[5px] '
                                            src={require(`../../../../../assets/images/None.jpg`).default} />
                                    </div>
                                }
                                <Space >
                                    <label >Name :</label>
                                    <Input className='font-[600] italic'
                                        value={data_schedule.stylist_id && data_schedule.stylist_id.name} />
                                </Space>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="MAKEUP _ HAIR" key="4">
                            <div className='space-y-[10px]'>
                                {data_schedule.makeup_hair_id && data_schedule.makeup_hair_id.images && data_schedule.makeup_hair_id.images.length !== 0 ?
                                    <div className='space-y-[5px]'>
                                        <div className='flex items-center justify-center'>
                                            <button ><AiOutlineDoubleLeft /></button>
                                            <div className='h-[150px] w-[150px] '>
                                                <Carousel arrows autoplay >
                                                    {data_schedule.makeup_hair_id.images && data_schedule.makeup_hair_id.images.map((item, index) => {
                                                        return (
                                                            <div key={item.id} className='flex items-center justify-center'>
                                                                <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                                    src={item.value} />
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                            <button ><AiOutlineDoubleRight /></button>
                                        </div>
                                    </div>
                                    :
                                    <div className='flex items-center justify-center'>
                                        <Image width={150} height={150} className='object-cover rounded-[5px] '
                                            src={require(`../../../../../assets/images/None.jpg`).default} />
                                    </div>
                                }
                                <Space >
                                    <label >Make up :</label>
                                    <Input className='font-[600] italic'
                                        value={data_schedule.makeup_hair_id && data_schedule.makeup_hair_id.make_up} />
                                </Space>
                                <Space >
                                    <label >Make hair :</label>
                                    <Input className='font-[600] italic'
                                        value={data_schedule.makeup_hair_id && data_schedule.makeup_hair_id.make_hair} />
                                </Space>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="PERSON IN CHARGE" key="5">
                            <div className='space-y-[10px]'>
                                <Space >
                                    <label >Name :</label>
                                    <Input className='font-[600] italic'
                                        value={data_schedule.charge_of_id && data_schedule.charge_of_id.name} />
                                </Space>
                                <Space >
                                    <label >Phone :</label>
                                    <Input className='font-[600] italic'
                                        value={data_schedule.charge_of_id && data_schedule.charge_of_id.phone} />
                                </Space>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel header="NOTE" key="6">
                            <Input.TextArea className='font-[600] italic'
                                value={data_schedule.charge_of_id && data_schedule.charge_of_id.note} />
                        </Collapse.Panel>
                        <Collapse.Panel header="TIME_LOCATION" key="7">
                            <div className='space-y-[10px]'>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Show date</label><br />
                                        <Input type='date' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.show_date} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Show time</label><br />
                                        <Input type='time' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.show_time} />
                                    </div>
                                </Space>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Leave time</label><br />
                                        <Input type='time' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.leave_time} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Makeup time</label><br />
                                        <Input type='time' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.make_up_time} />
                                    </div>
                                </Space>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Agency name</label><br />
                                        <Input value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.agency_name} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Contact</label><br />
                                        <Input className='w-[100px]' value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.contact} />
                                    </div>
                                </Space>
                                <div className='space-y-[3px]'>
                                    <label className='font-[500]'>Show location</label><br />
                                    <Input.TextArea className='font-[600] italic'
                                        value={data_schedule.time_localtion_id && data_schedule.time_localtion_id.show_localtion} />
                                </div>
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                </Modal>
            </>
        );
    }

}
export default withRouter(modal_detail);
