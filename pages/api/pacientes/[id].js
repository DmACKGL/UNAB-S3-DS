import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

BigInt.prototype.toJSON = function() {       
    return this.toString()
}

export default async function handler(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    const paciente = await prisma.paciente.findUnique({
        where: {
            rut: BigInt(parseInt(id))
        }
    });

    res.status(200).json(paciente);
}
  