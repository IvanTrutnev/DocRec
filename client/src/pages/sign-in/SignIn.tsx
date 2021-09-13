import React from 'react';
import { useHistory } from 'react-router';
import * as CSS from 'csstype';
import { Form, Input, Button, Checkbox } from 'antd';

import { signIn } from '../../services/auth';

import './SignIn.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const styles: CSS.Properties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const form: CSS.Properties = {
  width: '100%',
};

const SignIn: React.FC = () => {
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await signIn(values);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={styles}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={form}
        className="form"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
