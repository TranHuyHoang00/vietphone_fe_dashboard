import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'antd';
import TableLine from '../displays/table_line';
class table_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_attribute_value_uniques = this.props.data_attribute_value_uniques;
        let data_attribute_value_raws = this.props.data_attribute_value_raws;
        return (
            <Card title={`${data_attribute_value_uniques.name}`} size='small'>
                <div className='space-y-[5px]'>
                    {data_attribute_value_raws && data_attribute_value_raws.map((item, index) => {
                        return (
                            <TableLine key={index} data={item} id={data_attribute_value_uniques.id}
                                handle_delete_atbvl={this.props.handle_delete_atbvl}
                                is_edit={this.props.is_edit} />
                        )
                    })}
                </div>
            </Card>
        );
    }

}
export default withRouter(table_attribute_value);