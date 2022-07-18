import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [imgUrl, setImageUrl] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  const viewImage = (image: string): void => {
    setImageUrl(image);
    onOpen();
  };
  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} spacing="40px">
        {cards?.map(card => (
          <Card viewImage={viewImage} data={card} key={card.id} />
          // <GridItem key={card.id}>
          //   <Flex
          //     flexDirection="column"
          //     bgColor="pGray.800"
          //     borderRadius="0px 0px 6px 6px"
          //   >
          //     <Image
          //       height={190}
          //       objectFit="fill"
          //       src={card.url}
          //       borderRadius="6px 6px 0px 0px"
          //     />
          //     <Box px="8" py="8">
          //       <Text fontSize="2xl" fontWeight="700">
          //         {card.title}
          //       </Text>
          //       <Text fontSize="lg" fontWeight="400">
          //         {card.description}
          //       </Text>
          //     </Box>
          //   </Flex>
          // </GridItem>
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />
    </>
  );
}
