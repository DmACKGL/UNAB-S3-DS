import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

BigInt.prototype.toJSON = function() {       
    return this.toString()
}

export default async function handler(req, res) {

    if (req.method == "POST") {
        const { rut_paciente, cod_medicamento, cantidad, fecha_receta } = req.body;
        if (!rut_paciente || !cod_medicamento || !cantidad || !fecha_receta) res.status(400).json({ message: 'Bad request' });
        const receta = await prisma.receta.create({
            data: {
                paciente: {
                    connect: {
                        rut: BigInt(parseInt(rut_paciente))
                    }
                },
                medicamento: {
                    connect: {
                        cod_medicamento: parseInt(cod_medicamento)
                    }
                },
                cantidad: parseInt(cantidad),
                fecha_receta: new Date(fecha_receta)
            }
        });
        
        res.status(200).json(receta);
        return;
    }

    const recetas = await prisma.receta.findMany({
        include: {
            paciente: true,
            medicamento: true
        }
    });

    res.status(200).json(recetas);
}
  