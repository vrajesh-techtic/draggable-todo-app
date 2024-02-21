import { Button, Form, Input } from "antd";
import React from "react";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const FormContainer = ({ layout, success, btnText, styling, title, desc }) => {
  return (
    <Form
      {...layout}
      className={styling}
      id="inputContainer"
      onFinish={(e) => {
        success(e);
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "title"]}
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input allowClear value={title} />
      </Form.Item>

      <Form.Item
        name={["user", "description"]}
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea allowClear value={desc} />
      </Form.Item>

      <Button
        type="primary"
        className="bg-sky-400 align-middle"
        htmlType="submit"
      >
        {btnText}
      </Button>
    </Form>
  );
};

export default FormContainer;
