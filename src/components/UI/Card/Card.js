import React, { Component } from "react";
import { Card, Icon } from 'antd';

export class CustomCard extends Component {
    render(){
        const { title, children, loading, cover } = this.props;
        return(
            <div>
            <Card
                title={title}
                bordered={false}
                cover={cover}
                style={{ width: 400, margin: 'auto', marginTop: '30px' }}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                loading={loading}
            >
                {children}
            </Card>
            </div>
        )
    }
}

export default CustomCard;