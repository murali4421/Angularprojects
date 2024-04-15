// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const createCity = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllCity(req, res);
    const id = 0;
    const { country_id, state_id ,city_name } = req.body;    
    await pool.query('INSERT INTO CityMaster(id, City, State_Id, Country_id) VALUES ($1, $2, $3, $4)', [id, city_name, state_id, country_id ]);
    return res.status(201).json({
      message: 'Created',
      CityDetail: {
        id,
        city_name
      }
    });
};

export const getAllCity = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM CityMaster order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getCityById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM CityMaster WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateCity = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const {City, State_Id, Country_id} = req.body;  
    try {
      await pool.query('UPDATE CityMaster SET City=$1, State_Id=$2, Country_id=$3 WHERE id = $4', [City, State_Id, Country_id, id]);      
      return res.json({
        message: 'Updated',
        CityDetail: {
          id,
          City
        },
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const deleteCity = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM CityMaster WHERE id = $1', [id]);
      return res.status(200).json(`City deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

