import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    
    if (req.method == "POST") {
        const { rut, nombre, fono, edad, diagnostico } = req.body;
        if (!rut || !nombre || !fono || !edad || !diagnostico) res.status(400).json({ message: 'Bad request' });
        const paciente = await prisma.paciente.create({
            data: {
                rut: rut,
                nombre: nombre,
                fono: fono,
                edad: edad,
                diagnostico: diagnostico
            }
        });

        res.status(200).json(paciente);
        return;
    }
        

    const pacientes = await prisma.paciente.findMany();
    res.status(200).json(pacientes);
}
  