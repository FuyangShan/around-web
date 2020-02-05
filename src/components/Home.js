import React from 'react';
import '../styles/Home.css';
import { Tabs, Button } from 'antd';
import {
    GEOLOCATION_OPTIONS,
    POSITION_KEY,
    TOKEN_KEY,
    API_ROOT,
    AUTH_HEADER,
} from '../constants';

const { TabPane } = Tabs;

export class Home extends React.Component {
    state = {
        loadingGeolocation: false,
        loadingPosts: false,
        errorMessage: null,
        posts: [],
    }

    getGeolocation() {
        this.setState({
            loadingGeolocation: true,
            error: null,
        });
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onGeolocationSuccess,
                this.onGeolocationFailure,
                GEOLOCATION_OPTIONS,
            );
        } else {
            this.setState({
                loadingGeolocation: false,
                error: 'Your browser does not support geolocation.',
            });
        }
    }
    onGeolocationSuccess = (position) => {
        this.setState({
            loadingGeolocation: false,
            error: null,
        })
        console.log(position);
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POSITION_KEY, JSON.stringify({ latitude, longitude }));
        this.loadNearbyPost();
    }

    onGeolocationFailure = () => {
        this.setState({
            loadingGeolocation: false,
            error: 'Failed to load geolocation.',
        })
    }

    loadNearbyPost() {
        this.setState({
            loadingPosts: true,
            error: null,
        });
        const position = JSON.parse(localStorage.getItem(POSITION_KEY));
        const range = 20000;
        const token = localStorage.getItem(TOKEN_KEY);

        fetch(`${API_ROOT}/search?lat=${position.latitude}&lon=${position.longitude}&range=${range}`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load posts.');
        }).then((data) => {
            console.log(data);
            this.setState({
                loadingPosts: false,
                posts: data ? data : [],
            });
        }).catch((error) => {
            this.setState({
                loadingPosts: false,
                error: error.message,
            });
        });
    }

    componentDidMount() {
        this.getGeolocation();
    }
    render() {
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
    }
};
