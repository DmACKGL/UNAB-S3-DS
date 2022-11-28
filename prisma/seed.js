const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const medicamentos = require('../boilerplate/medicamentos.json')
const pacientes = require('../boilerplate/pacientes.json')
const recetas = require('../boilerplate/recetas.json')

async function seedMedicamentos() {
    for (let medicamento of medicamentos) {
        await prisma.medicamento.create({
            data: medicamento
        })
    }
}

async function seedPacientes() {
    for (let paciente of pacientes) {
        await prisma.paciente.create({
            data: paciente
        })
    }
}

async function seedRecetas() {
    for (let receta of recetas) {
        const medicamento = await prisma.medicamento.findUnique({
            where: {
                cod_medicamento: receta.cod_medicamento
            }
        })
        const paciente = await prisma.paciente.findUnique({
            where: {
                rut: receta.rut_paciente
            }
        })

        let fecha = new Date(receta.fecha_receta)
        delete receta.cod_medicamento
        delete receta.rut_paciente
        delete receta.fecha_receta
        
        await prisma.receta.create({
            data: {
                medicamento: {
                    connect: {
                        cod_medicamento: medicamento.cod_medicamento
                    }
                },
                paciente: {
                    connect: {
                        rut: paciente.rut
                    }
                },
                fecha_receta: fecha,
                ...receta
            }
        })
    }
}

async function clearDatabase() {
    await prisma.medicamento.deleteMany()
    await prisma.paciente.deleteMany()
    await prisma.receta.deleteMany()
    console.log('Cleared database')
}

async function main() {
    console.log('Clearing database')
    await clearDatabase()
    console.log('Seeding database')
    await seedMedicamentos()
    await seedPacientes()
    await seedRecetas()   
    console.log('Seeded database')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
