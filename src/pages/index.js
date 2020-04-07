import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  HeartTwoTone,
  UserOutlined,
  CarOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

import HomePage from './Home';
import UsersList from './UsersList';
import TravelsList from './TravelsList';

const {
  Header, Content, Footer, Sider
} = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  let key = [1];
  switch (window.location.pathname.split('/')[1]) {
    case (''):
      key = ['1'];
      break;
    case ('users'):
      key = ['2'];
      break;
    case ('travels'):
      key = ['3'];
      break;
    case ('terminals'):
      key = ['4'];
      break;
    default:
      key = ['1'];
      break;
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={key} mode="inline">
            <Menu.Item key="1" onClick={() => window.location.pathname = '/'}>
              <HomeOutlined />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => window.location.pathname = '/users'}>
              <UserOutlined />
              <span>Caminhoneiros</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => window.location.pathname = '/travels'}>
              <CarOutlined />
              <span>Viagens</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => window.location.pathname = '/terminals'}>
              <EnvironmentOutlined />
              <span>Cadastrar Terminal</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/terminals" component={HomePage} />
              <Route exact path="/users/:id?" component={UsersList} />
              <Route exact path="/travels/:id?" component={TravelsList} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Feito com
            {' '}
            <HeartTwoTone twoToneColor="#eb2f96" />
            {' '}
            por Allan Santos
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
