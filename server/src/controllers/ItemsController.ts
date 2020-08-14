import express, { Request, Response } from 'express'; 
import knex from '../database/connection'

class ItemsController {
    async index(request: Request, response: Response) {
        // Sempre que for usar uma query pro banco de dados deve usar um 'await' 
        //  para ela aguarda a query termina para então ter os resultados.
        const items = await knex('items').select('*');
    
        const  serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`, // endereço web//`http://192.168.1.105:3333/uploads/${item.image}`, // 
            };
        }); 
        return response.json(serializedItems);  
    }
}

export default ItemsController;