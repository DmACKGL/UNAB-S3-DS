import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {

    if (req.method == "POST") {
        const { descripcion, formato, stock } = req.body;
        if (!descripcion || !formato || !stock) res.status(400).json({ message: 'Bad request' });
        const medicamento = await prisma.medicamento.create({
            data: {
                descripcion: descripcion,
                formato: formato,
                stock: stock
            }
        });
        
        res.status(200).json(medicamento);
        return;
    }
    
    const medicamentos = await prisma.medicamento.findMany();
    res.status(200).json(medicamentos);
}
  