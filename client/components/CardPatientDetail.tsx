import { Card, Row, Col, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

interface CardPatientDetailProps {
  data: any
  fullInfo?: boolean
}

export const CardPatientDetail = ({ data, fullInfo }: CardPatientDetailProps) => {
  return <Card loading={!data}>
    <Row gutter={[10, 10]}>
      <Col>
        <Avatar src={data?.profileImg ? `data:image/jpeg;base64, ${data?.profileImg}` : ''} icon={<UserOutlined />} />
      </Col>
      <Col flex='auto'>
        <Row>
          <Col >{data?.ptName}</Col>
        </Row>
        <Row>
          <Col span={12}>HN : {data?.hn}</Col>
          {
            data?.visitTypeLabel?.toLocaleLowerCase() === 'opd' && <Col span={12}>VN : {data?.vn}</Col>
          }
          {
            data?.visitTypeLabel?.toLocaleLowerCase() === 'ipd' && <Col span={12}>AN : {data?.an || data?.vn}</Col>
          }
        </Row>
        <Row>
          <Col span={12}>เพศ : {data?.ptGenderLabel}</Col>
          <Col span={12}>อายุ : {data?.ptAgeYear} ปี {data?.ptAgeMonths ? parseFloat(data?.ptAgeMonths) % 12 : 0} เดือน</Col>
          {
            fullInfo && data?.visitTypeLabel?.toLocaleLowerCase() === 'ipd' && <Col span={12}>เลขเตียง : {data?.bedNo ? data?.bedNo : '-'}</Col>
          }
        </Row>
        {
          fullInfo && <Row>
            {
               data?.visitTypeLabel?.toLocaleLowerCase() === 'opd' && <Col span={12}>วันที่ได้รับบริการ: {dayjs(data?.visitAt).format('DD/MM/BBBB HH:mm')}</Col>
            }
            {
              data?.visitTypeLabel?.toLocaleLowerCase() === 'ipd' && <Col span={12}>วันที่ได้รับบริการ: {dayjs(data?.admitAt).format('DD/MM/BBBB HH:mm')}</Col>
            }
            <Col span={12}>รับการรักษาโดย: {data?.doctor}</Col>
            <Col span={12}>Dx. : {data?.dx}</Col>
          </Row>
        }
      </Col>
    </Row>
  </Card>
}