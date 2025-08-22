import React, { useState } from 'react';
import { NextPage } from 'next';
import { geolocated } from 'react-geolocated';
import { calculateNewsPews } from '../services/calculate';
import { Layout, Typography, Row, Col } from 'antd';
import { Header } from '../components/modern/Header';
import { VitalSignForm } from '../components/modern/VitalSignForm';
import { ResultDisplay } from '../components/modern/ResultDisplay';

const { Content } = Layout;
const { Text } = Typography;

const Home: NextPage = (props: any) => {
  const [initialValues] = useState<any>({
    vomitting: '',
    receivedNebulization: '',
    behavior: '',
    crt: '',
    avpu: '',
  });
  const [response, setResponse] = useState<any>(null);

  const onSubmit = async (values: any) => {
    if (values.ageDate) {
      const [year = 0, month = 0, day = 0] = values?.ageDate?.split('.');
      let data: any = {
        age: {
          year: Number(year),
          month: Number(month),
          day: Number(day),
        },
        systolic: values?.bp?.[0] ? Number(values?.bp?.[0]) : 0,
        diastolic: values?.bp?.[1] ? Number(values?.bp?.[1]) : 0,
        nebulize_code: values?.receivedNebulization
          ? values?.receivedNebulization
          : '',
        vomiting_code: values?.vomitting ? values?.vomitting : '',
        behavior_code: values?.behavior ? values?.behavior : '',
        avpu_code: values?.avpu ? values?.avpu : '',
        cardiovascular_code: values?.crt ? values?.crt : '',
        respiratory_rate: values?.rr ? Number(values?.rr) : 0,
        heart_rate: values?.pulse ? Number(values?.pulse) : 0,
        temperature: values?.temp ? Number(values?.temp) : 0,
        oxygen: values?.oxygen ? Number(values?.oxygen) : 0,
        spo2: values?.spo2 ? Number(values?.spo2) : 0,
      };
      if (process.env.NEXT_PUBLIC_USE_GEO === 'true') {
        data = {
          ...data,
          geo: {
            latitude: props?.coords?.latitude,
            longitude: props?.coords?.longitude,
          },
        };
      }
      const res = await calculateNewsPews(data);
      setResponse(res);
    }
  };

  const handleReset = () => {
    setResponse(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        title="Early Warning Sign Calculator" 
        subtitle="[NEWS/PEWS]" 
      />
      <Content style={{ padding: 16 }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            {response ? (
              <div style={{ marginTop: 24 }}>
                <ResultDisplay 
                  score={response.score} 
                  onReset={handleReset} 
                />
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <Text type="secondary">
                    คะแนนของคุณคือ {response.score} ซึ่งอยู่ในระดับ{' '}
                    {response.score >= 5 ? 'สูง' : response.score >= 3 ? 'ปานกลาง' : 'ต่ำ'}
                  </Text>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 24 }}>
                <VitalSignForm
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  onReset={handleReset}
                />
              </div>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

let Rander;
if (process.env.NEXT_PUBLIC_USE_GEO === 'true') {
  Rander = geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    watchPosition: false,
  })(Home);
} else {
  Rander = Home;
}

export default Rander;
