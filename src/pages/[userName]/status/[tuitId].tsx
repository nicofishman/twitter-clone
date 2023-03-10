import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from 'next';
import { useRouter } from 'next/router';

import Icon from '@/components/ui/Icon';
import Layout from '@/components/layout/Layout';
import TuitInPage from '@/components/singleTuit/TuitInPage';
import { api } from '@/utils/api';
import { mySSG } from '@/utils/ssg';
import { TuitButton } from '@/components/index/Tuit';
import CommentsList from '@/components/singleTuit/CommentsList';

interface TuitPageProps
    extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const TuitPage: NextPage<TuitPageProps> = ({ tuitId }) => {
    const router = useRouter();
    const { data: tuitData } = api.tuit.getById.useQuery(
        { id: tuitId ?? null },
        {
            refetchOnWindowFocus: false,
        },
    );

    const comments = api.tuit.getComments.useQuery(
        { tuitId: tuitId ?? null },
        {
            refetchOnWindowFocus: false,
        },
    );

    return (
        <Layout>
            <header className='flex w-full gap-x-6 border-b border-borderGray px-2 py-3'>
                <TuitButton onClick={() => router.back()}>
                    <Icon className='w-5' name='leftArrow' />
                </TuitButton>
                <h1 className='text-2xl font-bold'>Tweet</h1>
            </header>
            {tuitData && (
                <>
                    <TuitInPage {...tuitData} />
                    <CommentsList comments={comments.data} />
                </>
            )}
        </Layout>
    );
};

export default TuitPage;

export const getServerSideProps: GetServerSideProps<{
    tuitId: string;
}> = async (context: GetServerSidePropsContext) => {
    const ssg = await mySSG(context);

    await ssg.tuit.getById.prefetch({
        id: context.params?.tuitId as string,
    });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            tuitId: context.params?.tuitId as string,
        },
    };
};
