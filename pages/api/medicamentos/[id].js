import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    const jsonDirectory = path.join(process.cwd(), 'boilerplate');
    const fileContents = await fs.readFile(jsonDirectory + '/medicamentos.json', 'utf8');
    const medicamentos = JSON.parse(fileContents);
    const medicamento = medicamentos.find(medicamento => medicamento.cod_medicamento == id);
    res.status(200).json(medicamento);
}
  