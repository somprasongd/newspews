import type { AppProps } from 'next/app'

import { ConfigProvider } from 'antd'
import th from 'antd/lib/locale/th_TH'
import locale from 'antd/lib/date-picker/locale/th_TH'
import 'antd/dist/antd.css'

import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import 'dayjs/locale/th'

dayjs.locale('th')
dayjs.extend(updateLocale)
dayjs.updateLocale('th', {
  relativeTime: {
    future: "อีก %s",
    past: "%sที่แล้ว",
    s: 'ไม่กี่วินาที',
    m: "หนึ่งนาที",
    mm: "%d นาที",
    h: "หนึ่งชั่วโมง",
    hh: "%d ชั่วโมง",
    d: "หนึ่งวัน",
    dd: "%d วัน",
    M: "หนึ่งเดือน",
    MM: "%d เดือน",
    y: "หนึ่งปี",
    yy: "%d ปี"
  }
})
const yearFormat = 'BBBB'
locale.lang.yearFormat = yearFormat;
dayjs.extend(buddhistEra)
dayjs.extend(timezone)
dayjs.extend(utc)

function MyApp({ Component, pageProps }: AppProps) {
  return <ConfigProvider locale={th}>
    <Component {...pageProps} />
  </ConfigProvider>
}

export default MyApp
