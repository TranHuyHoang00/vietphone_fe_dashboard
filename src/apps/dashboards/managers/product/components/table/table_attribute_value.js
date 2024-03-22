import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Card } from 'antd';
import Table_line from './table_line';
class table_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_attribute_value = this.props.data_attribute_value;
        return (
            <Card title={`${data_attribute_value.name}`} size='small'>
                <div className='space-y-[5px]'>
                    {data_attribute_value && data_attribute_value.data && data_attribute_value.data.map((item, index) => {
                        return (
                            <Table_line key={index} data={item} />
                        )
                    })}
                </div>
            </Card>
        );
    }

}
export default withRouter(table_attribute_value);