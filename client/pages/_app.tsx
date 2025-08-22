import type { AppProps } from 'next/app';

import { ConfigProvider } from 'antd';
import th from 'antd/lib/locale/th_TH';
import '../styles/style.css';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { MetaHeader } from '../components/MetaHeader';
import Script from 'next/script';

dayjs.locale('th');
dayjs.extend(updateLocale);
dayjs.updateLocale('th', {
  relativeTime: {
    future: 'อีก %s',
    past: '%sที่แล้ว',
    s: 'ไม่กี่วินาที',
    m: 'หนึ่งนาที',
    mm: '%d นาที',
    h: 'หนึ่งชั่วโมง',
    hh: '%d ชั่วโมง',
    d: 'หนึ่งวัน',
    dd: '%d วัน',
    M: 'หนึ่งเดือน',
    MM: '%d เดือน',
    y: 'หนึ่งปี',
    yy: '%d ปี',
  },
});
dayjs.extend(buddhistEra);
dayjs.extend(timezone);
dayjs.extend(utc);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider 
      locale={th}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
        components: {
          Button: {
            borderRadius: 8,
          },
          Card: {
            borderRadiusLG: 12,
          },
        },
      }}
    >
      {typeof window === 'undefined' ? null : (
        <MetaHeader title="Early Warning Sign Calculator [NEWS/PEWS]" />
      )}
      <Script
        src="wasm_exec.js"
        onLoad={() => {
          console.log(`script loaded correctly, window.GO has been populated`);
          const go = new Go();
          WebAssembly.instantiateStreaming(
            fetch('newspews.wasm'),
            go.importObject
          ).then((result) => {
            go.run(result.instance);
          });
        }}
      />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
