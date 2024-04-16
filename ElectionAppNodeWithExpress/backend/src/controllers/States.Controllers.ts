// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createState = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllStates(req, res);
    const id = 0;
    const { country_id, state } = req.body;    
    await pool.query('INSERT INTO CityMaster(id, State, Country_id) VALUES ($1, $2, $3)', [id, state, country_id ]);
    return res.status(201).json({
      message: 'Created'
    });
};

export const getAllStates = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM StateMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getStateById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM StateMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateState = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const {State, Country_id} = req.body;  
    try {
      await pool.query('UPDATE StateMaster SET State=$1, Country_id=$2 WHERE id = $3', [State, Country_id, id]);      
      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteState = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM StateMaster WHERE id = $1', [id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

