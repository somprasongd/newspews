import Head from 'next/head'

type Meta = {
  title: string
}

export const MetaHeader = ({ title }: Meta) => {
  return (
    <Head>
      <meta httpEquiv='content-type' content='text/html; charset=utf-8' />
      <link rel='icon' type='image/png' href='/shortcut/favicon.png' />
      <link rel='shortcut icon' href='/shortcut/shortcut-icon.png' />
      <link rel='apple-touch-icon' href='/shortcut/shortcut-icon.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/shortcut/shortcut-icon152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/shortcut/shortcut-icon180x180.png' />
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no' />
      <meta name='theme-color' content='#87CEFA' />
      <meta name='mobile-web-app-capable' content='yes' />
      <title>{title}</title>

      <meta name='title' content={title} />
      <meta name='description' content={title} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={window.location.origin} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={title} />
      <meta property='og:image' content={`${window.location.origin}/shortcut/shortcut-icon.png`} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={window.location.origin} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={title} />
      <meta property='twitter:image' content={`${window.location.origin}/shortcut/shortcut-icon.png`} />
    </Head>
  )
}
