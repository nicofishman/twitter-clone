import React, { FC } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import Icon from '@/components/common/Icon';
import Tuit from '@/components/index/Tuit';
import { api } from '@/utils/api';

interface TuitPageProps {

}

const TuitPage: FC<TuitPageProps> = () => {
    const router = useRouter();
    const tuitId = router.query.tuitId as string;

    const { data: tuitData } = api.tuit.getById.useQuery({
        id: tuitId,
    });
    

    return (
        <Layout>
            <header className='w-full flex gap-x-6 p-4 border-b border-borderGray'>
                <Icon className='w-5' name='leftArrow' />
                <h1 className='text-2xl font-bold'>Tweet</h1>
            </header>
            {
                tuitData && (
                    <Tuit isInView {...tuitData} />
                )
            }
        </Layout>
    );
};

export default TuitPage;
