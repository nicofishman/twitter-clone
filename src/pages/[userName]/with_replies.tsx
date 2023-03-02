import React from 'react';
import { useRouter } from 'next/router';

import ProfilePageLayout from '@/components/profile/ProfilePageLayout';
import { api } from '@/utils/api';
import Loader from '@/components/ui/Loader';
import Tuit from '@/components/index/Tuit';

interface WithRepliesProps {}

const WithReplies = ({}: WithRepliesProps) => {
    const router = useRouter();
    const { data: tuits, isLoading } =
        api.tuit.getWithRepliesByUsername.useQuery({
            username: (router.query.userName ?? '') as string,
        });

    const tuitsShowed = new Set<string>();

    return (
        <ProfilePageLayout>
            {isLoading ? (
                <Loader />
            ) : tuits?.length === 0 ? (
                <p>no tuits</p>
            ) : (
                tuits &&
                tuits.map((tuit) => {
                    let showReplyTo = false;

                    if (tuitsShowed.has(tuit.id)) {
                        return null;
                    }
                    tuitsShowed.add(tuit.id);
                    if (tuit.replyToId && !tuit.replyTo?.replyToId) {
                        tuitsShowed.add(tuit.replyToId);
                        showReplyTo = true;
                    }

                    return (
                        <Tuit
                            key={tuit.id}
                            isFeed
                            showReplyTo={showReplyTo}
                            tuit={tuit}
                        />
                    );
                })
            )}
        </ProfilePageLayout>
    );
};

export default WithReplies;
