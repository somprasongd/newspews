import { Form, Row, Col, Input, Select, Button, Card, Layout, Typography, InputNumber } from 'antd'
import dynamic from 'next/dynamic'
const DatePickerCustom = dynamic(() => import('./Datepicker'), { ssr: false })
import th_TH from 'antd/lib/date-picker/locale/th_TH'
import { useRouter } from 'next/router'
import { CardPatientDetail } from './CardPatientDetail'
import { InputTypeNumber } from './InputTypeNumber'
import { bmiColor, bmiCalc, getAge, calculateAgeGroup } from '../shared/func'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { InputTypeAge } from './InputTypeAge'
const { Content } = Layout
const { Text } = Typography

interface FormVitalSignProps {
  submit?: (values: any) => void
  crt: any[] | null
  avpu: any[] | null
  behavior: any[] | null
  initialValues?: any
  deleteVitalSign?: any
  setResponse?: any
  response?: any
}

const { Option } = Select

const rangeData = (max: any, min: any) => {
  if (max && min) {
    return `${max} - ${min}`
  } else if (max && !min) {
    return `น้อยกว่า ${max}`
  } else if (min && !max) {
    return `มากกว่า ${min}`
  } else {
    return `0`
  }
}

const focusFields = ['ageDate', 'weight', 'height', 'bp1', 'bp2', 'temp', 'map', 'pulse', 'rr', 'spo2', 'oxygen', 'waistline', 'hips', 'chest']

export const FormVitalSign = ({ submit, crt, avpu, behavior, initialValues, deleteVitalSign, setResponse, response }: FormVitalSignProps) => {
  const [nextField, setNextField] = useState<any>(0)

  return <Form
    autoComplete='off'
    onChange={() => { }}
    layout='vertical'
    initialValues={initialValues}
    onFinish={submit}
  >
    {
      (values, form) => {
        const handelReset = () => {
          form.getFieldInstance('ageDate').focus()
          form.resetFields()
          setResponse(null)
        }
        return <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card>
              <Row gutter={[6, 0]}>

                <Col span={24}>
                  <Row gutter={[8, 8]}>
                    <Col span={24}>
                      <InputTypeAge
                        allValues={values}
                        form={form}
                        index={1}
                        nextField={nextField}
                        setNextField={setNextField}
                        focusFields={focusFields}
                        name={'ageDate'} label='อายุ (ปี.เดือน.วัน)' />
                    </Col>

                    {/* <Col span={3}>
                      <Form.Item>
                        <DatePickerCustom
                          inputReadOnly
                          allowClear={false}
                          onFocus={() => {
                            setNextField(null)
                          }}
                          disabledDate={(current) => current && current > dayjs()}
                          
                          placeholder=''
                          locale={th_TH}
                          format='DD/MM/BBBB'
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col> */}

                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col>
            <Card>
              <Row>
                <Col span={24}>
                  <Form.Item label='ความดัน'>
                    <Input.Group compact>
                      <InputTypeNumber
                        bp='bp1'
                        name={['bp', 0]}
                        lengthDecimalBefore={3}
                        lengthDecimalAfter={0}
                        addonAfter='/'
                        allValues={values}
                        form={form}
                        index={2}
                        nextField={nextField}
                        setNextField={setNextField}
                        focusFields={focusFields}
                        style={{ width: '50%' }}
                        rules={[
                          {
                            pattern: /^(?=.)(?!0*$)(?:(?:(?:0|[1-2]?[0-9]?\d))|300?)$/g,
                            message: `ความดันไม่ถูกต้อง`
                          }
                        ]}
                      />
                      <InputTypeNumber
                        bp='bp2'
                        name={['bp', 1]}
                        lengthDecimalBefore={3}
                        lengthDecimalAfter={0}
                        addonAfter='mmHg'
                        allValues={values}
                        form={form}
                        index={3}
                        nextField={nextField}
                        setNextField={setNextField}
                        focusFields={focusFields}
                        style={{ width: '50%' }}
                        rules={[
                          {
                            pattern: /^(?=.)(?!0*$)(?:(?:(?:0|[1-1]?[0-9]?\d))|200?)$/g,
                            message: `ความดันไม่ถูกต้อง`
                          }
                        ]}
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <InputTypeNumber
                    name='temp'
                    label='อุณหภูมิ'
                    lengthDecimalBefore={2}
                    lengthDecimalAfter={1}
                    addonAfter='°C'
                    allValues={values}
                    form={form}
                    index={4}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[3-4]?\d)?(?:[,.]\d{1,1})?)|50(?:[.,]0?)?)$/g,
                        message: `อุณหภูมิไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <InputTypeNumber
                    name='pulse'
                    label='ชีพจร'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={0}
                    addonAfter='bmp'
                    allValues={values}
                    form={form}
                    index={6}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    rules={[
                      {
                        pattern: /^\d*\.?\d*$/g,
                        message: `ชีพจรไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <InputTypeNumber
                    name='rr'
                    label='การหายใจ'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={0}
                    addonAfter='bmp'
                    allValues={values}
                    form={form}
                    index={7}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    rules={[
                      {
                        pattern: /^\d*\.?\d*$/g,
                        message: `การหายใจไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <InputTypeNumber
                    name='spo2'
                    label='SPO2'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={0}
                    addonAfter='%'
                    allValues={values}
                    form={form}
                    index={8}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    rules={[
                      {
                        pattern: /^\d*\.?\d*$/g,
                        message: `SPO2 ไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <InputTypeNumber
                    name='oxygen'
                    label='Oxygen'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={0}
                    addonAfter='L/m'
                    allValues={values}
                    form={form}
                    index={9}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    rules={[
                      {
                        pattern: /^\d*\.?\d*$/g,
                        message: `Oxygen ไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
              </Row>
              {
                (values.ageDate && (calculateAgeGroup(values.ageDate) === 10 || values?.ageDate && values?.ageDate.split('.')?.[0] > 15)) ? <Row gutter={[6, 0]}>
                  <Col span={24}>
                    <Form.Item name='avpu' label='AVPU' rules={[{ required: true }]}>
                      <Select defaultValue='' onFocus={() => {
                        setNextField(null)
                      }}>
                        <Option key={0} value=''>
                          ต้องเลือก 1 ค่า
                        </Option>)
                        {
                          avpu && avpu?.length > 0 && avpu?.map((a) =>
                            <Option key={a?.id} value={a?.id}>
                              {a?.description}
                            </Option>)
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row> : <></>
              }
              {
                (values.ageDate && (calculateAgeGroup(values.ageDate) !== 10 || values?.ageDate && values?.ageDate.split('.')?.[0] <= 15)) && <>
                  <Row gutter={[6, 0]}>
                    <Col span={24}>
                      <Form.Item name='crt' label='CRT' rules={[{ required: true }]}>
                        <Select defaultValue='' onFocus={() => {
                          setNextField(null)
                        }}>
                          <Option key={0} value=''>
                            ต้องเลือก 1 ค่า
                          </Option>)
                          {
                            crt && crt?.length > 0 && crt?.map((c) =>
                              <Option key={c?.id} value={c?.id}>
                                {c?.description}
                              </Option>)
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name='behavior' label='พฤติกรรม' rules={[{ required: true }]}>
                        <Select defaultValue='' onFocus={() => {
                          setNextField(null)
                        }}>
                          <Option key={0} value=''>
                            ต้องเลือก 1 ค่า
                          </Option>)
                          {
                            behavior && behavior?.length > 0 && behavior?.map((b) =>
                              <Option key={b?.id} value={b?.id}>
                                {b?.description}
                              </Option>)
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[6, 0]}>
                    <Col span={24}>
                      <Form.Item name='receivedNebulization' label='ได้พ่นยา' rules={[{ required: true }]}>
                        <Select defaultValue='' onFocus={() => {
                          setNextField(null)
                        }}>
                          <Option key='' value=''>ต้องเลือก 1 ค่า </Option>
                          <Option key='1' value='1'>ใช่</Option>
                          <Option key='0' value='0'>ไม่ใช่</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name='vomitting' label='อาเจียนตลอด' rules={[{ required: true }]}>
                        <Select defaultValue='' onFocus={() => {
                          setNextField(null)
                        }}>
                          <Option key='' value=''>ต้องเลือก 1 ค่า</Option>
                          <Option key='1' value='1'>ใช่</Option>
                          <Option key='0' value='0'>ไม่ใช่</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              }
            </Card>
          </Col>

          {
            response !== null && <Col span={24}>
              <Card>
                Type:{response?.type}
                NEWS/PEWS: {response?.score}
              </Card>
            </Col>
          }
          <Col span={24} style={{ textAlign: 'center' }}>
            {process.env.NEXT_PUBLIC_REQ_GEO === 'false'
              ? <>
                <Text type="danger">กรุณาอนุญาติการแชร์ location</Text>
                <Button
                  block
                  shape='round'
                  type='primary'
                  htmlType='submit'
                  disabled={true}>
                  คำนวน
                </Button>
              </>
              : <Button
                block
                shape='round'
                type='primary'
                htmlType='submit'
                disabled={!values.ageDate || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}>
                คำนวน
              </Button>}
          </Col>
          <Col span={deleteVitalSign ? 12 : 24}>
            <Button block shape='round' htmlType="button" onClick={handelReset}>ล้าง</Button>
          </Col>
        </Row>
      }
    }
  </Form >
}