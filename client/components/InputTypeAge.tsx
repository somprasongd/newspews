import { useState } from 'react';
import { Input, Form } from 'antd';

type props = {
  addonAfter?: any;
  name: any;
  label?: string;
  allValues: any;
  form: any;
  nextField: any;
  setNextField: any;
  focusFields: any;
  index: any;
  bp?: any;
  style?: any;
  disabled?: any;
};

export const InputTypeAge = ({
  name,
  label,
  addonAfter,
  allValues,
  form,
  nextField,
  setNextField,
  focusFields,
  index,
  bp,
  style,
  disabled
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
        value={preValue}
        disabled={disabled}
        addonAfter={addonAfter}
        onChange={onChangeInput}
        style={style}
        ref={(input) => {
          if (bp && focusFields[nextField] === bp) {
            input?.focus();
          } else if (focusFields[nextField] === name) {
            input?.focus();
          }
        }}
        onFocus={() => {
          setNextField(index);
        }}
        inputMode="decimal"
      />
    </Form.Item>
  );
};
