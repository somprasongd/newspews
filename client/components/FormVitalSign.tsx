import { Form, Row, Col, Input, Select, Button, Radio, TimePicker, Card, Divider } from 'antd'
import dynamic from 'next/dynamic'
const DatePickerCustom = dynamic(() => import('./Datepicker'), { ssr: false })
import th_TH from 'antd/lib/date-picker/locale/th_TH'
import { useRouter } from 'next/router'
import { CardPatientDetail } from './CardPatientDetail'
import { InputTypeNumber } from './InputTypeNumber'
import { bmiColor, bmiCalc, getAge } from '../shared/func'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface FormVitalSignProps {
  submit?: (values: any) => void
  crt: any[] | null
  avpu: any[] | null
  behavior: any[] | null
  initialValues?: any
  deleteVitalSign?: any
  setResponse?: any
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

const focusFields = ['weight', 'height', 'bp1', 'bp2', 'temp', 'map', 'pulse', 'rr', 'spo2', 'oxygen', 'waistline', 'hips', 'chest']

export const FormVitalSign = ({ submit, crt, avpu, behavior, initialValues, deleteVitalSign, setResponse }: FormVitalSignProps) => {
  const router = useRouter()
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
          form.resetFields()
          setResponse(null)
        }
        return <>
          <Row gutter={[10, 10]} className=''>

            <Col className='page-laout-patient-selected' span={24}>
              <Card>
                <Row gutter={[6, 0]}>
                  {/* <Col span={9}>
                  <InputTypeNumber
                    name='weight'
                    label='น้ำหนัก'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='kg.'
                    allValues={values}
                    form={form}
                    index={0}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-2]?[0-9]?\d)?(?:[,.]\d{1,2})?)|300(?:[.,]00?)?)$/g,
                        message: `น้ำหนักไม่ถูกต้อง`
                      }]}
                  />
                </Col>
                <Col span={9}>
                  <InputTypeNumber
                    name='height'
                    label='ส่วนสูง'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='cm.'
                    allValues={values}
                    form={form}
                    index={1}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-2]?[0-9]?\d)?(?:[,.]\d{1,2})?)|300(?:[.,]00?)?)$/g,
                        message: `ส่วนสูงไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={6}>
                  <Form.Item className='bmi-values-form' label='BMI' style={{ color: bmiColor(bmiCalc(values?.weight, values?.height)) }}>
                    {values?.weight && values?.height ? `${bmiCalc(values?.weight, values?.height)}` : ''}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='nutri' label='Nutrition'>
                    <Select>
                      {
                        nutrition && nutrition?.length > 0 && nutrition?.map((n) =>
                          <Option key={n?.f_visit_nutrition_level_id} value={n?.f_visit_nutrition_level_id}>
                            {rangeData(n?.visit_nutrition_level_max, n?.visit_nutrition_level_min)} ({n?.visit_nutrition_level_description})
                          </Option>)
                      }
                    </Select>
                  </Form.Item>
                </Col> */}
                  {/* <Col span={12}>
                  <Form.Item name='bmi' hidden>
                    <Input />
                  </Form.Item>
                </Col> */}
                  <Col span={24}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <label>อายุ</label>
                      </Col>
                      <Col span={7}>
                        <Form.Item name={['age', 'year']} >
                          <Input type='number' pattern="[0-9.]*" inputMode="decimal" addonAfter='ปี' />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item name={['age', 'month']} >
                          <Input type='number' pattern="[0-9.]*" inputMode="decimal" addonAfter='เดือน' />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item name={['age', 'day']} >
                          <Input type='number' pattern="[0-9.]*" inputMode="decimal" addonAfter='วัน' />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item>
                          <DatePickerCustom
                            inputReadOnly
                            allowClear={false}
                            onFocus={() => {
                              setNextField(null)
                            }}
                            disabledDate={(current) => current && current > dayjs()}
                            onChange={(value) => form.setFieldsValue({ ...getAge(value as Dayjs) })}
                            placeholder=''
                            locale={th_TH}
                            format='DD/MM/BBBB'
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

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
                  <Col span={12}>
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
                  <Col span={12}>
                    <InputTypeNumber
                      name='map'
                      label='MAP'
                      lengthDecimalBefore={3}
                      lengthDecimalAfter={0}
                      addonAfter='mmHg'
                      allValues={values}
                      form={form}
                      index={5}
                      nextField={nextField}
                      setNextField={setNextField}
                      focusFields={focusFields}
                      rules={[
                        {
                          pattern: /^\d*\.?\d*$/g,
                          message: `MAP ไม่ถูกต้อง`
                        }
                      ]}
                    />
                  </Col>
                  <Col span={12}>
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
                  <Col span={12}>
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
                  <Col span={12}>
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
                  <Col span={12}>
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
                  (values?.newspewsAgeGroup === 10 || values?.yearDob > 15) ? <Row gutter={[6, 0]}>
                    <Col span={24}>
                      <Form.Item name='avpu' label='AVPU'>
                        <Select onFocus={() => {
                          setNextField(null)
                        }}>
                          <Option key={0} value=''>
                            ไม่ระบุ
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
                  (values?.newspewsAgeGroup !== 10 || values?.yearDob <= 15) && <>
                    <Row gutter={[6, 0]}>
                      <Col span={24}>
                        <Form.Item name='crt' label='CRT'>
                          <Select onFocus={() => {
                            setNextField(null)
                          }}>
                            <Option key={0} value=''>
                              ไม่ระบุ
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
                        <Form.Item name='behavior' label='พฤติกรรม'>
                          <Select onFocus={() => {
                            setNextField(null)
                          }}>
                            <Option key={0} value=''>
                              ไม่ระบุ
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
                      <Col span={12}>
                        <Form.Item name='receivedNebulization' label='ได้พ่นยา'>
                          <Select onFocus={() => {
                            setNextField(null)
                          }}>
                            <Option key='' value=''>ไม่ระบุ</Option>
                            <Option key='1' value='1'>ใช่</Option>
                            <Option key='0' value='0'>ไม่ใช่</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name='vomitting' label='อาเจียนตลอด'>
                          <Select onFocus={() => {
                            setNextField(null)
                          }}>
                            <Option key='' value=''>ไม่ระบุ</Option>
                            <Option key='1' value='1'>ใช่</Option>
                            <Option key='0' value='0'>ไม่ใช่</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                }
                {/* <Row className='row-organ-size' gutter={[6, 0]}>
                <Col span={24}>
                  <Form.Item label='หน่วยที่ใช้ในการวัดขนาดอวัยวะ' name='unit'>
                    <Radio.Group className='--max-width --options-equal' optionType='button'>
                      <Radio.Button value={1}>นิ้ว</Radio.Button>
                      <Radio.Button value={2}>เซนติเมตร</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <InputTypeNumber
                    inch
                    name='waistlineInch'
                    label='รอบเอว'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='นิ้ว'
                    allValues={values}
                    form={form}
                    index={10}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    disabled={values?.unit !== 1}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-1]?[0-9]?\d)?(?:[,.]\d{1,2})?)|200(?:[.,]00?)?)$/g,
                        message: `รอบเอวไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <InputTypeNumber
                    cm
                    name='waistline'
                    label='รอบเอว'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='ซม.'
                    allValues={values}
                    form={form}
                    index={10}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    disabled={values?.unit !== 2}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-3]?[0-9]?\d)?(?:[,.]\d{1,2})?)|400(?:[.,]00?)?)$/g,
                        message: `รอบเอวไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <InputTypeNumber
                    inch
                    name='hipsInch'
                    label='รอบสะโพก'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='นิ้ว'
                    allValues={values}
                    form={form}
                    index={11}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    disabled={values?.unit !== 1}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-1]?[0-9]?\d)?(?:[,.]\d{1,2})?)|200(?:[.,]00?)?)$/g,
                        message: `รอบสะโพกไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <InputTypeNumber
                    cm
                    name='hips'
                    label='รอบสะโพก'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='ซม.'
                    allValues={values}
                    form={form}
                    index={11}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    disabled={values?.unit !== 2}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-3]?[0-9]?\d)?(?:[,.]\d{1,2})?)|400(?:[.,]00?)?)$/g,
                        message: `รอบสะโพกไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <InputTypeNumber
                    inch
                    name='chestInch'
                    label='รอบอก'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='นิ้ว'
                    allValues={values}
                    form={form}
                    index={12}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    disabled={values?.unit !== 1}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-1]?[0-9]?\d)?(?:[,.]\d{1,2})?)|200(?:[.,]00?)?)$/g,
                        message: `รอบอกไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <InputTypeNumber
                    cm
                    name='chest'
                    label='รอบอก'
                    lengthDecimalBefore={3}
                    lengthDecimalAfter={2}
                    addonAfter='ซม.'
                    allValues={values}
                    form={form}
                    index={12}
                    nextField={nextField}
                    setNextField={setNextField}
                    focusFields={focusFields}
                    disabled={values?.unit !== 2}
                    rules={[
                      {
                        pattern: /^(?=.)(?!0*[.,]?0*$)(?:(?:(?:0|[1-3]?[0-9]?\d)?(?:[,.]\d{1,2})?)|400(?:[.,]00?)?)$/g,
                        message: `รอบอกไม่ถูกต้อง`
                      }
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[6, 0]}>
                <Col span={24}>
                  <Form.Item name='note' label='หมายเหตุ'>
                    <Input.TextArea rows={6} onFocus={() => {
                      setNextField(null)
                    }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[6, 0]}>
                <Col span={12}>
                  <Form.Item name='checkDate' label='วันที่'>
                    <DatePickerCustom
                      inputReadOnly
                      allowClear={false}
                      onFocus={() => {
                        setNextField(null)
                      }}
                      placeholder=''
                      locale={th_TH}
                      format='DD/MM/BBBB'
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='checkTime' label='เวลา'>
                    <TimePicker
                      showNow
                      allowClear={false}
                      inputReadOnly
                      onFocus={() => {
                        setNextField(null)
                      }} format='HH:mm' style={{ width: '100%' }} placeholder='' />
                  </Form.Item>
                </Col>
              </Row> */}
              </Card>
            </Col>
          </Row >
          <Row gutter={[10, 10]} className='footer-control'>
            <Col span={24}>
              <Button block shape='round' type='primary' htmlType='submit'>คำนวน</Button>
            </Col>
            <Col span={deleteVitalSign ? 12 : 24}>
              <Button block shape='round' htmlType="button" onClick={handelReset}>ล้าง</Button>
            </Col>
            {
              deleteVitalSign && <Col span={12}>
                <Button block danger shape='round' htmlType='button' onClick={deleteVitalSign}>ลบ</Button>
              </Col>
            }

          </Row>
        </>
      }
    }
  </Form >
}