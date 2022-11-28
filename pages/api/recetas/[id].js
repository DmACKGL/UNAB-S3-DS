import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    const receta = await prisma.receta.findUnique({
        where: {
            cod_receta: parseInt(id)
        },
        include: {
            paciente: true,
            medicamento: true
        }
    });

    res.status(200).json(receta);
}
  