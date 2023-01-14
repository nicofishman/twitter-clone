import { type NextPage } from "next";
import Head from "next/head";

import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
    // const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta content="Generated by create-t3-app" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <Layout>
                <p className="font-extrabold">nashe</p>
            </Layout>
        </>
    );
};

export default Home;