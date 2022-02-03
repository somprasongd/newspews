import { Row, Col } from 'antd'
import { DeleteOutlined, WarningOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

interface ChooseConfirmNewsPewsProps {
  data: any
}

export const ChooseConfirmNewsPews = ({ data }: ChooseConfirmNewsPewsProps) => {
  return <Row justify='center' className='modal-confirm-selection --danger chooseStaffDetail '>
    <Col className='header' span={24}>ยืนยัน Vital Signs</Col>
    <Col className='staff-name' span={24}>ไม่สามารถคำนวน {data?.newspewsAgeGroup === 10 ? 'NEWS' : 'PEWS'} ได้ เนื่องจากไม่ระบุค่า</Col>
    <Col className='staff-name' span={24} style={{ color: '#ff5446' }}>{data?.invalidValue?.toString()}</Col>
    <Col className='staff-name' span={24}>ยืนยันการบันทึกหรือไม่</Col>
    <WarningOutlined />
  </Row>
}