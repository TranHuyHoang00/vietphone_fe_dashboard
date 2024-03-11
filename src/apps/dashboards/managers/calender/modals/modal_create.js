import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiFillDelete } from "react-icons/ai";
import { Image, Divider, Carousel, Modal, Input, Tooltip, Space, message } from 'antd';
import { get_list_user, get_user } from '../../../../../services/user_services';
import { create_brand } from '../../../../../services/brand_services';
import { create_stylist } from '../../../../../services/stylist_services';
import { create_makeup_hair } from '../../../../../services/makeup_hair_services';
import { create_charge_of } from '../../../../../services/charge_of_services';
import { create_time_location, } from '../../../../../services/time_location_services';
import { create_schedule } from '../../../../../services/schedule_services';
import { convert_ImageToBase64 } from '../../../../../utils/base64';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            data_users: [],
            data_brand: {},
            data_stylist: { images: [] },
            data_makeup_hair: { images: [] },
            data_charge_of: {},
            data_time_location: {},
            data_schedule: {},
            confirm_Loading: false,
        }
    }
    async componentDidMount() {
        await this.get_list_user();
        this.setState({
            data_time_location: {
                ...this.state.data_time_location,
                show_date: this.props.date_select,
            }
        })
    }
    handle_confirm_Loading = (value) => {
        this.setState({ confirm_Loading: value });
    }
    // Schedule
    handle_OnchangeInput = async (event, id) => {
        let copyState = { ...this.state.data_schedule };
        copyState[id] = event.target.value;
        this.setState({
            data_schedule: {
                ...copyState
            }
        });
        if (id == 'user_id') { await this.get_user(event.target.value); }
    }
    validation_phone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validation = (data) => {
        this.handle_confirm_Loading(true);
        if (!data.user_id) {
            return { mess: "Please select Artist", code: 1 };
        }
        let data_brand = this.state.data_brand;
        if (!data_brand.name) {
            return { mess: "Name of brand cannot be blank", code: 1 };
        }
        let data_stylist = this.state.data_stylist;
        if (!data_stylist.name) {
            return { mess: "Name of stylist cannot be blank", code: 1 };
        }
        let data_makeup_hair = this.state.data_makeup_hair;
        if (!data_makeup_hair.make_up) {
            return { mess: "Make up  cannot be blank", code: 1 };
        }
        if (!data_makeup_hair.make_hair) {
            return { mess: "Make hair cannot be blank", code: 1 };
        }
        let data_charge_of = this.state.data_charge_of;
        if (!data_charge_of.name) {
            return { mess: "Name of Person in charge cannot be blank ", code: 1 };
        }
        if (!data_charge_of.phone) {
            return { mess: "Phone of Person in charge cannot be blank ", code: 1 };
        }
        if (!this.validation_phone(data_charge_of.phone)) {
            return { mess: "Phone of Person in charge wrong format", code: 1 };
        }
        let data_time_location = this.state.data_time_location;
        if (!data_time_location.show_date) {
            return { mess: "Show date cannot be blank", code: 1 };
        }
        if (!data_time_location.show_time) {
            return { mess: "Show time cannot be blank", code: 1 };
        }
        if (!data_time_location.leave_time) {
            return { mess: "Leave time cannot be blank", code: 1 };
        }

        if (!data_time_location.agency_name) {
            return { mess: "Agency name time cannot be blank", code: 1 };
        }
        if (!data_time_location.contact) {
            return { mess: "Contact cannot be blank", code: 1 };
        }
        if (!this.validation_phone(data_time_location.contact)) {
            return { mess: "Contact wrong format", code: 1 };
        }
        if (!data_time_location.show_localtion) {
            return { mess: "Show location time cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handle_Create = async () => {
        let result = this.validation(this.state.data_schedule);
        if (result.code == 0) {
            let result_brand = await this.create_Brand();
            if (result_brand == 1) { message.error('Error when create Brand'); return; }
            let result_stylist = await this.create_Stylist();
            if (result_stylist == 1) { message.error('Error when create Stylist'); return; }
            let result_makeup_hair = await this.create_Makeup_hair();
            if (result_makeup_hair == 1) { message.error('Error when create Makeup_hair'); return; }
            let result_charge_of = await this.create_Charge_of();
            if (result_charge_of == 1) { message.error('Error when create Person in charge'); return; }
            let result_time_location = await this.create_Time_location();
            if (result_time_location == 1) { message.error('Error when create Time_location'); return; }
            try {
                let data = await create_schedule(this.state.data_schedule);
                if (data && data.data && data.data.success == 1) {
                    let type_filter = this.props.type_filter;
                    await this.props.get_list_schedule(type_filter);
                    let type_filter1 = type_filter;
                    type_filter1.type_date = 1;
                    await this.props.get_list_schedule(type_filter1);
                    message.success('Success')
                    this.setState({ data_schedule: {}, data_brand: {}, data_stylist: {}, data_makeup_hair: {}, data_charge_of: {}, data_time_location: {} })
                    this.props.open_Form("create", false)
                } else {
                    message.error('Error')
                }
            } catch (e) {
                message.error('System Error');
            }
        } else {
            message.error(result.mess);
        }
        this.handle_confirm_Loading(false);
    }
    // User
    get_list_user = async () => {
        try {
            let data = await get_list_user();
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                let data_filter = data_raw.filter(obj => obj.role.name == 'artist');
                this.setState({ data_users: data_filter })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    get_user = async (id) => {
        try {
            let data = await get_user(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_user: data.data.data })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    // Brand
    handle_OnchangeBrand = (event, id) => {
        let copyState = { ...this.state.data_brand };
        copyState[id] = event.target.value;
        this.setState({
            data_brand: {
                ...copyState
            }
        });
    }
    create_Brand = async () => {
        try {
            let data = await create_brand(this.state.data_brand);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        brand_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    // Stylist
    create_Stylist = async () => {
        try {
            let data = await create_stylist(this.state.data_stylist);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        stylist_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    onChange_Image_stylist = async (image) => {
        let img_convert = await convert_ImageToBase64(image);
        let data_stylist = this.state.data_stylist;
        (data_stylist.images).push({ value: img_convert });
        this.setState({ data_stylist: data_stylist });
    }
    delete_Image_stylist = (index) => {
        let data_stylist = this.state.data_stylist;
        (data_stylist.images).splice(index, 1);
        this.setState({ data_stylist: data_stylist })
    }
    onChange_Stylist = (event, id) => {
        let copyState = { ...this.state.data_stylist };
        copyState[id] = event.target.value;
        this.setState({
            data_stylist: {
                ...copyState
            }
        });
    }
    // Makeup_hair
    create_Makeup_hair = async () => {
        try {
            let data = await create_makeup_hair(this.state.data_makeup_hair);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        makeup_hair_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    onchange_Image_Makeup = async (image) => {
        let img_convert = await convert_ImageToBase64(image);
        let data_makeup_hair = this.state.data_makeup_hair;
        (data_makeup_hair.images).push({ value: img_convert });
        this.setState({ data_makeup_hair: data_makeup_hair });
    }
    delete_Image_Makeup = (index) => {
        let data_makeup_hair = this.state.data_makeup_hair;
        (data_makeup_hair.images).splice(index, 1);
        this.setState({ data_makeup_hair: data_makeup_hair })
    }
    onchange_Makeup_Hair = (event, id) => {
        let copyState = { ...this.state.data_makeup_hair };
        copyState[id] = event.target.value;
        this.setState({
            data_makeup_hair: {
                ...copyState
            }
        });
    }
    // Charge_of
    onchange_ChargeOf = (event, id) => {
        let copyState = { ...this.state.data_charge_of };
        copyState[id] = event.target.value;
        this.setState({
            data_charge_of: {
                ...copyState
            }
        });
    }
    create_Charge_of = async () => {
        try {
            let data = await create_charge_of(this.state.data_charge_of);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        charge_of_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    // Time_location
    onchange_TimeLocation = (event, id) => {
        let copyState = { ...this.state.data_time_location };
        copyState[id] = event.target.value;
        this.setState({
            data_time_location: {
                ...copyState
            }
        });
    }
    create_Time_location = async () => {
        try {
            let data = await create_time_location(this.state.data_time_location);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_schedule: {
                        ...this.state.data_schedule,
                        time_localtion_id: data.data.data.id
                    }
                })
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    render() {
        let data_users = this.state.data_users;
        let data_user = this.state.data_user;
        let data_brand = this.state.data_brand;
        let data_stylist = this.state.data_stylist;
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_schedule = this.state.data_schedule;
        let data_charge_of = this.state.data_charge_of;
        return (
            <>
                <Modal title={`CREATE A SCHEDULE FOR DATE: ${this.props.date_select}`} open={this.props.modal_create}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handle_Create()}
                    onCancel={() => this.props.open_Form("create", false)}
                    width={400} confirmLoading={this.state.confirm_Loading}>
                    <Space direction='vertical'>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>ARTIST</Divider>
                            {data_user.id && data_schedule.user_id !== '0' &&
                                <div div className='flex items-center justify-center'>
                                    <Image width={150} height={150}
                                        className=' object-cover rounded-full'
                                        src={(data_user.avatar == "" || data_user.avatar == null) ? require(`../../../../../assets/images/None.jpg`).default : data_user.avatar} />
                                </div>
                            }
                            <label className='font-[500]'>Name<span className="text-red-500"> *</span></label>
                            <select onChange={(event) => this.handle_OnchangeInput(event, 'user_id')}
                                className='w-full border p-[5px] rounded-[5px]'>
                                <option value={0}></option>
                                {data_users && data_users.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.fullname}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>BRAND</Divider>
                            <div className='space-y-[5px]'>
                                <label className='font-[500]'>Name<span className="text-red-500"> *</span></label>
                                <Input value={data_brand.name}
                                    onChange={(event) => this.handle_OnchangeBrand(event, "name")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>STYLIST</Divider>
                            <div className="space-y-[10px]">
                                <div className='space-y-[5px]'>
                                    <label className='font-[500]'>Image</label>
                                    {(data_stylist.images && data_stylist.images.length !== 0) &&
                                        <div className='flex items-center justify-center'>
                                            <button ><AiOutlineDoubleLeft /></button>
                                            <div className='h-[170px] w-[150px] '>
                                                <Carousel arrows autoplay dotPosition='top'>
                                                    {data_stylist.images && data_stylist.images.map((item, index) => {
                                                        return (
                                                            <div key={index} className='flex items-center justify-center'>
                                                                <div className='text-center'>
                                                                    <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                                        src={item.value} />
                                                                    <Tooltip title="Delete">
                                                                        <button onClick={() => this.delete_Image_stylist(index)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                            <button ><AiOutlineDoubleRight /></button>
                                        </div>
                                    }
                                </div>
                                <div className='text-center pt-[10px]'>
                                    <input id="load_file" type="file" accept="image/*" hidden
                                        onChange={(image) => this.onChange_Image_stylist(image)}
                                    />
                                    <label htmlFor="load_file"
                                        className='font-[500] border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-sm'>
                                        Add image
                                    </label>
                                </div>
                                <div className='space-y-[5px]'>
                                    <label className='font-[500]'>Name<span className="text-red-500"> *</span></label>
                                    <Input value={data_stylist.name}
                                        onChange={(event) => this.onChange_Stylist(event, "name")} />
                                </div>
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>MAKE UP_HAIR</Divider>
                            <div className="space-y-[10px]">
                                <div className='space-y-[5px]'>
                                    <label className='font-[500]'>Image</label>
                                    {(data_makeup_hair.images && data_makeup_hair.images.length !== 0) &&
                                        <div className='flex items-center justify-center'>
                                            <button ><AiOutlineDoubleLeft /></button>
                                            <div className='h-[170px] w-[150px] '>
                                                <Carousel arrows autoplay dotPosition='top'>
                                                    {data_makeup_hair.images && data_makeup_hair.images.map((item, index) => {
                                                        return (
                                                            <div key={index} className='flex items-center justify-center'>
                                                                <div className='text-center border'>
                                                                    <Image width={150} height={150} className='object-cover rounded-[5px]'
                                                                        src={item.value} />
                                                                    <Tooltip title="Delete">
                                                                        <button onClick={() => this.delete_Image_Makeup(index)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                            <button ><AiOutlineDoubleRight /></button>
                                        </div>
                                    }
                                </div>
                                <div className='text-center pt-[10px]'>
                                    <input id="load_file1" type="file" accept="image/*" hidden
                                        onChange={(image) => this.onchange_Image_Makeup(image)}
                                    />
                                    <label htmlFor="load_file1"
                                        className='font-[500] border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-sm'>
                                        Add image
                                    </label>
                                </div>
                                <div className='space-y-[3px]'>
                                    <label className='font-[500]'>Make up<span className="text-red-500"> *</span></label>
                                    <Input value={data_makeup_hair.make_up}
                                        onChange={(event) => this.onchange_Makeup_Hair(event, "make_up")} />
                                </div>
                                <div className='space-y-[3px]'>
                                    <label className='font-[500]'>Make hair<span className="text-red-500"> *</span></label>
                                    <Input value={data_makeup_hair.make_hair}
                                        onChange={(event) => this.onchange_Makeup_Hair(event, "make_hair")} />
                                </div>
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>PERSON IN CHARGE</Divider>
                            <div className='space-y-[3px]'>
                                <label className='font-[500]'>Name<span className="text-red-500"> *</span></label><br />
                                <Input value={data_charge_of.name} onChange={(event) => this.onchange_ChargeOf(event, "name")} />
                            </div>
                            <div className='space-y-[3px]'>
                                <label className='font-[500]'>Phone<span className="text-red-500"> *</span></label><br />
                                <Input value={data_charge_of.phone}
                                    onChange={(event) => this.onchange_ChargeOf(event, 'phone')} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>NOTE</Divider>
                            <div className='space-y-[3px]'>
                                <label className='font-[500]'>Content</label><br />
                                <Input.TextArea value={data_charge_of.note}
                                    onChange={(event) => this.onchange_ChargeOf(event, "note")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-sm rounded-[5px] space-y-[5px]'>
                            <Divider>TIME_LOCATION</Divider>
                            <div className='space-y-[10px]'>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Show date<span className="text-red-500"> *</span></label><br />
                                        <Input value={this.state.data_time_location.show_date} disabled
                                            onChange={(event) => this.onchange_TimeLocation(event, 'show_date')} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Show time<span className="text-red-500"> *</span></label><br />
                                        <Input type='time' onChange={(event) => this.onchange_TimeLocation(event, 'show_time')} />
                                    </div>
                                </Space>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Leave time<span className="text-red-500"> *</span></label><br />
                                        <Input type='time' onChange={(event) => this.onchange_TimeLocation(event, 'leave_time')} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Makeup time<span className="text-red-500"> *</span></label><br />
                                        <Input type='time' onChange={(event) => this.onchange_TimeLocation(event, 'make_up_time')} />
                                    </div>
                                </Space>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Agency name<span className="text-red-500"> *</span></label><br />
                                        <Input onChange={(event) => this.onchange_TimeLocation(event, 'agency_name')} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Contact<span className="text-red-500"> *</span></label><br />
                                        <Input className='w-[120px]'
                                            onChange={(event) => this.onchange_TimeLocation(event, 'contact')} />
                                    </div>
                                </Space>
                                <div className='space-y-[3px]'>
                                    <label className='font-[500]'>Show location<span className="text-red-500"> *</span></label><br />
                                    <Input.TextArea onChange={(event) => this.onchange_TimeLocation(event, 'show_localtion')} />
                                </div>
                            </div>
                        </div>
                    </Space>
                </Modal >
            </>
        );
    }

}
export default withRouter(modal_create);
