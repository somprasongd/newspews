import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Card,
  Typography,
  Alert,
  Radio,
  Space
} from 'antd';
import { InputTypeNumber } from './InputTypeNumber';
import { calculateAgeGroup } from '../shared/func';
import { useState } from 'react';
import { InputTypeAge } from './InputTypeAge';
const { Text } = Typography;

interface FormVitalSignProps {
  submit?: (values: any) => void;
  crt: any[] | null;
  avpu: any[] | null;
  behavior: any[] | null;
  initialValues?: any;
  deleteVitalSign?: any;
  setResponse?: any;
  response?: any;
}

const { Option } = Select;

const focusFields = [
  'weight',
  'height',
  'sys',
  'dia',
  'temp',
  'map',
  'pulse',
  'rr',
  'spo2',
  'oxygen',
  'waistline',
  'hips',
  'chest',
];

export const FormVitalSign = ({
  submit,
  crt,
  avpu,
  behavior,
  initialValues,
  deleteVitalSign,
  setResponse,
  response,
}: FormVitalSignProps) => {
  const [nextField, setNextField] = useState<any>(0);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Form
      {...layout}
      autoComplete="off"
      onChange={() => { }}
      initialValues={initialValues}
      onFinish={submit}
    >
      {(values, form) => {
        const handelReset = () => {
          form.getFieldInstance('ageDate').focus();
          form.resetFields();
          setResponse(null);
        };

        return (
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Card>
                <Row gutter={[6, 0]}>
                  <Col span={24}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <InputTypeAge
                          allValues={values}
                          form={form}
                          addonAfter="ปี.เดือน.วัน"
                          nextField={nextField}
                          name={'ageDate'}
                          label="อายุ "
                        />
                      </Col>
                    </Row>
                  </Col>
                  {values.ageDate && (
                    <Col span={24} style={{ textAlign: 'center' }}>
                      {(() => {
                        const [year = 0, month = 0, day = 0] =
                          values?.ageDate.split('.');
                        return (
                          <Text strong>
                            {year} ปี {month} เดือน {day} วัน
                          </Text>
                        );
                      })()}
                    </Col>
                  )}
                </Row>
              </Card>
            </Col>

            {values.ageDate && (
              <Col>
                <Card
                  title={
                    values.ageDate && calculateAgeGroup(values.ageDate) === 10
                      ? 'NEWS'
                      : 'PEWS'
                  }
                  extra={
                    response !== null && (
                      <Alert
                        message={<>{response?.score} คะแนน</>}
                        type="success"
                      />
                    )
                  }
                >
                  <Row>
                    {values.ageDate &&
                      (calculateAgeGroup(values.ageDate) === 10 ||
                        (values?.ageDate &&
                          values?.ageDate.split('.')?.[0] > 15)) && (
                        <>
                          <Col span={24}>
                            <Form.Item label="ความดัน" shouldUpdate>
                              <Input.Group compact>
                                <InputTypeNumber
                                  bp="sys"
                                  name={['bp', 0]}
                                  lengthDecimalBefore={3}
                                  lengthDecimalAfter={0}
                                  addonAfter="/"
                                  allValues={values}
                                  form={form}
                                  index={2}
                                  nextField={nextField}
                                  setNextField={setNextField}
                                  focusFields={focusFields}
                                  style={{ width: '50%' }}
                                  rules={[
                                    {
                                      required:
                                        values.ageDate &&
                                        calculateAgeGroup(values.ageDate) ===
                                        10,
                                      pattern:
                                        /^(?=.)(?!0*$)(?:(?:(?:0|[1-2]?[0-9]?\d))|300?)$/g,
                                      message: `ความดันไม่ถูกต้อง`,
                                    },
                                  ]}
                                />
                                <InputTypeNumber
                                  bp="dia"
                                  name={['bp', 1]}
                                  lengthDecimalBefore={3}
                                  lengthDecimalAfter={0}
                                  addonAfter="mmHg"
                                  allValues={values}
                                  form={form}
                                  index={3}
                                  nextField={nextField}
                                  setNextField={setNextField}
                                  focusFields={focusFields}
                                  style={{ width: '50%' }}
                                  rules={[
                                    {
                                      required:
                                        values.ageDate &&
                                        calculateAgeGroup(values.ageDate) ===
                                        10,
                                      pattern:
                                        /^(?=.)(?!0*$)(?:(?:(?:0|[1-1]?[0-9]?\d))|200?)$/g,
                                      message: `ความดันไม่ถูกต้อง`,
                                    },
                                  ]}
                                />
                              </Input.Group>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <InputTypeNumber
                              name="temp"
                              label="อุณหภูมิ"
                              lengthDecimalBefore={2}
                              lengthDecimalAfter={1}
                              addonAfter="°C"
                              allValues={values}
                              form={form}
                              index={4}
                              nextField={nextField}
                              setNextField={setNextField}
                              focusFields={focusFields}
                              rules={[
                                {
                                  required:
                                    values.ageDate &&
                                    calculateAgeGroup(values.ageDate) === 10,
                                  pattern:
                                    /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[3-4]?\d)?(?:[,.]\d{1,2})?)|50(?:[.,]0?)?)$/g,
                                  message: `อุณหภูมิไม่ถูกต้อง`,
                                },
                              ]}
                            />
                          </Col>
                        </>
                      )}

                    <Col span={24}>
                      <InputTypeNumber
                        name="pulse"
                        label="ชีพจร"
                        lengthDecimalBefore={3}
                        lengthDecimalAfter={0}
                        addonAfter="bmp"
                        allValues={values}
                        form={form}
                        index={6}
                        nextField={nextField}
                        setNextField={setNextField}
                        focusFields={focusFields}
                        rules={[
                          {
                            required: true,
                            pattern: /^\d*\.?\d*$/g,
                            message: `ชีพจรไม่ถูกต้อง`,
                          },
                        ]}
                      />
                    </Col>
                    <Col span={24}>
                      <InputTypeNumber
                        name="rr"
                        label="การหายใจ"
                        lengthDecimalBefore={3}
                        lengthDecimalAfter={0}
                        addonAfter="bmp"
                        allValues={values}
                        form={form}
                        index={7}
                        nextField={nextField}
                        setNextField={setNextField}
                        focusFields={focusFields}
                        rules={[
                          {
                            required: true,
                            pattern: /^\d*\.?\d*$/g,
                            message: `การหายใจไม่ถูกต้อง`,
                          },
                        ]}
                      />
                    </Col>

                    {values.ageDate &&
                      (calculateAgeGroup(values.ageDate) === 10 ||
                        (values?.ageDate &&
                          values?.ageDate.split('.')?.[0] > 15)) && (
                        <>
                          <Col span={24}>
                            <InputTypeNumber
                              name="spo2"
                              label="SPO2"
                              lengthDecimalBefore={3}
                              lengthDecimalAfter={0}
                              addonAfter="%"
                              allValues={values}
                              form={form}
                              index={8}
                              nextField={nextField}
                              setNextField={setNextField}
                              focusFields={focusFields}
                              rules={[
                                {
                                  required:
                                    values.ageDate &&
                                    calculateAgeGroup(values.ageDate) === 10,
                                  pattern: /^\d*\.?\d*$/g,
                                  message: `SPO2 ไม่ถูกต้อง`,
                                },
                              ]}
                            />
                          </Col>
                        </>
                      )}

                    <Col span={24}>
                      <InputTypeNumber
                        name="oxygen"
                        label="Oxygen"
                        lengthDecimalBefore={3}
                        lengthDecimalAfter={0}
                        addonAfter="L/m"
                        allValues={values}
                        form={form}
                        index={9}
                        nextField={nextField}
                        setNextField={setNextField}
                        focusFields={focusFields}
                        rules={[
                          {
                            required: true,
                            pattern: /^\d*\.?\d*$/g,
                            message: `Oxygen ไม่ถูกต้อง`,
                          },
                        ]}
                      />
                    </Col>
                  </Row>

                  {values.ageDate &&
                    (calculateAgeGroup(values.ageDate) === 10 ||
                      (values?.ageDate &&
                        values?.ageDate.split('.')?.[0] > 15)) && (
                      <Row gutter={[6, 0]}>
                        <Col span={24}>
                          <Form.Item
                            name="avpu"
                            label="AVPU"
                            rules={[{ required: true }]}
                          >
<<<<<<< HEAD
                            <Radio.Group>
=======
                            <Radio.Group buttonStyle="solid">
>>>>>>> dev
                              <Space direction="vertical">
                                {avpu &&
                                  avpu?.length > 0 &&
                                  avpu?.map((a) => (
<<<<<<< HEAD
                                    <Radio key={a?.id} value={a?.id}>
                                      {a?.description}
                                    </Radio>
=======
                                    <Radio.Button key={a?.id} value={a?.id}>
                                      {a?.description}
                                    </Radio.Button>
>>>>>>> dev
                                  ))}
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                    )}
                  {values.ageDate &&
                    (calculateAgeGroup(values.ageDate) !== 10 ||
                      (values?.ageDate &&
                        values?.ageDate.split('.')?.[0] <= 15)) && (
                      <>
                        <Row gutter={[6, 0]}>
                          <Col span={24}>
                            <Form.Item
                              name="crt"
                              label="CRT"
                              rules={[{ required: true }]}
                            >
<<<<<<< HEAD
                              <Radio.Group>
=======
                              <Radio.Group buttonStyle="solid">
>>>>>>> dev
                                <Space direction="vertical">
                                  {crt &&
                                    crt?.length > 0 &&
                                    crt?.map((c) => (
<<<<<<< HEAD
                                      <Radio key={c?.id} value={c?.id}>
                                        {c?.description}
                                      </Radio>
=======
                                      <Radio.Button key={c?.id} value={c?.id}>
                                        {c?.description}
                                      </Radio.Button>
>>>>>>> dev
                                    ))}
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              name="behavior"
                              label="พฤติกรรม"
                              rules={[{ required: true }]}
                            >
<<<<<<< HEAD
                              <Radio.Group>
=======
                              <Radio.Group buttonStyle="solid">
>>>>>>> dev
                                <Space direction="vertical">
                                  {behavior &&
                                    behavior?.length > 0 &&
                                    behavior?.map((b) => (
<<<<<<< HEAD
                                      <Radio key={b?.id} value={b?.id}>
                                        {b?.description}
                                      </Radio>
=======
                                      <Radio.Button key={b?.id} value={b?.id}>
                                        {b?.description}
                                      </Radio.Button>
>>>>>>> dev
                                    ))}
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[6, 0]}>
                          <Col span={24}>
                            <Form.Item
                              name="receivedNebulization"
                              label="ได้พ่นยา"
                              rules={[{ required: true }]}
                            >
<<<<<<< HEAD
                              <Radio.Group>
                                <Radio key="1" value="1">
                                  ใช่
                                </Radio>
                                <Radio key="0" value="0">
                                  ไม่ใช่
                                </Radio>
=======
                              <Radio.Group buttonStyle="solid">
                                <Radio.Button key="1" value="1">
                                  ใช่
                                </Radio.Button>
                                <Radio.Button key="0" value="0">
                                  ไม่ใช่
                                </Radio.Button>
>>>>>>> dev
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              name="vomitting"
                              label="อาเจียนตลอด"
                              rules={[{ required: true }]}
                            >
<<<<<<< HEAD
                              <Radio.Group>
                                <Radio key="1" value="1">
                                  ใช่
                                </Radio>
                                <Radio key="0" value="0">
                                  ไม่ใช่
                                </Radio>
=======
                              <Radio.Group buttonStyle="solid">
                                <Radio.Button key="1" value="1">
                                  ใช่
                                </Radio.Button>
                                <Radio.Button key="0" value="0">
                                  ไม่ใช่
                                </Radio.Button>
>>>>>>> dev
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}
                </Card>
              </Col>
            )
            }

            <Col span={24} style={{ textAlign: 'center' }}>
              {process.env.NEXT_PUBLIC_REQ_GEO === 'false' ? (
                <>
                  <Text type="danger">กรุณาอนุญาติการแชร์ location</Text>
                  <Button
                    block
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    disabled={true}
                  >
                    คำนวน
                  </Button>
                </>
              ) : (
                <Button
                  block
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !values.ageDate ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length > 0
                  }
                >
                  คำนวน
                </Button>
              )}
            </Col>
            <Col span={deleteVitalSign ? 12 : 24}>
              <Button
                block
                shape="round"
                htmlType="button"
                onClick={handelReset}
              >
                ล้าง
              </Button>
            </Col>
          </Row>
        );
      }}
    </Form >
  );
};
