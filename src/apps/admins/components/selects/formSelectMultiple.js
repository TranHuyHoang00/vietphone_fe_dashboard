import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Divider, Space, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { width, mode, variableSelect, value, disabledSelect, placeholder, disabledSearch, onChangeInput, onSearch
            , variableInputSearch, nameFormSelect, disabledButtonCreate, options, handleCreate, onChangeSelect
        } = this.props;
        return (
            <Select style={{ width: width }} placement='topRight' mode={mode}
                onChange={(value) => onChangeSelect(value, variableSelect)}
                value={value} disabled={disabledSelect}
                dropdownRender={(menu) => (
                    <div className='p-[5px]'>
                        {menu}
                        <Divider />
                        <Space>
                            <Input.Search onKeyDown={(e) => e.stopPropagation()}
                                placeholder={placeholder}
                                disabled={disabledSearch}
                                onChange={(event) => onChangeInput(event.target.value, variableInputSearch)}
                                onSearch={(value) => onSearch(value, nameFormSelect)} />

                            <Button disabled={disabledButtonCreate}
                                onClick={() => handleCreate(nameFormSelect)}
                                className='bg-[#0e97ff] text-white' icon={<PlusOutlined />}></Button>
                        </Space>
                    </div>
                )}
                options={options}
            />
        );
    }

}
export default withRouter(index);