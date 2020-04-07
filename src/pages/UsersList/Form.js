/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import {
  Modal, Form, Input, Spin, Row, Col, Switch, InputNumber, message
} from 'antd';

import truckApi from '../../services/api.service';

const UserFormPage = ({ params, isUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // eslint-disable-next-line consistent-return
  const getUser = async () => {
    try {
      setLoading(true);
      const { data: { data } } = await truckApi.showUser(params.id);
      form.setFieldsValue(data);
    } catch (e) {
      if (isUpdate) {
        return message.error('Não foi possível editar esse caminhoneiro! Tente novamente mais tarde.');
      }

      message.error('Não foi possível cadastrar esse caminhoneiro! Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    try {
      let data = await form.validateFields();
      data = {
        ...data,
        has_vehicle: data.has_vehicle || false,
        is_busy: data.is_busy || false,
      };

      if (isUpdate) {
        await truckApi.updateUser(params.id, data);
        message.success('Caminhoneiro atualizado com sucesso');
      } else {
        await truckApi.createUser(data);
        message.success('Caminhoneiro criado com sucesso');
      }

      // eslint-disable-next-line no-return-assign
      setTimeout(() => window.location.pathname = '/users', 1500);
    } catch (e) {
      message.error('Corrija os campos!');
    }
  };

  const handleCancel = () => {
    window.location.pathname = '/users';
  };

  useEffect(() => {
    if (isUpdate) {
      getUser();
    }

    document.title = 'Truck Panel | Caminhoneiros';
  }, []);

  return (
    <Modal
      visible
      title={isUpdate ? 'Editar Caminhoneiro' : 'Cadastrar Caminhoneiro'}
      okText={isUpdate ? 'Atualizar' : 'Cadastrar'}
      cancelText="Cancelar"
      onOk={handleRequest}
      onCancel={handleCancel}
    >
      {loading ? (
        <Row justify="center">
          <Col>
            <br />
            <br />
            <br />
            <Spin />
            <br />
            <br />
            <br />
          </Col>
        </Row>
      ) : (
        <>
          <Form
            form={form}
            layout="vertical"
            name="edit_travel"
          >
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' },
                    { max: 60, message: 'Limite de caracteres 60!' },
                  ]}
                  name="name"
                  label="Nome"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' },
                  ]}
                  name="age"
                  label="Idade"
                >
                  <InputNumber
                    min={18}
                    max={100}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' },
                    { max: 5, message: 'Limite de caracteres 5!' }
                  ]}
                  name="driver_license_type"
                  label="Tipo CNH?"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Form.Item
                  name="has_vehicle"
                  label="Possui veículo?"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="is_busy"
                  label="Está carregado?"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                  name="vehicle_type_id"
                  label="Tipo veículo"
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default UserFormPage;
