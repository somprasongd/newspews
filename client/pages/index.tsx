import React, { useState } from 'react'
import { FormVitalSign } from '../components/FormVitalSign'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { NextPage } from 'next'
import { geolocated } from "react-geolocated";
import { calculateNewsPews } from '../services/calculate'

const Home: NextPage = (props: any) => {
  const router = useRouter()
  const [crt, setCrt] = useState<any>([{
    id: 0, description: 'ชมพู capillary refill 1-2 วิ'
  }, {
    id: 1, description: 'ซีด capillary refill 3 วิ'
  }, {
    id: 2, description: 'เทา capillary refill 4 วิ'
  }, {
    id: 3, description: 'ตัวลาย capillary refill ≥5 วิ'
  }])
  const [avpu, setAvpu] = useState<any>([{
    id: 0, description: 'Alert ตื่นดี'
  }, {
    id: 1, description: 'Voice ตอบสนองต่อการเรียก'
  }, {
    id: 2, description: 'Pain ตอบสนองต่อเจ็บ'
  }, {
    id: 3, description: 'Unresponsive ไม่ตอบสนอง'
  }])

  const [behavior, setBehavior] = useState<any>([{
    id: 0, description: 'เล่นดี'
  }, {
    id: 1, description: 'หลับ'
  }, {
    id: 2, description: 'กระสับกระส่าย'
  }, {
    id: 3, description: 'ซึม/สับสน/ไม่ค่อยตอบสนองต่อเจ็บ'
  }])
  const [initialValues, setInitialValues] = useState<any>(null)
  const [response, setResponse] = useState<any>(null)

  const onSubmit = async (values: any) => {
    const data = {
      age: values.age,
      diastolic: values?.bp?.[0],
      systolic: values?.bp?.[1],
      nebulize_code: values?.receivedNebulization ? values?.receivedNebulization : null,
      vomiting_code: values?.vomitting,
      behavior_code: values?.behavior,
      avpu_code: values?.avpu,
      cardiovascular_code: values?.crt,
      respiratory_rate: values?.rr,
      heart_rate: values?.pulse,
      temperature: values?.temp,
      oxygen: values?.oxygen,
      spo2: values?.spo2,
      geo: {
        latitude: props?.coords?.latitude,
        longitude: props?.coords?.longitude
      }
    }
    console.log(data)
    const res = await calculateNewsPews(data)
    setResponse(res.data)
  }

  return <>
    <Head>
      <title>บันทึก Vital Signs</title>
    </Head>
    <>
      <FormVitalSign
        initialValues={initialValues}
        submit={onSubmit}
        crt={crt}
        avpu={avpu}
        behavior={behavior}
        setResponse={setResponse}
      />

      Type:{response?.type}
      NEWS/PEWS: {response?.score}
      
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
    </>
  </>
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Home)