// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createStorageCategoryTypeValue = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllStorageCategoryTypeValues(req, res);
    const id = 0;
    const { Category_id, StorageCategoryType_id, StorageCategoryTypeValue } = req.body;    
    await pool.query('INSERT INTO StorageCategoryTypeValueMaster(id, Category_id, StorageCategoryType_id, StorageCategoryTypeValue) VALUES ($1, $2, $3, $4)', [id, Category_id, StorageCategoryType_id, StorageCategoryTypeValue ]);
    return res.status(201).json({
      message: 'Created',
      CategoryTypeValue: {
        id,
        StorageCategoryTypeValue
      }
    });
};

export const getAllStorageCategoryTypeValues = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM StorageCategoryTypeValueMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getStorageCategoryTypeValueById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM StorageCategoryTypeValueMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateStorageCategoryTypeValue = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const {Category_id, StorageCategoryType_id, StorageCategoryTypeValue} = req.body;  
    try {
      await pool.query('UPDATE StorageCategoryTypeValueMaster SET Category_id=$1, StorageCategoryType_id=$2, StorageCategoryTypeValue=$3 WHERE id = $4', [Category_id, StorageCategoryType_id, StorageCategoryTypeValue, id]);      
      return res.json({
        message: 'Updated',
        CategoryTypeValue: {
          id,
          StorageCategoryTypeValue
        },
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteStorageCategoryTypeValue = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM StorageCategoryTypeValueMaster WHERE id = $1', [id]);
      return res.status(200).json(`City deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

