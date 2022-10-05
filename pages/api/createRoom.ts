import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: any, res: any) => {
    const data = req.body;
    try {
        const room = await prisma.room.create({
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
            message: "Successfully created room",
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error occured while creating room",
        });
    }
};
