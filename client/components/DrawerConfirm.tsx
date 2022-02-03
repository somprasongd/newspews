import { Drawer, Row, Col, Button } from 'antd'

interface DrawerComfirmProps {
  visible: any
  onOk: any
  onCancel: any
  children: JSX.Element
  closeText?: any
  okText?: any
  hasForm?: boolean
  otherBtn?: any
}

export const DrawerComfirm = ({ visible, onOk, onCancel, children, closeText, okText, hasForm, otherBtn }: DrawerComfirmProps) => {
  return <Drawer className='modal-confirm' visible={visible} closable={false} placement='bottom' title={undefined}>
    <Row gutter={[10, 10]}>
      <Col span={24}>
        {children}
      </Col>
      {
        !hasForm && <>
          <Col span={otherBtn && otherBtn?.length === 1 ? '12' : '24'}>
            <Button className='' shape='round' block type='primary' htmlType='button' onClick={onOk}>{okText ? okText : 'ตกลง'}</Button>
          </Col>
          {
            otherBtn && otherBtn?.map((b: any, i: any) => <Col span={12} key={i}>{b}</Col>)
          }
          <Col span={24}>
            <Button className='' shape='round' block htmlType='button' onClick={onCancel}>{closeText ? closeText : 'ยกเลิก'}</Button>
          </Col>
        </>
      }
    </Row>
  </Drawer>
}