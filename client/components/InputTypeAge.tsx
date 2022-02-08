import { useState } from 'react';
import { Input, Form } from 'antd';

type props = {
  addonAfter?: any;
  name: any;
  label?: string;
  allValues: any;
  form: any;
  nextField: any;
  bp?: any;
  style?: any;
  disabled?: any;
  handleEnterAge: (...args: any[]) => any
};

export const InputTypeAge = ({
  name,
  label,
  addonAfter,
  allValues,
  form,
  bp,
  style,
  disabled,
  handleEnterAge
}: props) => {
  const [preValue, setPreValue] = useState('');

  const onChangeInput = (e: any): void => {
    const { value } = e.target;
    const pattern = /[^0-9.]/;
    form.setFieldsValue({
      ...allValues,
      [name]: value.replace(pattern, ''),
    });
    return;
  }



  return (
    <Form.Item name={name} label={label} noStyle={bp} rules={[{
      required: true,
      type: "regexp",
      pattern: new RegExp(/^(\d{1,2}\.){1,2}\d{1,2}/g),
    }]} >
      <Input
        onKeyDown={handleEnterAge}
        value={preValue}
        disabled={disabled}
        addonAfter={addonAfter}
        onChange={onChangeInput}
        style={style}
        inputMode="decimal"
      />
    </Form.Item>
  );
};
