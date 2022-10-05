import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: any, res: any) => {
    const data = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name: data.username,
            },
        });
        res.status(200).json({
            success: true,
            userId: user.id,
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
