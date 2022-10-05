import Head from "next/head";
import { PrismaClient, Room } from "@prisma/client";

export async function getStaticPaths() {
    const prisma = new PrismaClient();
    const rooms = await prisma.room.findMany();
    return {
        paths: rooms.map(r => {return {params: {id: r.id}}}),
        fallback: false,
    }
}

export async function getStaticProps(args: {params: {id: string}}) {
    const {params} = args;
    
    const prisma = new PrismaClient();
    const room = await prisma.room.findUnique({
        where: {
            id: params.id,
        },
    });
    return {
        props: {room},
    }
}

export default function Lobby(props: {room: Room}) {
    const {room} = props;

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-sky-500 to-green-500 flex justify-center items-center">
            <Head>
                <title>{"Kwordle | Room " + room.id}</title>
                <meta name="description" content="Online 1v1 Wordle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-white rounded-lg p-6">
                <h1 className="text-5xl font-bold text-center mb-6">
                    kwordle
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <h3 className="text-2xl font-bold uppercase text-center">
                        {room.id}
                    </h3>
                    <button className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 duration-150 text-white px-4 py-2 rounded-lg w-min whitespace-nowrap text-xl">
                        Copy link
                    </button>
                </div>
            </main>
        </div>
    )
}
