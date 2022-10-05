import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: any, res: any) => {
    const data = req.body;
    try {
        const users = await prisma.user.findMany({
            where: {
                roomId: data.roomCode,
            },
        });
        if (users.length == 0) {
            res.json({
                success: false,
                message: "Invalid room code",
            });
        } else if (users.length > 1) {
            res.json({
                success: false,
                message: "Room is full",
            });
        }
        const room = await prisma.room.update({
            where: {
                id: data.roomCode,
            },
            data: {
                users: {
                    connect: {
                        id: data.userId
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            id: room.id,
            message: "Successfully added user",
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error occured while adding user",
        });
    }
};
