import express, { Request, Response } from 'express'; 
import knex from '../database/connection';


class PointsController {
    async index (request: Request, response: Response){
        const {city, uf, items} = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.1.105:3333/uploads/${point.image}`,
            };
        });
        
        return response.json(serializedPoints);
    }

    async show (request: Request, response: Response){
        const { id } = request.params; //Uso um desestruturação  o normal é: const id = request.params.id
        
        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({message: 'Point not found.'});
        }

        const  serializedPoint = {
            ...point,
                image_url: `http://localhost:3333/uploads/${point.image}`, // endereço web//`http://192.168.1.105:3333/uploads/${point.image}`, 
        };

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

        return response.json({ point: serializedPoint, items })
    }

    async create (request: Request, response: Response){
        const {    //Usa se o short sintax que quando o nome da variavel é igual a name(ex: name: name,) a gente usa só assim 'name,'
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body
    
        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        //Cria o ponto
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointsItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });
        
        //Feito por ajuda do grupo...
        try {
            await trx('point_items').insert(pointsItems)
      
            await trx.commit();
        } catch (error) {
            await trx.rollback();
      
            return response.status(400).json({ message: 'Falha na inserção na tabela point_items, verifique se os items informados são válidos' })
        }
    
        return response.json({
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;