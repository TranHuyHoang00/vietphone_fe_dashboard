import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'antd';
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
        let data_atbvl_uniques = this.props.data_atbvl_uniques;
        let data_atbvl_raws = this.props.data_atbvl_raws;
        return (
            <Card title={`${data_atbvl_uniques.name}`} size='small'>
                <div className='space-y-[5px]'>
                    {data_atbvl_raws && data_atbvl_raws.map((item, index) => {
                        return (
                            <Table_line key={index} data={item} id={data_atbvl_uniques.id}
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