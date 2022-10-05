import Head from "next/head";
import { PrismaClient, Room, User } from "@prisma/client";

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
    const users = await prisma.user.findMany({
        where: {
            roomId: room?.id,
        }
    });
    return {
        props: {room, users},
    }
}

export default function Lobby(props: {room: Room, users: User[]}) {
    const {room, users} = props;

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-sky-500 to-green-500 flex justify-center items-center">
            <Head>
                <title>kwordle</title>
                <meta name="description" content="Online 1v1 Wordle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-white rounded-lg p-6">
                <h1 className="text-5xl font-bold text-center mb-6">
                    kwordle
                </h1>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl mb-1">
                        Room code
                    </h3>
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-xl font-bold text-center">
                            {room.id}
                        </h3>
                        <button className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 duration-150 text-white px-3 py-1 rounded-lg w-min whitespace-nowrap text-lg">
                            Copy
                        </button>
                    </div>
                    <div className="bg-gray-200 grid grid-flow-col grid-3-shrink-center text-center gap-4 text-2xl w-full px-4 py-2 rounded-lg">
                        <p className="font-bold">
                            {users[0]?.name}
                        </p>
                        vs.
                        <p className="font-bold">
                            {users[1]?.name}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
