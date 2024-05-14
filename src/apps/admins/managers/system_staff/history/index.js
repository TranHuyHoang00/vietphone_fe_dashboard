import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Select, Collapse, Typography, Image, Tag, Input, DatePicker } from 'antd';
import AvatarNone from '@assets/images/avatar_none.jpg';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_webcam: false,
        }
    }
    async componentDidMount() {
    }
    open_modal = async (name, value) => {
        if (name === 'web_cam') {
            this.setState({ modal_webcam: value });
        }
    }
    render() {
        const { RangePicker } = DatePicker;
        return (
            <>
                <div className="mx-[10px] pb-[10px] space-y-[10px]">
                    <div className='flex items-center justify-between flex-wrap gap-[5px]'>
                        <Select style={{ width: 150 }} value={1}
                            options={[
                                { value: 1, label: 'Tất cả' },
                                { value: 2, label: 'VIETPHONE 16' },
                                { value: 2, label: 'VIETPHONE 17' },
                            ]} />
                        <RangePicker />

                        <div><Input.Search /></div>
                    </div>
                    <Collapse defaultActiveKey={['1']} size='small'>
                        <Collapse.Panel className='bg-white dark:bg-[#141414]' header={
                            <span>06/05/2024</span>
                        } key="1">
                            <Collapse size='small'>
                                <Collapse.Panel className='bg-white dark:bg-[#141414]' header={
                                    <div className='flex items-start space-x-[10px]'>
                                        <div className='flex-shrink-0'>
                                            <Image width={50} height={50} src={AvatarNone} />
                                        </div>
                                        <div className='space-y-[5px] flex-1'>
                                            <div className='gap-[5px] flex flex-wrap '>
                                                <span className='font-medium'>Trần Huy Hoàng</span>
                                                <Tag color='red-inverse'>Vào ca trễ</Tag>
                                                <Tag color='green-inverse'>Đã vào ca</Tag>
                                                <Tag color='green-inverse'>Đã ra ca</Tag>
                                            </div>
                                            <div>
                                                <Tag color='blue-inverse'>Làm : 8h30p</Tag>
                                                <Tag color='orange-inverse'>Nghỉ : 1h30p</Tag>
                                            </div>
                                        </div>
                                    </div>
                                } key="1">
                                    <div className='md:grid grid-cols-2 md:space-y-0 space-y-[10px] gap-x-[20px]'>
                                        <div className='space-y-[10px]'>
                                            <div className='bg-blue-500 text-center text-white py-[5px] rounded-[5px]'>
                                                <span className='font-medium'>LÀM VIỆC</span>
                                            </div>
                                            <div className='flex items-start space-x-[5px] border border-blue-500 p-[5px] rounded-[5px] '>
                                                <div className='flex flex-shrink-0 items-center justify-center'>
                                                    <Image width={50} height={50} src={AvatarNone} className='object-cover' />
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>12:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Vào ca</Tag>
                                                        <Tag color='red-inverse'>Vào ca trễ</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                            </div>
                                            <div className='flex items-start space-x-[5px] border border-blue-500 p-[5px] rounded-[5px] '>
                                                <div className='flex flex-shrink-0 items-center justify-center'>
                                                    <Image width={50} height={50} src={AvatarNone} className='object-cover' />
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>22:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Ra ca</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                            </div>
                                            <div>
                                                <Typography.Text italic>Tổng giờ làm : </Typography.Text>
                                                <span className='font-medium text-blue-500'>8h30p</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='space-y-[10px]'>
                                                <div className='bg-orange-500 text-center text-white py-[5px] rounded-[5px]'>
                                                    <span className='font-medium'>NGHỈ NGƠI</span>
                                                </div>
                                                <div className='border border-orange-500 p-[5px] rounded-[5px] '>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>12:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Nghỉ</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                                <div className='border border-orange-500 p-[5px] rounded-[5px] '>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>12:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Kết thúc nghỉ</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                                <div>
                                                    <Typography.Text italic>Tổng giờ nghỉ : </Typography.Text>
                                                    <span className='font-medium text-orange-500'>1h30p</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse.Panel>
                            </Collapse>
                        </Collapse.Panel>
                    </Collapse>
                    <Collapse defaultActiveKey={['1']} size='small'>
                        <Collapse.Panel className='bg-white dark:bg-[#141414]' header={
                            <span>07/05/2024</span>
                        } key="1">
                            <Collapse size='small'>
                                <Collapse.Panel className='bg-white dark:bg-[#141414]' header={
                                    <div className='flex items-start space-x-[10px]'>
                                        <div className='flex-shrink-0'>
                                            <Image width={50} height={50} src={AvatarNone} />
                                        </div>
                                        <div className='space-y-[5px] flex-1'>
                                            <div className='gap-[5px] flex flex-wrap '>
                                                <span className='font-medium'>Trần Huy Hoàng</span>
                                                <Tag color='red-inverse'>Vào ca trễ</Tag>
                                                <Tag color='green-inverse'>Đã vào ca</Tag>
                                                <Tag color='green-inverse'>Đã ra ca</Tag>
                                            </div>
                                            <div>
                                                <Tag color='blue-inverse'>Làm : 8h30p</Tag>
                                                <Tag color='orange-inverse'>Nghỉ : 1h30p</Tag>
                                            </div>
                                        </div>
                                    </div>
                                } key="1">
                                    <div className='md:grid grid-cols-2 md:space-y-0 space-y-[10px] gap-x-[20px]'>
                                        <div className='space-y-[10px]'>
                                            <div className='bg-blue-500 text-center text-white py-[5px] rounded-[5px]'>
                                                <span className='font-medium'>LÀM VIỆC</span>
                                            </div>
                                            <div className='flex items-start space-x-[5px] border border-blue-500 p-[5px] rounded-[5px] '>
                                                <div className='flex flex-shrink-0 items-center justify-center'>
                                                    <Image width={50} height={50} src={AvatarNone} className='object-cover' />
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>12:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Vào ca</Tag>
                                                        <Tag color='red-inverse'>Vào ca trễ</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                            </div>
                                            <div className='flex items-start space-x-[5px] border border-blue-500 p-[5px] rounded-[5px] '>
                                                <div className='flex flex-shrink-0 items-center justify-center'>
                                                    <Image width={50} height={50} src={AvatarNone} className='object-cover' />
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>22:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Ra ca</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                            </div>
                                            <div>
                                                <Typography.Text italic>Tổng giờ làm : </Typography.Text>
                                                <span className='font-medium text-blue-500'>8h30p</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='space-y-[10px]'>
                                                <div className='bg-orange-500 text-center text-white py-[5px] rounded-[5px]'>
                                                    <span className='font-medium'>NGHỈ NGƠI</span>
                                                </div>
                                                <div className='border border-orange-500 p-[5px] rounded-[5px] '>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>12:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Nghỉ</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                                <div className='border border-orange-500 p-[5px] rounded-[5px] '>
                                                    <div className='flex flex-wrap items-center gap-[3px]'>
                                                        <span className='font-medium'>12:30:12 - 05/06/2024</span><br />
                                                        <Tag color='green-inverse'>Kết thúc nghỉ</Tag>
                                                    </div>
                                                    <span className='italic'>217 Nguyễn An Ninh, Dĩ An, Thành Phố, Bình Dương, Việt Nam</span>
                                                </div>
                                                <div>
                                                    <Typography.Text italic>Tổng giờ nghỉ : </Typography.Text>
                                                    <span className='font-medium text-orange-500'>1h30p</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse.Panel>
                            </Collapse>
                        </Collapse.Panel>
                    </Collapse>
                </div>
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
