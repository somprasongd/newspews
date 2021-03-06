import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  Radio,
  Space,
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
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const handelReset = () => {
    form.getFieldInstance('ageDate').focus();
    form.resetFields();
    setResponse(null);
    setNextField(0);
  };

  const handleEnterAge = (event: any) => {
    setNextField(0);
    if (event.key === 'Enter' || event.keyCode == 13) {
      event.preventDefault();
      if (form.getFieldInstance(['bp', '0']))
        form.getFieldInstance(['bp', '0'])?.focus();
      else if (form.getFieldInstance(['pulse']))
        form.getFieldInstance(['pulse'])?.focus();
      return false;
    }
    if (response !== null) {
      form.resetFields();
      setResponse(null);
    }
  };

  return (
    <Form
      {...layout}
      autoComplete="off"
      onChange={() => {}}
      initialValues={initialValues}
      onFinish={submit}
      form={form}
    >
      {(values) => {
        return (
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                }}
              >
                <Row gutter={[6, 0]}>
                  <Col span={24}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <InputTypeAge
                          handleEnterAge={handleEnterAge}
                          allValues={values}
                          form={form}
                          addonAfter="??????.???????????????.?????????"
                          nextField={nextField}
                          name={'ageDate'}
                          label="???????????? "
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
                            {year} ?????? {month} ??????????????? {day} ?????????
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
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                  }}
                  title={
                    values.ageDate && calculateAgeGroup(values.ageDate) === 10
                      ? 'NEWS'
                      : 'PEWS'
                  }
                  extra={
                    response !== null && (
                      <Alert
                        message={<>{response?.score} ???????????????</>}
                        type="success"
                      />
                    )
                  }
                >
                  <Row>
                    {values.ageDate &&
                      (calculateAgeGroup(values.ageDate) === 10 ||
                        (values?.ageDate &&
                          values?.ageDate.split('.')?.[0] >= 15)) && (
                        <>
                          <Col span={24}>
                            <Form.Item label="????????????????????????????????????" shouldUpdate>
                              <Input.Group compact className="bp">
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
                                  rules={[
                                    {
                                      required:
                                        values.ageDate &&
                                        calculateAgeGroup(values.ageDate) ===
                                          10,
                                      pattern:
                                        /^(?=.)(?!0*$)(?:(?:(?:0|[1-2]?[0-9]?\d))|300?)$/g,
                                      message: `???????????????????????????????????????????????????`,
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
                                  rules={[
                                    {
                                      required:
                                        values.ageDate &&
                                        calculateAgeGroup(values.ageDate) ===
                                          10,
                                      pattern:
                                        /^(?=.)(?!0*$)(?:(?:(?:0|[1-1]?[0-9]?\d))|200?)$/g,
                                      message: `???????????????????????????????????????????????????`,
                                    },
                                  ]}
                                />
                              </Input.Group>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <InputTypeNumber
                              name="temp"
                              label="????????????????????????"
                              lengthDecimalBefore={2}
                              lengthDecimalAfter={1}
                              addonAfter="??C"
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
                                  message: `??????????????????????????????????????????????????????`,
                                },
                              ]}
                            />
                          </Col>
                        </>
                      )}

                    <Col span={24}>
                      <InputTypeNumber
                        name="pulse"
                        label="???????????????"
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
                            message: `?????????????????????????????????????????????`,
                          },
                        ]}
                      />
                    </Col>
                    <Col span={24}>
                      <InputTypeNumber
                        name="rr"
                        label="????????????????????????"
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
                            message: `??????????????????????????????????????????????????????`,
                          },
                        ]}
                      />
                    </Col>

                    {values.ageDate &&
                      (calculateAgeGroup(values.ageDate) === 10 ||
                        (values?.ageDate &&
                          values?.ageDate.split('.')?.[0] >= 15)) && (
                        <>
                          <Col span={24}>
                            <InputTypeNumber
                              name="spo2"
                              label="O2sat"
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
                                  message: `O2sat ??????????????????????????????`,
                                },
                              ]}
                            />
                          </Col>
                        </>
                      )}

                    <Col span={24}>
                      <InputTypeNumber
                        name="oxygen"
                        label="?????????????????????????????????"
                        lengthDecimalBefore={3}
                        lengthDecimalAfter={0}
                        addonAfter="L/m"
                        allValues={values}
                        form={form}
                        index={9}
                        nextField={0}
                        setNextField={setNextField}
                        focusFields={focusFields}
                        rules={[
                          {
                            required: true,
                            pattern: /^\d*\.?\d*$/g,
                            message: `????????????????????????????????? ??????????????????????????????`,
                          },
                        ]}
                      />
                    </Col>
                  </Row>

                  {values.ageDate &&
                    (calculateAgeGroup(values.ageDate) === 10 ||
                      (values?.ageDate &&
                        values?.ageDate.split('.')?.[0] >= 15)) && (
                      <Row gutter={[6, 0]}>
                        <Col span={24}>
                          <Form.Item
                            name="avpu"
                            label="??????????????????????????????????????????????????????(AVPU)"
                            rules={[{ required: true }]}
                          >
                            <Radio.Group buttonStyle="solid">
                              <Space direction="vertical">
                                {avpu &&
                                  avpu?.length > 0 &&
                                  avpu?.map((a) => (
                                    <Radio.Button key={a?.id} value={a?.id}>
                                      {a?.description}
                                    </Radio.Button>
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
                        values?.ageDate.split('.')?.[0] < 15)) && (
                      <>
                        <Row gutter={[6, 0]}>
                          <Col span={24}>
                            <Form.Item
                              name="crt"
                              label="Cap. Refill Time"
                              rules={[{ required: true }]}
                            >
                              <Radio.Group buttonStyle="solid">
                                <Space direction="vertical">
                                  {crt &&
                                    crt?.length > 0 &&
                                    crt?.map((c) => (
                                      <Radio.Button key={c?.id} value={c?.id}>
                                        {c?.description}
                                      </Radio.Button>
                                    ))}
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              name="behavior"
                              label="????????????????????????"
                              rules={[{ required: true }]}
                            >
                              <Radio.Group buttonStyle="solid">
                                <Space direction="vertical">
                                  {behavior &&
                                    behavior?.length > 0 &&
                                    behavior?.map((b) => (
                                      <Radio.Button key={b?.id} value={b?.id}>
                                        {b?.description}
                                      </Radio.Button>
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
                              label="???????????????????????? 15 ????????????"
                              rules={[{ required: true }]}
                            >
                              <Radio.Group buttonStyle="solid">
                                <Radio.Button key="1" value="1">
                                  ?????????
                                </Radio.Button>
                                <Radio.Button key="0" value="0">
                                  ??????????????????
                                </Radio.Button>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item
                              name="vomitting"
                              label="???????????????????????????????????????????????????????????????"
                              rules={[{ required: true }]}
                            >
                              <Radio.Group buttonStyle="solid">
                                <Radio.Button key="1" value="1">
                                  ?????????
                                </Radio.Button>
                                <Radio.Button key="0" value="0">
                                  ??????????????????
                                </Radio.Button>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}
                </Card>
              </Col>
            )}

            <Col span={24} style={{ textAlign: 'center' }}>
              {process.env.NEXT_PUBLIC_REQ_GEO === 'false' ? (
                <>
                  <Text type="danger">????????????????????????????????????????????????????????? location</Text>
                  <Button
                    block
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    disabled={true}
                  >
                    ???????????????
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
                  ??????????????????????????????
                </Button>
              )}
            </Col>
            <Col span={24}>
              <Button
                block
                shape="round"
                htmlType="button"
                onClick={handelReset}
              >
                ???????????????????????????
              </Button>
            </Col>
          </Row>
        );
      }}
    </Form>
  );
};
