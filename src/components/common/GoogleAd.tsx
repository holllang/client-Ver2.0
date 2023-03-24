import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = () => {

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(`Ad push error: ${err}`);
        }
    }, []);

  return (
    <div className="googleAd-container" style={{ marginTop: 10 }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: 320, height: 50, alignContent: "center" }}
        data-ad-client="ca-pub-1919598055512436"
        data-ad-slot="1678485541"
      ></ins>
    </div>
  );
};

export default GoogleAd;
