import React from 'react';
import '../styles/Home.css';
import { Tabs, Button } from 'antd';

const { TabPane } = Tabs;
export function Home() {
    const operations = <Button>Create New Post</Button>;

    return (
        <Tabs tabBarExtraContent={operations} className="main-tabs">
            <TabPane tab="Tab 1" key="1">
                Content of tab 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
                Content of tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
                Content of tab 3
            </TabPane>
        </Tabs>
    );
};

