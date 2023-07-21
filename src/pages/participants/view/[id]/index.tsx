import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';

import { getParticipantById } from 'apiSdk/participants';
import { ParticipantInterface } from 'interfaces/participant';

function ParticipantViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ParticipantInterface>(
    () => (id ? `/participants/${id}` : null),
    () =>
      getParticipantById(id, {
        relations: ['user', 'quiz'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Participants',
              link: '/participants',
            },
            {
              label: 'Participant Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper wrapperProps={{ border: 'none', gap: 3, p: 0 }}>
              <Text
                sx={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  color: 'base.content',
                }}
              >
                Participant Details
              </Text>
              <List
                w="100%"
                css={{
                  '> li:not(:last-child)': {
                    borderBottom: '1px solid var(--chakra-colors-base-300)',
                  },
                }}
              >
                <FormListItem
                  label="Joined At"
                  text={format(parseISO(data?.joined_at as unknown as string), 'dd-MM-yyyy')}
                />

                <FormListItem
                  label="Left At"
                  text={format(parseISO(data?.left_at as unknown as string), 'dd-MM-yyyy')}
                />

                <FormListItem
                  label="Created At"
                  text={format(parseISO(data?.created_at as unknown as string), 'dd-MM-yyyy')}
                />

                <FormListItem
                  label="Updated At"
                  text={format(parseISO(data?.updated_at as unknown as string), 'dd-MM-yyyy')}
                />

                {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="User"
                    text={
                      <Link as={NextLink} href={`/users/view/${data?.user?.id}`}>
                        {data?.user?.email}
                      </Link>
                    }
                  />
                )}
                {hasAccess('quiz', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Quiz"
                    text={
                      <Link as={NextLink} href={`/quizzes/view/${data?.quiz?.id}`}>
                        {data?.quiz?.title}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'participant',
    operation: AccessOperationEnum.READ,
  }),
)(ParticipantViewPage);
