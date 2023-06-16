import { CONFIG } from '@config';

export const shareKakao = (uri: string) => {
  const SHARE_URI = `${CONFIG.CLINT}/${uri}&isshared=true`;
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(CONFIG.KAKAO_APP_KEY);
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '홀랑에 홀랑 빠져봐!',
        description: '인공지능이 당신의 유형을 분석해 취미를 추천해줄거에요!',
        imageUrl:
          'https://user-images.githubusercontent.com/62178788/221452504-a30f4f0c-c105-4ce9-a1cd-57affa48ea5e.png',
        link: {
          mobileWebUrl: SHARE_URI,
          webUrl: SHARE_URI,
        },
      },
      buttons: [
        {
          title: '홀랑에 홀랑 빠져봐!',
          link: {
            mobileWebUrl: SHARE_URI,
            webUrl: SHARE_URI,
          },
        },
      ],
    });
  }
};
