import { NextPage } from 'next';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import Container from '@components/Container';
import Versus from '@components/chart/Versus';
import BarGraph from '@components/chart/BarGraph';
import colors from '@constants/colors';
import useUser from '@hooks/useUser';
import { useQuery } from 'react-query';
import { getStat, Stat } from '@apis/stat';
import { ToJavaLocaleDate } from '@utils/date';
import Loading from '@components/Loading';
import { useEffect, useState } from 'react';
import Text from '@components/Text';
import { css } from '@emotion/react';

const today = new Date();
today.setDate(1);
const date = ToJavaLocaleDate(today);
const Frequency: NextPage = () => {
  const router = useRouter();
  const user = useUser();
  const myStat = useQuery<Stat>(['stat', user.data?.id, date], () => getStat(user.data!.id, date), {
    enabled: user.data !== undefined,
  });
  const coupleStat = useQuery<Stat>(
    ['stat', user.data?.coupleInfo?.id, date],
    () => getStat(user.data!.coupleInfo!.id, date),
    {
      enabled: user.data !== undefined,
    }
  );
  const [win, setWin] = useState(0);

  useEffect(() => {
    if (myStat.isFetched && coupleStat.isFetched) {
      const user = myStat.data?.diaryFreq ? myStat.data.diaryFreq : 0;
      const couple = coupleStat.data?.diaryFreq ? coupleStat.data.diaryFreq : 0;
      if (user > couple) setWin(1);
      else if (user < couple) setWin(2);
      else setWin(0);
    }
  }, [myStat, coupleStat]);

  return (
    <>
      <Header onClick={() => router.back()}>누가 더 다이어를 자주 썼을까요?</Header>
      {user.isFetched && myStat.isFetched && coupleStat.isFetched ? (
        <Container>
          <Versus user={user.data!} win={win} />
          <Text
            css={css`
              padding-top: 1rem;
              font-size: 2.5rem;
              color: ${colors.content200};
            `}>
            한달간 다이어리 작성 빈도 수
          </Text>
          <BarGraph url={user.data!.imageUrl} ratio={myStat.data!.diaryFreq} color={colors.red300} />
          <BarGraph url={user.data!.coupleInfo!.imageUrl} ratio={coupleStat.data!.diaryFreq} color={colors.blue300} />
        </Container>
      ) : (
        <Container>
          <Loading />
        </Container>
      )}
    </>
  );
};

export default Frequency;
