import { Button, Box, Stack } from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

interface GetImageResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  async function fetchData({ pageParam = null }): Promise<GetImageResponse> {
    const { data } = await api.get(`/api/images`, {
      params: { after: pageParam },
    });
    return data;
  }

  // return request;

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchData, {
    getNextPageParam: lastPage => lastPage?.after || null,
  });

  const formattedData = useMemo(() => {
    const format = data?.pages?.flatMap(i => {
      return i.data.flat();
    });

    return format;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <Stack spacing={8}>
          <CardList cards={formattedData} />
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()} width={134} type="button">
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
}
