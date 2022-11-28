import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const recetas = await prisma.receta.findMany({
        include: {
            paciente: true,
            medicamento: true
        }
    });

    res.status(200).json(recetas);
}
  