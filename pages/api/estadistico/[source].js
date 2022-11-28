import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { source } = req.query;

    if (source != "pacientes" && source != "medicamentos" && source != "recetas") {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    // get most used medicamento on recetas
    if (source == "medicamentos") {
        const medicamentos = await prisma.receta.aggregate({
            _count: {
                cod_medicamento: true
            },
        });

        res.status(200).json(medicamentos);
        return;
    }
}
  