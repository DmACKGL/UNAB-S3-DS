import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const pacientes = await prisma.paciente.findMany();
    res.status(200).json(pacientes);
}
  