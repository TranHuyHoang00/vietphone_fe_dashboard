import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiFillDelete } from "react-icons/ai";
import { Image, Divider, Carousel, Modal, Input, Tooltip, Space, message } from 'antd';
import { get_list_user, get_user } from '../../../../../services/user_services';
import { get_brand, edit_brand } from '../../../../../services/brand_services';
import { edit_stylist, get_stylist } from '../../../../../services/stylist_services';
import { edit_makeup_hair, get_makeup_hair } from '../../../../../services/makeup_hair_services';
import { get_charge_of, edit_charge_of } from '../../../../../services/charge_of_services';
import { get_time_location, edit_time_location } from '../../../../../services/time_location_services';
import { edit_schedule } from '../../../../../services/schedule_services';
import moment from 'moment';
import { convert_ImageToBase64 } from '../../../../../utils/base64';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            data_users: [],
            data_brand: {},
            data_stylist: {},
            data_images_stylist: [],
            is_update_stylist: false,
            data_makeup_hair: {},
            data_images_makeup_hair: [],
            is_update_makeup_hair: false,
            data_charge_of: {},
            data_time_location: {},
            data_schedule: {},
            id_schedule: '',
            confirm_Loading: false,

        }
    }
    async componentDidMount() {
        this.setState({
            data_schedule: this.props.data_schedule,
            id_schedule: this.props.id_schedule,
        })
        await this.get_list_user();
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_schedule !== this.props.data_schedule) {
            let data_schedule = this.props.data_schedule;
            if (data_schedule && data_schedule.user_id) {
                await this.get_user(data_schedule.user_id);
                await this.get_brand(data_schedule.brand_id);
                await this.get_stylist(data_schedule.stylist_id);
                await this.get_makeup_hair(data_schedule.makeup_hair_id);
                await this.get_charge_of(data_schedule.charge_of_id);
                await this.get_time_location(data_schedule.time_localtion_id);
            }
            this.setState({
                data_schedule: data_schedule,
            })
        }
        if (prevProps.id_schedule !== this.props.id_schedule) {
            this.setState({
                id_schedule: this.props.id_schedule,
            })
        }
    }
    handle_OnchangeInput = async (event, id) => {
        let copyState = { ...this.state.data_schedule };
        copyState[id] = event.target.value;
        this.setState({
            data_schedule: {
                ...copyState
            }
        });
        if (id == 'user_id') { await this.get_user(event.target.value); }
        if (id == 'brand_id') { await this.get_brand(event.target.value); }
        if (id == 'stylist_id') { await this.get_stylist(event.target.value); }
        if (id == 'makeup_hair_id') { await this.get_makeup_hair(event.target.value); }

        console.log(this.state.data_schedule);
    }
    validate_phone = (phone_number) => {
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
        if (!this.validate_phone(data_charge_of.phone)) {
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
        if (!data_time_location.show_localtion) {
            return { mess: "Show localtion time cannot be blank", code: 1 };
        }
        if (!data_time_location.agency_name) {
            return { mess: "Agency name time cannot be blank", code: 1 };
        }
        if (!data_time_location.contact) {
            return { mess: "Contact time cannot be blank", code: 1 };
        }
        if (!this.validate_phone(data_time_location.contact)) {
            return { mess: "Contact wrong format", code: 1 };
        }
        return { code: 0 };
    }
    handle_Edit = async () => {
        let data_schedule = this.state.data_schedule;
        let result = this.validation(data_schedule);
        if (result.code == 0) {
            let result_brand = await this.editBrand(data_schedule.brand_id);
            if (result_brand == 1) { message.error('Error when edit Brand'); return; }
            let result_stylist = await this.editStylist(data_schedule.stylist_id);
            if (result_stylist == 1) { message.error('Error when edit Stylist'); return; }
            let result_makeup_hair = await this.editMakeup_hair(data_schedule.makeup_hair_id);
            if (result_makeup_hair == 1) { message.error('Error when edit Makeup hair'); return; }
            let result_charge_of = await this.editCharge_of(data_schedule.charge_of_id);
            if (result_charge_of == 1) { message.error('Error when edit Person in charge'); return; }
            let result_time_location = await this.editTime_location(data_schedule.time_localtion_id);
            if (result_time_location == 1) { message.error('Error when edit Time location'); return; }
            try {
                let data = await edit_schedule(this.state.id_schedule, this.state.data_schedule);
                if (data && data.data && data.data.success == 1) {
                    let type_filter = this.props.type_filter;
                    await this.props.get_list_schedule(type_filter);
                    let type_filter1 = type_filter;
                    type_filter1.type_date = 1;
                    await this.props.get_list_schedule(type_filter1);
                    message.success('Success');
                    this.props.open_Form("edit", false)
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
    format_time = (time) => {
        return moment(time).format('YYYY-MM-DDTHH:mm');
    }
    handle_confirm_Loading = (value) => {
        this.setState({ confirm_Loading: value });
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
    get_brand = async (id) => {
        try {
            let data = await get_brand(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brand: data.data.data })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    editBrand = async (id) => {
        try {
            let data = await edit_brand(id, this.state.data_brand);
            if (data && data.data && data.data.success == 1) {
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    // Stylist
    get_stylist = async (id) => {
        try {
            let data = await get_stylist(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_stylist: data.data.data })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    onChange_Stylist = (event, id) => {
        let copyState = { ...this.state.data_stylist };
        copyState[id] = event.target.value;
        this.setState({
            is_update_stylist: true,
            data_stylist: {
                ...copyState
            }
        });
    }
    onChange_Image_stylist = async (image) => {
        let img_convert = await convert_ImageToBase64(image);
        let data_stylist = this.state.data_stylist;
        let data_images_stylist = this.state.data_images_stylist;
        data_images_stylist.push({ value: img_convert });
        (data_stylist.images).push({ value: img_convert });
        this.setState({
            is_update_stylist: true,
            data_stylist: data_stylist,
            data_images_stylist: data_images_stylist
        })
    }
    delete_Image_stylist = (index, id) => {
        let data_images_stylist = this.state.data_images_stylist;
        let data_stylist = this.state.data_stylist;
        data_stylist.images.splice(index, 1);
        if (id !== undefined) {
            if (data_stylist.delete_images) {
                data_stylist.delete_images.push(id);
            } else {
                data_stylist.delete_images = [id]
            }
        } else {
            let objectsWithoutId = data_stylist.images.filter(obj => obj.id);
            let countWithoutId = objectsWithoutId.length;
            data_images_stylist.splice(index - countWithoutId, 1);
        }
        this.setState({
            is_update_stylist: true,
            data_images_stylist: data_images_stylist,
            data_stylist: data_stylist
        })
    }
    editStylist = async (id) => {
        let data_stylist = this.state.data_stylist;
        let data_images_stylist = this.state.data_images_stylist;
        if (this.state.is_update_stylist == false) {
            return 0;
        } else {
            data_stylist.images = data_images_stylist;
            try {
                let data = await edit_stylist(id, this.state.data_stylist);
                if (data && data.data && data.data.success == 1) {
                    return 0;
                } else {
                    return 1;
                }
            } catch (e) {
                return 1;
            }
        }

    }
    // Makeup_hair
    get_makeup_hair = async (id) => {
        try {
            let data = await get_makeup_hair(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_makeup_hair: data.data.data })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    onchange_Makeup_Hair = (event, id) => {
        let copyState = { ...this.state.data_makeup_hair };
        copyState[id] = event.target.value;
        this.setState({
            is_update_makeup_hair: true,
            data_makeup_hair: {
                ...copyState
            }
        });
    }
    onchange_Image_Makeup = async (image) => {
        let img_convert = await convert_ImageToBase64(image);
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        data_images_makeup_hair.push({ value: img_convert });
        (data_makeup_hair.images).push({ value: img_convert });
        this.setState({
            is_update_stylist: true,
            data_makeup_hair: data_makeup_hair,
            data_images_makeup_hair: data_images_makeup_hair
        })
    }
    delete_Image_Makeup = (index, id) => {
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        let data_makeup_hair = this.state.data_makeup_hair;
        data_makeup_hair.images.splice(index, 1);
        if (id !== undefined) {
            if (data_makeup_hair.delete_images) {
                data_makeup_hair.delete_images.push(id);
            } else {
                data_makeup_hair.delete_images = [id]
            }
        } else {
            let objectsWithoutId = data_makeup_hair.images.filter(obj => obj.id);
            let countWithoutId = objectsWithoutId.length;
            data_images_makeup_hair.splice(index - countWithoutId, 1);
        }
        this.setState({
            is_update_makeup_hair: true,
            data_images_makeup_hair: data_images_makeup_hair,
            data_makeup_hair: data_makeup_hair
        })
    }
    editMakeup_hair = async (id) => {
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_images_makeup_hair = this.state.data_images_makeup_hair;
        if (this.state.is_update_makeup_hair == false) {
            return 0;
        } else {
            data_makeup_hair.images = data_images_makeup_hair;
            try {
                let data = await edit_makeup_hair(id, this.state.data_makeup_hair);
                if (data && data.data && data.data.success == 1) {
                    return 0;
                } else {
                    return 1;
                }
            } catch (e) {
                return 1;
            }
        }

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
    editCharge_of = async (id) => {
        try {
            let data = await edit_charge_of(id, this.state.data_charge_of);
            if (data && data.data && data.data.success == 1) {
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    get_charge_of = async (id) => {
        try {
            let data = await get_charge_of(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_charge_of: data.data.data })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    // Time_location
    editTime_location = async (id) => {
        try {
            let data = await edit_time_location(id, this.state.data_time_location);
            if (data && data.data && data.data.success == 1) {
                return 0;
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    onchange_TimeLocation = (event, id) => {
        let copyState = { ...this.state.data_time_location };
        copyState[id] = event.target.value;
        this.setState({
            data_time_location: {
                ...copyState
            }
        });
    }
    get_time_location = async (id) => {
        try {
            let data = await get_time_location(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_time_location: data.data.data })
            } else {
                message.error('Error')
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    render() {
        let data_users = this.state.data_users;
        let data_user = this.state.data_user;
        let data_brand = this.state.data_brand;
        let data_stylist = this.state.data_stylist;
        let data_makeup_hair = this.state.data_makeup_hair;
        let data_charge_of = this.state.data_charge_of;
        let data_time_location = this.state.data_time_location;
        let data_schedule = this.state.data_schedule;
        return (
            <>
                <Modal title={`EDIT A SCHEDULE FOR DATE: ${this.props.date_select}`} open={this.props.modal_edit}
                    okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.handle_Edit()}
                    onCancel={() => this.props.open_Form("edit", false)}
                    width={400} confirmLoading={this.state.confirm_Loading}>
                    <div className="space-y-[15px]">
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>ARTIST</Divider>
                            {data_user.id &&
                                <div className='flex items-center justify-center'>
                                    <Image width={150} height={150}
                                        className=' object-cover rounded-full'
                                        src={(data_user.avatar == "" || data_user.avatar == null) ? require(`../../../../../assets/images/None.jpg`).default : data_user.avatar} />
                                </div>
                            }
                            <label className='font-[500]'>Name<span className="text-red-500"> *</span></label>
                            <select value={data_schedule.user_id}
                                onChange={(event) => this.handle_OnchangeInput(event, 'user_id')}
                                className='w-full border p-[5px] rounded-[5px]'>
                                <option></option>
                                {data_users && data_users.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.fullname}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>BRAND</Divider>
                            <label>NAME BRAND</label>
                            <div className='space-y-[5px]'>
                                <label className='font-[500]'>Name<span className="text-red-500"> *</span></label>
                                <Input value={data_brand.name}
                                    onChange={(event) => this.handle_OnchangeBrand(event, "name")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>STYLIST</Divider>
                            <div className='space-y-[5px]'>
                                <label className='font-[500]'>Image</label>
                                <div className='flex items-center justify-center'>
                                    <button ><AiOutlineDoubleLeft /></button>
                                    <div className='h-[170px] w-[150px] '>
                                        <Carousel arrows autoplay dotPosition='top'>
                                            {data_stylist && data_stylist.images && data_stylist.images.map((item, index) => {
                                                return (
                                                    <div key={index} className='flex items-center justify-center'>
                                                        <div className='text-center'>
                                                            <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                                src={item.value} />
                                                            <Tooltip title="Delete">
                                                                <button onClick={() => this.delete_Image_stylist(index, item.id)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                    <button ><AiOutlineDoubleRight /></button>
                                </div>
                            </div>
                            <div className='text-center pt-[10px]'>
                                <input id="load_file" type="file" accept="image/*" hidden
                                    onChange={(image) => this.onChange_Image_stylist(image)}
                                />
                                <label htmlFor="load_file"
                                    className='font-[500] border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
                                    Add image
                                </label>
                            </div>
                            <div className='space-y-[5px]'>
                                <label className='font-[500]'>Name<span className="text-red-500"> *</span></label>
                                <Input value={data_stylist.name}
                                    onChange={(event) => this.onChange_Stylist(event, "name")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>MAKE UP_HAIR</Divider>
                            <div className='space-y-[5px]'>
                                <label className='font-[500]'>Image</label>
                                <div className='flex items-center justify-center'>
                                    <button ><AiOutlineDoubleLeft /></button>
                                    <div className='h-[170px] w-[150px] '>
                                        <Carousel arrows autoplay dotPosition='top'>
                                            {data_makeup_hair && data_makeup_hair.images && data_makeup_hair.images.map((item, index) => {
                                                return (
                                                    <div key={index} className='flex items-center justify-center'>
                                                        <div className='text-center'>
                                                            <Image width={150} height={150} className='object-cover rounded-[5px] '
                                                                src={item.value} />
                                                            <Tooltip title="Delete">
                                                                <button onClick={() => this.delete_Image_Makeup(index, item.id)} className='text-white bg-red-600 px-[5px] h-[20px] rounded-[5px]'><AiFillDelete /></button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Carousel>
                                    </div>
                                    <button ><AiOutlineDoubleRight /></button>
                                </div>
                            </div>
                            <div className='text-center pt-[10px]'>
                                <input id="load_file1" type="file" accept="image/*" hidden
                                    onChange={(image) => this.onchange_Image_Makeup(image)}
                                />
                                <label htmlFor="load_file1"
                                    className='font-[500] border rounded-[5px] px-[10px] py-[3px] cursor-pointer shadow-md'>
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
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>PERSON IN CHARGE</Divider>
                            <div className='space-y-[3px]'>
                                <label className='font-[500]'>Name<span className="text-red-500"> *</span></label><br />
                                <Input placeholder="Cannot be blank" value={data_charge_of && data_charge_of.name}
                                    onChange={(event) => this.onchange_ChargeOf(event, "name")} />
                            </div>
                            <div className='space-y-[3px]'>
                                <label className='font-[500]'>Phone<span className="text-red-500"> *</span></label><br />
                                <Input placeholder="Cannot be blank" value={data_charge_of && data_charge_of.phone}
                                    onChange={(event) => this.onchange_ChargeOf(event, "phone")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>NOTE</Divider>
                            <div className='space-y-[3px]'>
                                <label className='font-[500]'>Content</label><br />
                                <Input.TextArea value={data_charge_of && data_charge_of.note}
                                    onChange={(event) => this.onchange_ChargeOf(event, "note")} />
                            </div>
                        </div>
                        <div className='border px-[10px] pb-[10px] shadow-md rounded-[5px] space-y-[5px]'>
                            <Divider>TIME_LOCATION</Divider>
                            <div className='space-y-[10px]'>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Show date<span className="text-red-500"> *</span></label><br />
                                        <Input value={data_time_location.show_date} disabled
                                            onChange={(event) => this.onchange_TimeLocation(event, 'show_date')} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Show time<span className="text-red-500"> *</span></label><br />
                                        <Input type='time' value={data_time_location.show_time}
                                            onChange={(event) => this.onchange_TimeLocation(event, 'show_time')} />
                                    </div>
                                </Space>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Leave time<span className="text-red-500"> *</span></label><br />
                                        <Input type='time' value={data_time_location.leave_time}
                                            onChange={(event) => this.onchange_TimeLocation(event, 'leave_time')} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Makeup time<span className="text-red-500"> *</span></label><br />
                                        <Input type='time' value={data_time_location.make_up_time}
                                            onChange={(event) => this.onchange_TimeLocation(event, 'make_up_time')} />
                                    </div>
                                </Space>
                                <Space wrap>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Agency name<span className="text-red-500"> *</span></label><br />
                                        <Input value={data_time_location.agency_name}
                                            onChange={(event) => this.onchange_TimeLocation(event, 'agency_name')} />
                                    </div>
                                    <div className='space-y-[3px]'>
                                        <label className='font-[500]'>Contact<span className="text-red-500"> *</span></label><br />
                                        <Input className='w-[120px]'
                                            value={data_time_location.contact}
                                            onChange={(event) => this.onchange_TimeLocation(event, 'contact')} />
                                    </div>
                                </Space>
                                <div className='space-y-[3px]'>
                                    <label className='font-[500]'>Show location<span className="text-red-500"> *</span></label><br />
                                    <Input.TextArea value={data_time_location.show_localtion}
                                        onChange={(event) => this.onchange_TimeLocation(event, 'show_localtion')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}
export default withRouter(modal_edit);
