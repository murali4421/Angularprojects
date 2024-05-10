// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllCategory(req, res);
    const id = 0;
    const { Category } = req.body;    
    const response :QueryResult = await pool.query('INSERT INTO CategoryMaster(id, name) VALUES ($1, $2)', [id, Category ]);
    return res.status(201).json({
      message: 'Created'
    });
};

export const getAllCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM CategoryMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getCategoryById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM CategoryMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const { Category } = req.body;  
    try {
      const response :QueryResult = await pool.query('UPDATE CategoryMaster SET Category=$1 WHERE id = $2', [Category, id]);      
      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      const response :QueryResult = await pool.query('DELETE FROM CategoryMaster WHERE id = $1', [id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

