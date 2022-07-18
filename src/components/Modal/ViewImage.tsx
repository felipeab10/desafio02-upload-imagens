import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
  Box,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgColor="gray.800"
        borderRadius="10px"
        w="100vw"
        maxW="900px"
      >
        <Image
          height="100vh"
          maxH="600px"
          w="100%"
          objectFit="fill"
          src={imgUrl}
        />
        <ModalFooter bgColor="gray.800" p="20px" w="100vw" maxW="900px">
          <Flex flex="1">
            <Link href={imgUrl} target="_blank" fontSize="small">
              Abrir original
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
