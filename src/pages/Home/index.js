/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Table, Card, Row, Col, List, Typography, Timeline
} from 'antd';

import TerminalForm from './Form';
import truckApi from '../../services/api.service';
import './styles.css';

const HomePage = () => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [travels, setTravels] = useState({ loading: true, data: [] });
  const [usersBused, setUsersBused] = useState({ loading: true, data: [] });
  const [usersHasVehicle, setUsersHasVehicle] = useState({ loading: true, data: [] });
  const [terminalReport, setTerminalReport] = useState({
    loading: true,
    data: { daily: [], monthly: [], weekly: [] }
  });

  const getTravels = async () => {
    const { data: { data } } = await truckApi.getTravelReport();
    const transformedData = [];

    data.map(async (user) => {
      // eslint-disable-next-line no-underscore-dangle
      const { data: { data: { name } } } = await truckApi.showUser(user._id.user_id);

      transformedData.push({ name, travels: user.travels.length });
      setTravels({ loading: false, data: transformedData });
    });
  };

  const getUsersBused = async () => {
    const { data: { data } } = await truckApi.getUsersBused();
    setUsersBused({ loading: false, data });
  };

  const getUsersHasVehicle = async () => {
    const { data: { data } } = await truckApi.getUsersHasVehicle();
    setUsersHasVehicle({ loading: false, data });
  };

  const getTerminalReport = async () => {
    const { data: { data } } = await truckApi.getTerminalsReport();
    setTerminalReport({ loading: false, data });
  };

  useEffect(() => {
    getTravels();
    getUsersBused();
    getUsersHasVehicle();
    getTerminalReport();
    document.title = 'Truck Panel | Home';

    if (window.location.pathname.split('/')[1] === 'terminals') {
      setVisibleForm(true);
    }
  }, []);

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Truck Panel</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Card className="card-report" title="Viagens por caminhoneiro">
              <Timeline>
                {travels.data.map((travel) => (
                  <Timeline.Item key={travel.date}>
                    {travel.name}
                    {' '}
                    tem
                    {' '}
                    <Typography.Text mark>{travel.travels}</Typography.Text>
                    {' '}
                    viagens
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-report" title="Caminhoneiros carregados">
              <List
                bordered
                dataSource={usersBused.data}
                loading={usersBused.loading}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text>{item.name}</Typography.Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-report" title="Caminhoneiros com veículo próprio ">
              <List
                bordered
                dataSource={usersHasVehicle.data}
                loading={usersHasVehicle.loading}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text>{item.name}</Typography.Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Card className="card-report" title="Qtde caminhões carregados por dia">
              <Timeline>
                {terminalReport.data.daily.map((terminal) => (
                  <Timeline.Item key={terminal.date}>
                    <Typography.Text mark>{terminal.trucks}</Typography.Text>
                    {' '}
                    passaram na dia:
                    {' '}
                    {terminal.date}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-report" title="Qtde caminhões carregados por semana">
              <Timeline>
                {terminalReport.data.weekly.map((terminal) => (
                  <Timeline.Item key={terminal.week}>
                    <Typography.Text mark>{terminal.trucks}</Typography.Text>
                    {' '}
                    passaram na semana:
                    {' '}
                    {terminal.week}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="card-report" title="Qtde caminhões carregados por mês">
              <Timeline>
                {terminalReport.data.monthly.map((terminal) => (
                  <Timeline.Item key={terminal.month}>
                    <Typography.Text mark>{terminal.trucks}</Typography.Text>
                    {' '}
                    passaram no mês:
                    {' '}
                    {terminal.month}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
        </Row>
        {visibleForm && (
          <TerminalForm />
        )}
      </div>
    </>
  );
};

export default HomePage;
