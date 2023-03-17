import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

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
      ></ins>
    </div>
  );
};

export default GoogleAd;
