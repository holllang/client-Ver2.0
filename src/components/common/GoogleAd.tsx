import { useEffect } from 'react';
declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  console.log(process.env.NODE_ENV);
  useEffect(() => {
    if (process.env.NODE_ENV === 'production')
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Advertise is pushed');
      } catch (e) {
        console.error('AdvertiseError', e);
      }
  }, []);

  const GOOGLE_ADD_OBJECT = {
    google_ad_client: 'ca-pub-1919598055512436',
    enable_page_level_ads: true,
  };

  useEffect(() => {
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push(GOOGLE_ADD_OBJECT);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production')
    return (
      <div
        style={{
          background: '#e9e9e9',
          color: 'black',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '16px',
          display: 'inline-block',
          width: '320px',
          height: '50px',
          marginTop: '10px',
        }}
      >
        광고 표시 영역
      </div>
    );

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          width: '320px',
          height: '50px',
          marginTop: '10px',
        }}
        data-ad-client="ca-pub-1919598055512436"
        data-ad-slot="1678485541"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
};

export default GoogleAd;
