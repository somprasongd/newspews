import { useState } from 'react';
import { Input, Form } from 'antd';
import { nutritionCalc, bmiCalc, inchToCm, cmToInch } from '../shared/func';

type props = {
  // name: string,
  lengthDecimalBefore: number;
  lengthDecimalAfter: number;
  addonAfter?: any;
  // onChange?: any,
  refx?: any;
  onFocus?: any;
  name: any;
  label?: string;
  rules?: any;
  allValues: any;
  form: any;
  patientData?: any;
  nextField: any;
  setNextField: any;
  focusFields: any;
  index: any;
  bp?: any;
  style?: any;
  disabled?: any;
  inch?: boolean;
  cm?: boolean;
};

export const InputTypeNumber = ({
  name,
  label,
  rules,
  addonAfter,
  refx,
  onFocus,
  lengthDecimalBefore,
  lengthDecimalAfter,
  allValues,
  form,
  patientData,
  nextField,
  setNextField,
  focusFields,
  index,
  bp,
  style,
  disabled,
  inch,
  cm,
}: props) => {
  const [preValue, setPreValue] = useState('');

  const onChangeInput = (e: any): void => {
    const { value } = e.target;
    let bmi;
    let nutri;
    if (name === 'weight') {
      bmi =
        allValues?.height && e?.target?.value
          ? bmiCalc(parseFloat(e?.target?.value), allValues?.height)
          : undefined;
      nutri =
        e?.target?.value && bmi
          ? nutritionCalc(
              e?.target?.value,
              bmi,
              patientData?.patient?.ptGenderId,
              patientData?.patient?.ptDob
            )
          : undefined;
    }
    if (name === 'height') {
      bmi =
        e?.target?.value && allValues?.weight
          ? bmiCalc(allValues?.weight, parseFloat(e?.target?.value))
          : undefined;
      nutri =
        allValues?.weight && bmi
          ? nutritionCalc(
              allValues?.weight,
              bmi,
              patientData?.patient?.ptGenderId,
              patientData?.patient?.ptDob
            )
          : undefined;
    }
    if (name !== 'weight' && name !== 'height') {
      bmi = allValues?.bmi;
      nutri = allValues?.nutri;
    }

    const pattern = /[^0-9.]/;
    if (
      (e?.target?.value?.match(/[.]/g) || []).length > 1 ||
      (lengthDecimalAfter === 0 && e?.nativeEvent?.data === '.')
    ) {
      setPreValue((pre) => pre);
      form.setFieldsValue({
        ...allValues,
        [name]: preValue,
        bmi,
        nutri,
      });
      return;
    } else {
      const [before, after] = e?.target?.value?.split('.');
      if (before && before.length <= lengthDecimalBefore) {
        if (!after || (after && after.length <= lengthDecimalAfter)) {
          setPreValue(e?.target?.value?.replace(pattern, ''));
          if (bp && bp === 'sys') {
            form.setFieldsValue({
              ...allValues,
              bp: [e?.target?.value?.replace(pattern, ''), allValues?.bp?.[1]],
              bmi,
              nutri,
            });
          } else if (bp && bp === 'dia') {
            form.setFieldsValue({
              ...allValues,
              bp: [allValues?.bp?.[0], e?.target?.value?.replace(pattern, '')],
              bmi,
              nutri,
            });
          } else if (inch) {
            form.setFieldsValue({
              ...allValues,
              [name]: value.replace(pattern, ''),
              [name.split('Inch')[0]]:
                inchToCm(parseFloat(value.replace(pattern, '')) || 0) || '',
              bmi,
              nutri,
            });
          } else if (cm) {
            form.setFieldsValue({
              ...allValues,
              [name]: value.replace(pattern, ''),
              [name + 'Inch']:
                cmToInch(parseFloat(value.replace(pattern, '')) || 0) || '',
              bmi,
              nutri,
            });
          } else {
            form.setFieldsValue({
              ...allValues,
              [name]: value.replace(pattern, ''),
              bmi,
              nutri,
            });
          }

          // setNextField(index+1)
          if (
            before &&
            after &&
            ((before?.length === 1 && after?.length === lengthDecimalAfter) ||
              (before?.length === 2 && after?.length === lengthDecimalAfter) ||
              (before?.length === lengthDecimalBefore &&
                after?.length === lengthDecimalAfter))
          ) {
            setNextField(index + 1);
          }
          if (
            lengthDecimalAfter === 0 &&
            before?.length === lengthDecimalBefore
          ) {
            setNextField(index + 1);
          }
          return;
        } else {
          setPreValue((pre) => pre);

          if (bp && bp === 'sys') {
            form.setFieldsValue({
              ...allValues,
              bp: [preValue, allValues?.bp?.[1]],
              bmi,
              nutri,
            });
          } else if (bp && bp === 'dia') {
            form.setFieldsValue({
              ...allValues,
              bp: [allValues?.bp?.[0], preValue],
              bmi,
              nutri,
            });
          } else if (inch) {
            form.setFieldsValue({
              ...allValues,
              [name]: preValue,
              [name.split('Inch')[0]]:
                inchToCm(parseFloat(preValue) || 0) || '',
              bmi,
              nutri,
            });
          } else if (cm) {
            form.setFieldsValue({
              ...allValues,
              [name]: preValue,
              [name + 'Inch']: cmToInch(parseFloat(preValue) || 0) || '',
              bmi,
              nutri,
            });
          } else {
            form.setFieldsValue({
              ...allValues,
              [name]: preValue,
              bmi,
              nutri,
            });
          }
          return;
        }
      }
      if (after && after.length <= lengthDecimalAfter) {
        if (!before || (before && before.length <= lengthDecimalBefore)) {
          setPreValue(e?.target?.value?.replace(pattern, ''));
          if (bp && bp === 'sys') {
            form.setFieldsValue({
              ...allValues,
              bp: [e?.target?.value?.replace(pattern, ''), allValues?.bp?.[1]],
              bmi,
              nutri,
            });
          } else if (bp && bp === 'dia') {
            form.setFieldsValue({
              ...allValues,
              bp: [allValues?.bp?.[0], e?.target?.value?.replace(pattern, '')],
              bmi,
              nutri,
            });
          } else if (inch) {
            form.setFieldsValue({
              ...allValues,
              [name]: e?.target?.value?.replace(pattern, ''),
              [name.split('Inch')[0]]:
                inchToCm(
                  parseFloat(e?.target?.value?.replace(pattern, '')) || 0
                ) || '',
              bmi,
              nutri,
            });
          } else if (cm) {
            form.setFieldsValue({
              ...allValues,
              [name]: e?.target?.value?.replace(pattern, ''),
              [name + 'Inch']:
                cmToInch(
                  parseFloat(e?.target?.value?.replace(pattern, '')) || 0
                ) || '',
              bmi,
              nutri,
            });
          } else {
            form.setFieldsValue({
              ...allValues,
              [name]: value.replace(pattern, ''),
              bmi,
              nutri,
            });
          }
          if (
            before &&
            after &&
            ((before?.length === 1 && after?.length === lengthDecimalAfter) ||
              (before?.length === 2 && after?.length === lengthDecimalAfter) ||
              (before?.length === lengthDecimalBefore &&
                after?.length === lengthDecimalAfter))
          ) {
            setNextField(index + 1);
          }
          if (
            lengthDecimalAfter === 0 &&
            before?.length === lengthDecimalBefore
          ) {
            setNextField(index + 1);
          }
          return;
        } else {
          setPreValue((pre) => pre);
          if (bp && bp === 'sys') {
            form.setFieldsValue({
              ...allValues,
              bp: [preValue, allValues?.bp?.[1]],
              bmi,
              nutri,
            });
          } else if (bp && bp === 'dia') {
            form.setFieldsValue({
              ...allValues,
              bp: [allValues?.bp?.[0], preValue],
              bmi,
              nutri,
            });
          } else if (inch) {
            form.setFieldsValue({
              ...allValues,
              [name]: preValue,
              [name.split('Inch')[0]]:
                inchToCm(parseFloat(preValue) || 0) || '',
              bmi,
              nutri,
            });
          } else if (cm) {
            form.setFieldsValue({
              ...allValues,
              [name]: preValue,
              [name + 'Inch']: cmToInch(parseFloat(preValue) || 0) || '',
              bmi,
              nutri,
            });
          } else {
            form.setFieldsValue({
              ...allValues,
              [name]: preValue,
              bmi,
              nutri,
            });
          }
          return;
        }
      }
    }
    if (e?.target?.value?.length === 0) {
      setPreValue(e?.target?.value);
      if (bp && bp === 'sys') {
        form.setFieldsValue({
          ...allValues,
          bp: [e?.target?.value?.replace(pattern, ''), allValues?.bp?.[1]],
          bmi,
          nutri,
        });
      } else if (bp && bp === 'dia') {
        form.setFieldsValue({
          ...allValues,
          bp: [allValues?.bp?.[0], e?.target?.value?.replace(pattern, '')],
          bmi,
          nutri,
        });
      } else if (inch) {
        form.setFieldsValue({
          ...allValues,
          [name]: e?.target?.value?.replace(pattern, ''),
          [name.split('Inch')[0]]:
            inchToCm(parseFloat(e?.target?.value?.replace(pattern, '')) || 0) ||
            '',
          bmi,
          nutri,
        });
      } else if (cm) {
        form.setFieldsValue({
          ...allValues,
          [name]: e?.target?.value?.replace(pattern, ''),
          [name + 'Inch']:
            cmToInch(parseFloat(e?.target?.value?.replace(pattern, '')) || 0) ||
            '',
          bmi,
          nutri,
        });
      } else {
        form.setFieldsValue({
          ...allValues,
          [name]: value.replace(pattern, ''),
          bmi,
          nutri,
        });
      }
      return;
    }
    if (bp && bp === 'sys') {
      form.setFieldsValue({
        ...allValues,
        bp: [preValue, allValues?.bp?.[1]],
        bmi,
        nutri,
      });
    } else if (bp && bp === 'dia') {
      form.setFieldsValue({
        ...allValues,
        bp: [allValues?.bp?.[0], preValue],
        bmi,
        nutri,
      });
    } else if (inch) {
      form.setFieldsValue({
        ...allValues,
        [name]: preValue,
        [name.split('Inch')[0]]: inchToCm(parseFloat(preValue) || 0) || '',
        bmi,
        nutri,
      });
    } else if (cm) {
      form.setFieldsValue({
        ...allValues,
        [name]: preValue,
        [name + 'Inch']: cmToInch(parseFloat(preValue) || 0) || '',
        bmi,
        nutri,
      });
    } else {
      form.setFieldsValue({
        ...allValues,
        [name]: preValue,
        bmi,
        nutri,
      });
    }
  };

  return (
    <Form.Item name={name} label={label} noStyle={bp} rules={rules}>
      <Input
        value={preValue}
        disabled={disabled}
        addonAfter={addonAfter}
        onChange={onChangeInput}
        style={style}
        ref={(input) => {
          if (bp && focusFields[nextField] === bp) {
            input?.focus();
          } else if (
            inch &&
            disabled === false &&
            `${focusFields[nextField]}Inch` === name
          ) {
            input?.focus();
          } else if (focusFields[nextField] === name) {
            input?.focus();
          }
        }}
        onFocus={() => {
          setNextField(index);
        }}
        pattern="[0-9.]*"
        inputMode="decimal"
      />
    </Form.Item>
  );
};
