// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createCountry = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllCountry(req, res);
    const id = 0;
    const { Country } = req.body;    
    await pool.query('INSERT INTO CountryMaster(id, Country) VALUES ($1, $2)', [id, Country ]);
    return res.status(201).json({
      message: 'Created'
    });
};

export const getAllCountry = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM CountryMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getCountryById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM CountryMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateCountry = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const {Country} = req.body;  
    try {
      await pool.query('UPDATE CountryMaster SET Country=$1 WHERE id = $2', [Country, id]);      
      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteCountry = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM CountryMaster WHERE id = $1', [id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

