import { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
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
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;
