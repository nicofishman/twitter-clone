import { type NextPage } from 'next';
import { useRouter } from 'next/router';

import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { api } from '@/utils/api';
import Loader from '@/components/ui/Loader';
import Tuit from '@/components/index/Tuit';

const Profile: NextPage = () => {
    const router = useRouter();
    const { data: tuits, isLoading } = api.tuit.getFeedByUsername.useQuery({
        username: (router.query.userName ?? '') as string,
    });

    return (
        <ProfilePageLayout>
            {isLoading ? (
                <Loader />
            ) : tuits?.length === 0 ? (
                <p>no tuits</p>
            ) : (
                tuits &&
                tuits.map((tuit) => <Tuit key={tuit.id} isFeed tuit={tuit} />)
            )}
        </ProfilePageLayout>
    );
};

export default Profile;
