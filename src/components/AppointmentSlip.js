import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const AppointmentSlip = ({ appointment }) => {
  return (
    <div style={{ padding: '32px' }}>
      <Title level={3}>Appointment Slip</Title>
      <Row gutter={16}>
      <Col span={12}>
          <Text strong>Id:</Text>
          <Text>{appointment._id}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Name:</Text>
          <Text>{appointment.name}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Email:</Text>
          <Text>{appointment.email}</Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Date:</Text>
          <Text>{appointment.createdAt}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default AppointmentSlip;