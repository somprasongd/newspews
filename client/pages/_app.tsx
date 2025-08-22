import type { AppProps } from 'next/app';

import { ConfigProvider } from 'antd';
import th from 'antd/lib/locale/th_TH';
import '../styles/style.css';

import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { MetaHeader } from '../components/MetaHeader';

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
  const router = useRouter();           // <-- get basePath
  const base = router.basePath || '';   // '' in dev, '/newspews' in prod
  
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
      {/* next/script respects basePath, but we'll be explicit */}
      <Script
        src={`${base}/wasm_exec.js`}
        strategy="afterInteractive"
        onLoad={async () => {
          // @ts-ignore - Go is attached by wasm_exec.js
          const go = new Go();
          const resp = await fetch(`${base}/newspews.wasm`);
          const { instance } = await WebAssembly.instantiateStreaming(resp, go.importObject);
          go.run(instance);
        }}
      />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
