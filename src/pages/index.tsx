import { type NextPage } from "next";
import Head from "next/head";

import Layout from "../components/layout/Layout";
import Avatar from "../components/common/Avatar";
import { useUser } from "../utils/globalState";
import Icon from "../components/common/Icon";
import BottomSidebar from "../components/layout/BottomSidebar";
import { api } from "../utils/api";
import WriteTuitBox from '../components/index/WriteTuitBox';
import Tuit from "../components/index/Tuit";

const Home: NextPage = () => {
    const user = useUser();
    const { data: tuitsData } = api.tuit.getAll.useQuery();

    return (
        <>
            <Head>
                <title>Twitter index</title>
                <meta content="Generated by create-t3-app" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <Layout>
                <div className="[@media(min-width:500px)]:hidden flex items-center justify-center min-h-[56px]">
                    <div className="absolute top-3 left-4">
                        <Avatar alt={`${user.username}'s profile picture`} src={user.image} width={32} />
                    </div>
                    <Icon className="text-twitterBlue" name="twitter" />
                </div>
                <div className="px-4 flex items-center w-full h-14 border border-t-0 border-x-0 border-b-borderGray">
                    <p className="font-extrabold">Home</p>
                </div>
                <div className="[@media(min-width:500px)]:block hidden">
                    <WriteTuitBox />
                </div>
                {
                    tuitsData && tuitsData.map((tuit) => (
                        <Tuit key={tuit.id} {...tuit}/>
                    ))
                }
                <BottomSidebar />
            </Layout>
        </>
    );
};

export default Home;