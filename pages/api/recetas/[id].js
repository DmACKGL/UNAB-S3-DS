import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    const { id } = req.query;

    if (isNaN(id)) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    const jsonDirectory = path.join(process.cwd(), 'boilerplate');
    const fileContents = await fs.readFile(jsonDirectory + '/recetas.json', 'utf8');
    const recetas = JSON.parse(fileContents);
    const receta = recetas.find(receta => receta.cod_receta == id);
    res.status(200).json(receta);
}
  