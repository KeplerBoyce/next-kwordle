import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import InputGroup from '../components/InputGroup'
import axios from 'axios';

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState("");

    const join = async() => {
        if (!username) {
            return;
        }
        const user = await axios.post("/api/createUser", {
            username,
        });
    }

    const create = async() => {
        if (!username) {
            return;
        }
        const user = await axios.post("/api/createUser", {
            username,
        });
        if (!user.data.success) {
            return;
        }
        const room = await axios.post("/api/createRoom", {
            userid: user.data.userid,
        });
        if (!room.data.success) {
            return;
        }
        router.push({
            pathname: "/lobby/" + room.data.id,
        });
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-sky-500 to-green-500 flex justify-center items-center">
            <Head>
                <title>Kwordle</title>
                <meta name="description" content="Online 1v1 Wordle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-white rounded-lg p-6">
                <h1 className="text-5xl font-bold text-center mb-6">
                    kwordle
                </h1>
                <div className="flex flex-col gap-1">
                    <InputGroup className="mb-2" name="username" value={username} setValue={setUsername} />
                    <button className={"w-full text-lg text-white rounded-lg p-2 duration-150 "
                        + (username ? "bg-green-500 hover:bg-green-600 active:bg-green-700" : "bg-gray-400")}>
                        Join room
                    </button>
                    <button
                        className={"w-full text-lg text-white rounded-lg p-2 duration-150 "
                        + (username ? "bg-sky-500 hover:bg-sky-600 active:bg-sky-700" : "bg-gray-400")}
                        onClick={() => create()}
                    >
                        Create private room
                    </button>
                </div>
            </main>
        </div>
    )
}
