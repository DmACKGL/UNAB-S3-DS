import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    const medicamento = await prisma.medicamento.findUnique({
        where: {
            cod_medicamento: parseInt(id)
        }
    });
    
    res.status(200).json(medicamento);
}
  