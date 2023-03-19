import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Hollang</title>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="apple-touch-icon" href="/static/favicon.ico" />

          <meta name="theme-color" content="#000000" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"
          />
          <meta
            name="description"
            content="취미 알고리즘으로 여러분의 취미를 추천받아봐요."
          />
          <meta
            name="keywords"
            content="취미,메타콘텐츠,hobby,meta-contents,mbti,엠비티아이"
          />
          <meta name="og:description" content="홀랑에 홀랑 빠져봐!" />
          <meta property="og:title" content="홀랑:Hollang:" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://user-images.githubusercontent.com/62178788/223585054-6d1c0b3a-1f2d-4f0b-b238-1c5b3c6a1292.png"
          />
          <meta name="twitter:title" content="Hollang" />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/62178788/223585054-6d1c0b3a-1f2d-4f0b-b238-1c5b3c6a1292.png"
          />
          <Script>
            strategy="afterInteractive" src=
            {`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_APPKEY}`}
          </Script>
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_APPKEY}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <Script
            defer
            src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
          ></Script>
          <meta property="og:article:author" content="홀랑에 홀랑 빠져봐!" />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            crossOrigin="anonymous"
          ></Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
