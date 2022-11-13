import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    const jsonDirectory = path.join(process.cwd(), 'boilerplate');
    const fileContents = await fs.readFile(jsonDirectory + '/pacientes.json', 'utf8');
    const pacientes = JSON.parse(fileContents);
    const paciente = pacientes.find(paciente => paciente.rut == id);
    res.status(200).json(paciente);
}
  