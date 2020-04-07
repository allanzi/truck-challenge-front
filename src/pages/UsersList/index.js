import React, { useEffect, useState } from 'react';
import {
  Breadcrumb, Table, Popconfirm, message, Button, Row, Col
} from 'antd';

import truckApi from '../../services/api.service';
import './styles.css';
import TravelForm from './Form';

const UsersListPage = ({ match: { params } }) => {
  const [users, setUsers] = useState({ loading: true, data: [] });
  const [visibleForm, setVisibleForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);

  const getUsers = async () => {
    const { data: { data } } = await truckApi.listUsers();

    setTimeout(() => setUsers({ loading: false, data }), 500);
  };

  const handleDelete = async (id) => {
    try {
      await truckApi.deleteUser(id);
      message.success('Excluído com sucesso');
      getUsers();
    } catch {
      message.error('Não foi possível excluir, tente novamente mais tarde.');
    }
  };

  const handleEditButton = (id) => {
    window.location.pathname = `/users/${id}`;
  };

  const handleCreateButton = () => {
    window.location.pathname = '/users/create';
  };

  useEffect(() => {
    getUsers();
    document.title = 'Truck Panel | Caminhoneiros';

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
            <Breadcrumb.Item>Caminhoneiros</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col spam={12}>
          <Button type="primary" onClick={handleCreateButton}>Cadastrar caminhoneiro</Button>
        </Col>
      </Row>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Table
          rowKey={(item) => item.name}
          loading={users.loading}
          dataSource={users.data}
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
              title: 'Idade',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Tipo CNH?',
              dataIndex: 'driver_license_type',
              key: 'driver_license_type',
              render: (item) => (<span>{item ? 'Sim' : 'Não'}</span>)
            },
            {
              title: 'Possui veículo?',
              dataIndex: 'has_vehicle',
              key: 'has_vehicle',
              render: (item) => (<span>{item ? 'Sim' : 'Não'}</span>)
            },
            {
              title: 'Está carregado?',
              dataIndex: 'is_busy',
              key: 'is_busy',
              render: (item) => (<span>{item ? 'Sim' : 'Não'}</span>)
            },
            {
              title: 'Tipo veículo',
              dataIndex: 'vehicle_type_id',
              key: 'vehicle_type_id',
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

export default UsersListPage;
