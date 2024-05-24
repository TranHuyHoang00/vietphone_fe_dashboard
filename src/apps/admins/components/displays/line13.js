import { Typography, Image } from 'antd';

const textLine13 = (name, value, className) => {
    return (
        <div className='flex gap-[5px]'>
            <div className='w-1/3 flex justify-between space-x-[5px]'>
                <Typography.Text type="secondary">{name}</Typography.Text>
                <span>:</span>
            </div>
            <div className='w-2/3'>
                <Typography.Text className={`${className}`}>{value}</Typography.Text>
            </div>
        </div>
    )
}
const imageLine13 = (name, value, width, height) => {
    return (
        <div className='flex gap-[5px]'>
            <div className='w-1/3 flex justify-between'>
                <Typography.Text type="secondary">{name}</Typography.Text>
                <span>:</span>
            </div>
            <div className='w-2/3'>
                {value === null ?
                    <span></span>
                    :
                    <Image width={width} height={height} src={value} className='object-cover' />
                }
            </div>
        </div>
    )
}
export {
    textLine13, imageLine13
}