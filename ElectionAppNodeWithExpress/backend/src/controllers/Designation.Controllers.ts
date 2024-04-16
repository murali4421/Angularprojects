// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createDesignation = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllDesignation(req, res);
    const id = 0;
    const { Designation } = req.body;    
    await pool.query('INSERT INTO DesignationMaster(id, Designation) VALUES ($1, $2)', [id, Designation ]);
    return res.status(201).json({
      message: 'Created'
    });
};

export const getAllDesignation= async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM DesignationMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getDesignationById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM DesignationMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateDesignation = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const {Designation} = req.body;  
    try {
      await pool.query('UPDATE DesignationMaster SET Designation=$1 WHERE id = $2', [Designation, id]);      
      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteDesignation = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM DesignationMaster WHERE id = $1', [id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

