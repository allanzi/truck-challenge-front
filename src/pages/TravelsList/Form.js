/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import {
  Modal, Form, Input, Spin, Row, Col, Alert, InputNumber, message
} from 'antd';

import truckApi from '../../services/api.service';

const TravelFormPage = ({ params, isUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [form] = Form.useForm();

  // eslint-disable-next-line consistent-return
  const getTravel = async () => {
    try {
      setLoading(true);
      const { data: { data } } = await truckApi.showTravel(params.id);
      form.setFieldsValue({
        user_id: data.user_id,
        from_latitude: data.from.latitude,
        from_longitude: data.from.longitude,
        to_latitude: data.to.latitude,
        to_longitude: data.to.longitude
      });
    } catch (e) {
      if (isUpdate) {
        return message.error('Não foi possível editar essa viagem! Tente novamente mais tarde.');
      }

      message.error('Não foi possível cadastrar essa viagem! Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        user_id: values.user_id,
        from_: {
          latitude: values.from_latitude,
          longitude: values.from_longitude,
        },
        to: {
          latitude: values.to_latitude,
          longitude: values.to_longitude,
        }
      };

      if (isUpdate) {
        await truckApi.updateTravel(params.id, data);
        message.success('Viagem atualizada com sucesso');
      } else {
        await truckApi.createTravel(data);
        message.success('Viagem criada com sucesso');
      }

      // eslint-disable-next-line no-return-assign
      setTimeout(() => window.location.pathname = '/travels', 1500);
    } catch (e) {
      message.error('Corrija os campos!');

      if (e.message === 'Request failed with status code 400') {
        setShowErrorAlert(true);
      }
    }
  };

  const handleCancel = () => {
    window.location.pathname = '/travels';
  };

  useEffect(() => {
    if (isUpdate) {
      getTravel();
    }

    document.title = 'Truck Panel | Viagens';
  }, []);

  return (
    <Modal
      visible
      title={isUpdate ? 'Editar Viagem' : 'Cadastrar Viagem'}
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
          {showErrorAlert && (
          <>
            <Alert
              message="Campo Caminhoneiro ID inválido!"
              description="Deve ser um ObjectID válido ou caminhoneiro não encontrado!"
              type="error"
              closable
            />
            <br />
          </>
          )}
          <Form
            form={form}
            layout="vertical"
            name="edit_travel"
          >
            <Form.Item
              rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
              name="user_id"
              label="Caminhoneiro ID"
            >
              <Input />
            </Form.Item>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                  name="from_latitude"
                  label="Origem latitude"
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                  name="from_longitude"
                  label="Origem longitude"
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                  name="to_latitude"
                  label="Destino latitude"
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                  name="to_longitude"
                  label="Destino longitude"
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

export default TravelFormPage;
