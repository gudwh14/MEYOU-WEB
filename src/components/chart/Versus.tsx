import Image from '@components/Image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import colors from '@constants/colors';
import Text from '@components/Text';
import { useEffect, useState } from 'react';

function Versus() {
  const [width, setWidth] = useState(150);

  useEffect(() => {
    if (window.innerWidth <= 486) {
      setWidth(80);
    }

    const ResizeListener = () => {
      if (window.innerWidth <= 486) {
        setWidth(80);
      } else {
        setWidth(150);
      }
    };
    window.addEventListener('resize', ResizeListener);

    return () => window.removeEventListener('resize', ResizeListener);
  }, []);
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding-top: 4.5rem;
        padding-bottom: 1rem;
      `}>
      <ImgBox>
        <WinIcon src={'/icons/win.png'} alt={'승리 아이콘'} />
        <Image
          radius={'0rem'}
          width={width}
          height={width}
          src={'/icons/profile_mock_img_1.jpeg'}
          alt={'프로필 이미지'}
          css={css`
            border-style: solid;
            border-width: 3px;
            border-image: linear-gradient(45deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)
              1;
          `}
        />
        <Text>지현</Text>
      </ImgBox>
      <Image
        css={css`
          margin: 0 1rem;
        `}
        width={width / 2}
        height={width / 2}
        src={'/icons/versus.png'}
        alt={'프로필 이미지'}
      />
      <ImgBox>
        <Image
          css={css`
            border: 3px solid ${colors.black};
          `}
          radius={'0rem'}
          width={width}
          height={width}
          src={'/icons/profile_mock_img_2.jpeg'}
          alt={'프로필 이미지'}
        />
        <Text>쪼</Text>
      </ImgBox>
    </div>
  );
}

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const WinIcon = styled.img`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
`;

export default Versus;
