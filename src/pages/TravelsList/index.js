import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Table, Tag, Popconfirm, message, Button, Row, Col
} from 'antd';

import truckApi from '../../services/api.service';
import './styles.css';
import TravelForm from './Form';

const TravelsListPage = ({ match: { params } }) => {
  const [travels, setTravels] = useState({ loading: true, data: [] });
  const [visibleForm, setVisibleForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);

  const getTravels = async () => {
    const { data: { data } } = await truckApi.listTravels();
    const transformedData = [];

    data.map(async (travel) => {
      // eslint-disable-next-line no-underscore-dangle
      const { data: { data: { name } } } = await truckApi.showUser(travel.user_id);

      transformedData.push({ name, ...travel });
    });

    setTimeout(() => setTravels({ loading: false, data: transformedData }), 500);
  };

  const handleDelete = async (id) => {
    try {
      await truckApi.deleteTravel(id);
      message.success('Excluído com sucesso');
      getTravels();
    } catch {
      message.error('Não foi possível excluir, tente novamente mais tarde.');
    }
  };

  const handleEditButton = (id) => {
    window.location.pathname = `/travels/${id}`;
  };

  const handleCreateButton = () => {
    window.location.pathname = '/travels/create';
  };

  useEffect(() => {
    getTravels();
    document.title = 'Truck Panel | Viagens';

    if ('id' in params && params.id) {
      if (params.id === 'create') {
        setIsUpdate(false);
      }

      setVisibleForm(true);
    }
  }, []);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Truck Panel</Breadcrumb.Item>
            <Breadcrumb.Item>Viagens</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col spam={12}>
          <Button type="primary" onClick={handleCreateButton}>Cadastrar viagem</Button>
        </Col>
      </Row>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Table
          rowKey={(item) => item.name}
          loading={travels.loading}
          dataSource={travels.data}
          locale={{
            emptyText: 'Sem dados para exibir',
          }}
          columns={[
            {
              title: 'Nome',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Origem',
              dataIndex: 'from',
              key: 'from',
              render: (from) => (
                <>
                  <span>
                    <Tag color="green">
                      {from.latitude}
                    </Tag>
                  </span>
                  <span>
                    <Tag color="green">
                      {from.longitude}
                    </Tag>
                  </span>
                </>
              )
            },
            {
              title: 'Destino',
              dataIndex: 'to',
              key: 'to',
              render: (to) => (
                <>
                  <span>
                    <Tag color="green">
                      {to.latitude}
                    </Tag>
                  </span>
                  <span>
                    <Tag color="green">
                      {to.longitude}
                    </Tag>
                  </span>
                </>
              )
            },
            {
              title: 'Ações',
              key: 'action',
              render: (text, record) => (
                <span>
                  <a style={{ marginRight: 16 }} onClick={() => handleEditButton(record.id)}>Editar</a>
                  <Popconfirm
                    title="Realmente deseja excluir?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <a href="javascript:void(0);">Excluir</a>
                  </Popconfirm>
                </span>
              ),
            },
          ]}
        />
        {visibleForm && (
          <TravelForm
            params={params}
            isUpdate={isUpdate}
          />
        )}
      </div>
    </>
  );
};

export default TravelsListPage;
