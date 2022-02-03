import { Layout, PageHeader, Button } from 'antd'
import { useRouter } from 'next/router'
import { UserSwitchOutlined, HomeOutlined, QuestionOutlined } from '@ant-design/icons'

const { Content } = Layout

interface PageLayoutProps {
  children: JSX.Element
  title: string | undefined
  onBack: any
  extra?: any[]
  admin?: boolean
  user?: any
  setUser?: any
  subTitle?: any
  servicePoint?: any
  hideHeader?: boolean
  setOpenDrawer?: any,
  openInfo?: any
}

export const PageLayout = ({ children, title, onBack, subTitle, admin, user,
  setUser, servicePoint, hideHeader, setOpenDrawer, openInfo }: PageLayoutProps) => {
  const router = useRouter()

  const renderIconHeader = (user: any, servicePoint: any, openInfo: any) => {
    return <Button className='button-icon-help' shape="circle" onClick={openInfo}>
      <QuestionOutlined />
    </Button>
  }

  return <>
    <Content style={{ paddingBottom: '20px' }}>
      {!admin && !hideHeader && title &&
        <PageHeader
          className='page-header'
          title={title}
          subTitle={subTitle}
          extra={<>{renderIconHeader(user, servicePoint, openInfo)}</>}
        />
      }
      {children}
    </Content>
    { }
    {
      admin && onBack && <div className='footer-control'>
        <Button shape='round' type='primary' block onClick={() => onBack()}>ย้อนกลับ</Button>
      </div>
    }
  </>
}