// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createMedicine = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllMedicine(req, res);
    const id = 0;
    const { Name } = req.body;    
    await pool.query('INSERT INTO MedicineMaster(id, name) VALUES ($1, $2)', [id, Name ]);
    return res.status(201).json({
      message: 'Created'
    });
};

export const getAllMedicine = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM MedicineMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getMedicineById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM MedicineMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateMedicine = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const { name } = req.body;  
    try {
      await pool.query('UPDATE MedicineMaster SET Designation=$1 WHERE id = $2', [name, id]);      
      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteMedicine = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM MedicineMaster WHERE id = $1', [id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

