import { type NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import Layout from '@/components/layout/Layout';
import Avatar from '@/components/ui/Avatar';
import { useUser } from '@/utils/globalState';
import Icon from '@/components/ui/Icon';
import BottomSidebar from '@/components/layout/BottomSidebar';
import { api } from '@/utils/api';
import WriteTuitBox from '@/components/index/WriteTuitBox';
import Tuit from '@/components/index/Tuit';
import { slideNavbarOpenStore } from '@/utils/states/slideNavbarOpen';
import Loader from '@/components/ui/Loader';

const Home: NextPage = () => {
    const user = useUser();
    const { data: session } = useSession();
    const { data: tuitsData, isLoading } = api.tuit.get.useQuery();

    return (
        <>
            <Head>
                <title>Twitter index</title>
                <meta content="Generated by create-t3-app" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <Layout>
                <div className="sticky top-0 flex min-h-[56px] items-center justify-center bg-black/60 backdrop-blur-md xxs:hidden">
                    <button
                        className="absolute top-3 left-4"
                        onClick={() => slideNavbarOpenStore.set('isOpen', true)}
                    >
                        <Avatar user={user} width={32} />
                    </button>
                    <Icon className="text-twitterBlue" name="twitter" />
                </div>
                <div className="flex h-14 w-full items-center border border-x border-t-0 border-borderGray px-4 py-2">
                    <p className="font-extrabold">Home</p>
                </div>
                {session && (
                    <div className="hidden xxs:block">
                        <WriteTuitBox />
                    </div>
                )}
                {isLoading && (
                    <div className="my-5 flex w-full justify-center">
                        <Loader />
                    </div>
                )}
                {tuitsData &&
                    tuitsData.map((tuit) => <Tuit key={tuit.id} {...tuit} />)}
                <BottomSidebar />
            </Layout>
        </>
    );
};

export default Home;
