import { Form, Row, Col, Typography, Alert } from 'antd';
import { Card } from './Card';
import { ModernInputNumber } from './InputNumber';
import { ModernRadioGroup } from './RadioGroup';
import { ModernButton } from './Button';
import { useState } from 'react';

const { Title, Text } = Typography;

interface VitalSignFormProps {
  onSubmit: (values: any) => void;
  onReset: () => void;
  initialValues?: any;
}

interface FormValues {
  ageDate: string;
  bp?: [string, string];
  temp?: string;
  pulse?: string;
  rr?: string;
  spo2?: string;
  oxygen?: string;
  avpu?: string;
  crt?: string;
  behavior?: string;
  receivedNebulization?: string;
  vomitting?: string;
}

export const VitalSignForm = ({ 
  onSubmit, 
  onReset,
  initialValues 
}: VitalSignFormProps) => {
  const [form] = Form.useForm();
  const [ageGroup, setAgeGroup] = useState<number | null>(null);
  const [ageValidationError, setAgeValidationError] = useState<string | null>(null);
  
  const handleAgeValidationError = (error: string | null) => {
    setAgeValidationError(error);
  };
  
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setFieldsValue({ ageDate: value });
    
    // Clear any previous validation error
    setAgeValidationError(null);
    
    // Validate age format in real-time
    if (value) {
      const parts = value.split('.');
      
      // Validate month (second part) - must be 0-11
      if (parts.length >= 2) {
        const month = parseInt(parts[1], 10);
        if (!isNaN(month) && month > 11) {
          setAgeValidationError('เดือนต้องอยู่ระหว่าง 0-11');
          return;
        }
      }
      
      // Validate day (third part) - must be 0-31
      if (parts.length >= 3) {
        const day = parseInt(parts[2], 10);
        if (!isNaN(day) && day > 31) {
          setAgeValidationError('วันต้องอยู่ระหว่าง 0-31');
          return;
        }
      }
      
      // Calculate age group only if no validation errors
      const year = parts[0] ? parseInt(parts[0], 10) : 0;
      let group;
      if (year === 0) {
        group = 1;
      } else if (year <= 2) {
        group = 5;
      } else if (year <= 5) {
        group = 6;
      } else if (year <= 7) {
        group = 7;
      } else if (year <= 9) {
        group = 8;
      } else if (year <= 15) {
        group = 9;
      } else {
        group = 10;
      }
      setAgeGroup(group);
    } else {
      setAgeGroup(null);
    }
  };
  
  const isAdult = ageGroup === 10;
  const isChild = ageGroup !== null && ageGroup !== 10;
  
  const onFinish = (values: any) => {
    // Don't submit if there's an age validation error
    if (ageValidationError) {
      return;
    }
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 500, margin: '0 auto' }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="ข้อมูลพื้นฐาน">
            <Form.Item
              name="ageDate"
              label="อายุ (ปี.เดือน.วัน)"
              rules={[{ required: true, message: 'กรุณาระบุอายุ' }]}
            >
              <ModernInputNumber
                placeholder="เช่น 25.0.0"
                allowAgeFormat={true}
                onAgeValidationError={handleAgeValidationError}
                onChange={handleAgeChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
            
            {ageValidationError && (
              <Alert 
                message={ageValidationError} 
                type="error" 
                showIcon 
                style={{ marginBottom: 16 }} 
              />
            )}
            
            {ageGroup !== null && !ageValidationError && (
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Text strong>
                  ระบบประเมิน: {isAdult ? 'NEWS (ผู้ใหญ่)' : 'PEWS (เด็ก)'}
                </Text>
              </div>
            )}
          </Card>
        </Col>
        
        {ageGroup !== null && !ageValidationError && (
          <>
            {/* Adult Form Sections */}
            {isAdult && (
              <>
                <Col span={24}>
                  <Card title="ความดันโลหิต">
                    <Row gutter={8}>
                      <Col span={12}>
                        <Form.Item
                          name={['bp', 0]}
                          label="SYS"
                          rules={[{ required: true, message: 'ระบุค่า SYS' }]}
                        >
                          <ModernInputNumber
                            placeholder="120"
                            addonAfter="mmHg"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={['bp', 1]}
                          label="DIA"
                          rules={[{ required: true, message: 'ระบุค่า DIA' }]}
                        >
                          <ModernInputNumber
                            placeholder="80"
                            addonAfter="mmHg"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card title="สัญญาณชีพ">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name="temp"
                          label="อุณหภูมิ"
                          rules={[{ required: true, message: 'ระบุอุณหภูมิ' }]}
                        >
                          <ModernInputNumber
                            placeholder="37.0"
                            addonAfter="°C"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="pulse"
                          label="ชีพจร"
                          rules={[{ required: true, message: 'ระบุชีพจร' }]}
                        >
                          <ModernInputNumber
                            placeholder="72"
                            addonAfter="bpm"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="rr"
                          label="อัตราการหายใจ"
                          rules={[{ required: true, message: 'ระบุอัตราการหายใจ' }]}
                        >
                          <ModernInputNumber
                            placeholder="16"
                            addonAfter="bpm"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="spo2"
                          label="ออกซิเจนในเลือด"
                          rules={[{ required: true, message: 'ระบุค่า SpO2' }]}
                        >
                          <ModernInputNumber
                            placeholder="98"
                            addonAfter="%"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card title="ระดับความรู้สึกตัว (AVPU)">
                    <Form.Item
                      name="avpu"
                      rules={[{ required: true, message: 'เลือกระดับความรู้สึกตัว' }]}
                    >
                      <ModernRadioGroup
                        options={[
                          { label: 'A', value: '0', description: 'ตื่นดี Alert' },
                          { label: 'V', value: '1', description: 'ตอบสนองต่อการเรียก Voice' },
                          { label: 'P', value: '2', description: 'ตอบสนองต่อเจ็บ Pain' },
                          { label: 'U', value: '3', description: 'ไม่ตอบสนอง Unresponsive' }
                        ]}
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </>
            )}
            
            {/* Child Form Sections */}
            {isChild && (
              <>
                <Col span={24}>
                  <Card title="Capillary Refill Time">
                    <Form.Item
                      name="crt"
                      rules={[{ required: true, message: 'เลือก Capillary Refill Time' }]}
                    >
                      <ModernRadioGroup
                        options={[
                          { label: '1-2 วิ', value: '0', description: 'ชมพู capillary refill' },
                          { label: '3 วิ', value: '1', description: 'ซีด capillary refill' },
                          { label: '4 วิ', value: '2', description: 'เทา capillary refill' },
                          { label: '≥5 วิ', value: '3', description: 'ตัวลาย capillary refill' }
                        ]}
                      />
                    </Form.Item>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card title="พฤติกรรม">
                    <Form.Item
                      name="behavior"
                      rules={[{ required: true, message: 'เลือกพฤติกรรม' }]}
                    >
                      <ModernRadioGroup
                        options={[
                          { label: 'เล่นดี', value: '0', description: 'เด็กตื่นดี เล่นได้ตามปกติ' },
                          { label: 'หลับ', value: '1', description: 'เด็กง่วง นอนหลับ' },
                          { label: 'กระสับกระส่าย', value: '2', description: 'เด็กกระวนกระวาย' },
                          { label: 'ซึม', value: '3', description: 'ซึม สับสน ตอบสนองต่อเจ็บลดลง' }
                        ]}
                      />
                    </Form.Item>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card title="การรักษา">
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Form.Item
                          name="receivedNebulization"
                          label="พ่นยาทุก 15 นาที"
                          rules={[{ required: true, message: 'เลือกการพ่นยา' }]}
                        >
                          <ModernRadioGroup
                            direction="horizontal"
                            options={[
                              { label: 'ใช่', value: '1' },
                              { label: 'ไม่ใช่', value: '0' }
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="vomitting"
                          label="อาเจียนตลอดหลังผ่าตัด"
                          rules={[{ required: true, message: 'เลือกการอาเจียน' }]}
                        >
                          <ModernRadioGroup
                            direction="horizontal"
                            options={[
                              { label: 'ใช่', value: '1' },
                              { label: 'ไม่ใช่', value: '0' }
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card title="สัญญาณชีพ">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name="pulse"
                          label="ชีพจร"
                          rules={[{ required: true, message: 'ระบุชีพจร' }]}
                        >
                          <ModernInputNumber
                            placeholder="100"
                            addonAfter="bpm"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="rr"
                          label="อัตราการหายใจ"
                          rules={[{ required: true, message: 'ระบุอัตราการหายใจ' }]}
                        >
                          <ModernInputNumber
                            placeholder="20"
                            addonAfter="bpm"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </>
            )}
            
            {/* Common Section */}
            <Col span={24}>
              <Card title="การใช้ออกซิเจน">
                <Form.Item
                  name="oxygen"
                  label="Flow Rate"
                  rules={[{ required: true, message: 'ระบุ Flow Rate' }]}
                >
                  <ModernInputNumber
                    placeholder="2"
                    addonAfter="L/m"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Card>
            </Col>
            
            <Col span={24}>
              <ModernButton
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%', height: 48, fontSize: 16 }}
              >
                คำนวณคะแนน
              </ModernButton>
              
              <ModernButton
                htmlType="button"
                onClick={onReset}
                size="large"
                style={{ 
                  width: '100%', 
                  height: 48, 
                  fontSize: 16, 
                  marginTop: 12 
                }}
              >
                เริ่มใหม่
              </ModernButton>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};