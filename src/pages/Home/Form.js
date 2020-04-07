/* eslint-disable no-undef */

import React, { useEffect } from 'react';
import {
  Modal, Form, Input, Switch, message
} from 'antd';

import truckApi from '../../services/api.service';

const UserFormPage = () => {
  const [form] = Form.useForm();

  const handleRequest = async () => {
    try {
      let data = await form.validateFields();
      data = {
        ...data,
        is_busy: data.is_busy || false,
      };

      await truckApi.createTerminal(data);
      message.success('Caminhoneiro criado com sucesso');

      // eslint-disable-next-line no-return-assign
      setTimeout(() => window.location.pathname = '/', 1500);
    } catch (e) {
      message.error('Corrija os campos!');
    }
  };

  const handleCancel = () => {
    window.location.pathname = '/';
  };

  useEffect(() => {
    document.title = 'Truck Panel | Terminais';
  }, []);

  return (
    <Modal
      visible
      title="Cadastrar Terminal"
      okText="Cadastrar"
      cancelText="Cancelar"
      onOk={handleRequest}
      onCancel={handleCancel}
    >
      <>
        <Form
          form={form}
          layout="vertical"
          name="create_terminal"
        >
          <Form.Item
            rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
            name="user_id"
            label="Caminhoneiro ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="is_busy"
            label="Está carregado?"
          >
            <Switch />
          </Form.Item>
        </Form>
      </>
    </Modal>
  );
};

export default UserFormPage;
