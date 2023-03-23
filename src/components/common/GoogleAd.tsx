import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = () => {

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', marginTop: 10, width: 320, height: 50 }}
        data-ad-client="ca-pub-1919598055512436"
        data-ad-slot="1678485541"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  );
};

export default GoogleAd;
