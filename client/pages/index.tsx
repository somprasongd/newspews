import React, { useState } from 'react';
import { FormVitalSign } from '../components/FormVitalSign';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextPage } from 'next';
import { geolocated } from 'react-geolocated';
import { calculateNewsPews } from '../services/calculate';

import { Row, Col, Card, Layout, Typography } from 'antd';
const { Content } = Layout;
const { Title } = Typography;

const Home: NextPage = (props: any) => {
  const router = useRouter();
  const [crt, setCrt] = useState<any>([
    {
      id: '0',
      description: 'ชมพู capillary refill 1-2 วิ',
    },
    {
      id: '1',
      description: 'ซีด capillary refill 3 วิ',
    },
    {
      id: '2',
      description: 'เทา capillary refill 4 วิ',
    },
    {
      id: '3',
      description: 'ตัวลาย capillary refill ≥5 วิ',
    },
  ]);
  const [avpu, setAvpu] = useState<any>([
    {
      id: '0',
      description: 'Alert ตื่นดี',
    },
    {
      id: '1',
      description: 'Voice ตอบสนองต่อการเรียก',
    },
    {
      id: '2',
      description: 'Pain ตอบสนองต่อเจ็บ',
    },
    {
      id: '3',
      description: 'Unresponsive ไม่ตอบสนอง',
    },
  ]);

  const [behavior, setBehavior] = useState<any>([
    {
      id: '0',
      description: 'เล่นดี',
    },
    {
      id: '1',
      description: 'หลับ',
    },
    {
      id: '2',
      description: 'กระสับกระส่าย',
    },
    {
      id: '3',
      description: 'ซึม/สับสน/ไม่ค่อยตอบสนองต่อเจ็บ',
    },
  ]);
  const [initialValues, setInitialValues] = useState<any>(null);
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
      console.log(data);
      const res = await calculateNewsPews(data);

      setResponse(res);
    }
  };

  return (
    <Layout style={{ alignItems: 'center' }}>
      <Content
        style={{
          maxWidth: 500,
          padding: 8,
          margin: 0,
        }}
      >
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Title level={2}>NEWS/PEWS</Title>
          </Col>
          <FormVitalSign
            initialValues={initialValues}
            submit={onSubmit}
            crt={crt}
            avpu={avpu}
            behavior={behavior}
            setResponse={setResponse}
            response={response}
          />

          {/* <DrawerComfirm
          visible={openDrawer?.open}
          okText='ยืนยัน'
          closeText='ยกเลิก'
          onOk={async () => {
            // await createVS(openDrawer?.submit)
            setOpenDrawer({ open: false, data: {}, submit: {} })
          }}
          onCancel={() => { setOpenDrawer({ open: false, data: {}, submit: {} }) }}>
          <ChooseConfirmNewsPews data={openDrawer?.data} />
        </DrawerComfirm> */}
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
