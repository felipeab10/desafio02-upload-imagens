import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: files => files[0]?.size < 10000000 || 'Max 10MB',
        acceptedFormats: files =>
          ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: 'Título obrigatório',
      maxLenght: 'Máximo de 20 caracteres',
      minLenght: 'Mínimo de 2 caracteres',
    },
    description: {
      required: 'Descrição obrigatória',
      maxLenght: 'Máximo de 65 caracteres',
    },
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    values => {
      return api.post('/api/images', {
        title: values.title,
        description: values.description,
        url: imageUrl,
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(['images']);
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      const response = await mutation.mutateAsync(data);

      if (response?.data?.success) {
        toast({
          description: 'Imagem adicionada com sucesso!',
          status: 'success',
          isClosable: true,
        });
      }
    } catch {
      toast({
        description: 'Erro ao enviar dados',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          {...register('image', {
            required: formValidations.image.required,
            validate: formValidations.image.validate,
          })}
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
        />

        <TextInput
          {...register('title', {
            required: formValidations.title.required,
            maxLength: {
              value: 20,
              message: formValidations.title.maxLenght,
            },
            minLength: {
              value: 2,
              message: formValidations.title.minLenght,
            },
          })}
          type="text"
          error={errors.title}
          placeholder="Título da imagem..."
        />

        <TextInput
          {...register('description', {
            required: formValidations.description.required,
            maxLength: {
              value: 65,
              message: formValidations.description.maxLenght,
            },
          })}
          placeholder="Descrição da imagem..."
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
