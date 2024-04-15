// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createStorageCategoryType = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllStorageCategoryTypes(req, res);
    const id = 0;
    const { Category_id, Storage_Category_Type } = req.body;    
    await pool.query('INSERT INTO StorageCategoryTypeMaster(id, Category_id, Storage_Category_Type) VALUES ($1, $2, $3)', [id, Category_id, Storage_Category_Type ]);
    return res.status(201).json({
      message: 'Created',
      StorageCategoryType: {
        id,
        Storage_Category_Type
      }
    });
};

export const getAllStorageCategoryTypes = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM StorageCategoryTypeMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getStorageCategoryTypeById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM StorageCategoryTypeMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateStorageCategoryType = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const {Category_id, Storage_Category_Type} = req.body;  
    try {
      await pool.query('UPDATE StorageCategoryTypeMaster SET Category_id=$1, Storage_Category_Type=$2 WHERE id = $3', [Category_id, Storage_Category_Type, id]);      
      return res.json({
        message: 'Updated',
        StorageCategoryType: {
          id,
          Storage_Category_Type
        },
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteStorageCategoryType = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM StorageCategoryTypeMaster WHERE id = $1', [id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

