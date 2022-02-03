import React, { useState } from 'react'
import { ChooseConfirmNewsPews } from '../components/ChooseConfirmNewsPews'
import { DrawerComfirm } from '../components/DrawerConfirm'
import { FormVitalSign } from '../components/FormVitalSign'
import { PageLayout } from '../components/PageLayout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { NextPage } from 'next'

const Home: NextPage = ({ staffMachine, setStaffMachine, servicePoint }: any) => {
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
  const [openDrawer, setOpenDrawer] = useState<any>({
    open: false,
    data: {},
    submit: {}
  })

  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      bp: values?.bp?.[0] && values?.bp?.[1] ? `${values?.bp?.[0]}/${values?.bp?.[1]}` : null,
      receivedNebulization: values?.receivedNebulization ? values?.receivedNebulization : null,
      vomitting: values?.vomitting,
      behavior: values?.behavior,
      avpu: values?.avpu,
      crt: values?.crt
    }
    const invalidValue: any[] = []
    const mapKeyLang: any = {
      avpu: 'AVPU',
      rr: 'การหายใจ',
      pulse: 'ชีพจร',
      oxygen: 'Oxygen',
      temp: 'อุณหภูมิ',
      bp: 'ความดัน',
      spo2: 'spo2',
      behavior: 'พฤติกรรม',
      crt: 'CRT',
      receivedNebulization: 'ได้พ่นยา',
      vomitting: 'อาเจียนตลอด'
    }
    if (values?.newspewsAgeGroup === 10) {
      const validData = ['avpu', 'rr', 'pulse', 'oxygen', 'temp', 'bp', 'spo2']
      validData?.forEach((v) => {
        if (!data[v]) {
          invalidValue.push(mapKeyLang[v])
        }
      })
    } else if (values?.newspewsAgeGroup < 10) {
      const validData = ['rr', 'pulse', 'behavior', 'crt', 'receivedNebulization', 'vomitting', 'oxygen']
      validData?.forEach((v) => {
        if (!data[v]) {
          invalidValue.push(mapKeyLang[v])
        }
      })
    }
    console.log(data)
  }

  return <>
    <Head>
      <title>บันทึก Vital Signs</title>
    </Head>
    <PageLayout title='เพิ่ม Vital Signs' onBack={() => router.back()}
      user={staffMachine} setUser={setStaffMachine}
      servicePoint={servicePoint} hideHeader>
      <>
        <FormVitalSign
          initialValues={initialValues}
          submit={onSubmit}
          crt={crt}
          avpu={avpu}
          behavior={behavior}
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
      </>
    </PageLayout>
  </>
}

export default Home