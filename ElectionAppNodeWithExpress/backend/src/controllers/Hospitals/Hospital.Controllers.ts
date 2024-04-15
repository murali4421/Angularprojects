// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../db/database';

export const createHospital = async (req: Request, res: Response): Promise<Response> => {
    try{
        const maxId = getMaxId(req, res);
        const id = maxId;
        const status = 'Verification Inprogress';
        const { name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
                address, city, state, country, pincode} = req.body;    
        await pool.query('INSERT INTO Hospitals(id, name, licence_no, registration_no, phone_no, email_id, website, fax_no, '
        + 'address, city, state, country, pincode, IsVerified, RejectedReason, IsActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, '
        + ' $11, $12, $13, $14 )', [id, name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
            address, city, state, country, pincode, 'N','', 'Y' ]);

        return res.status(201).json({
            message: 'Created',
            Hospital: {
                id,
                name,
                status
      }
    });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const getMaxId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT max(Id)+1 as maxId FROM Hospitals ');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getAllHospitals = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query('SELECT * FROM Hospitals order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getHospitalById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM Hospitals WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getHospitalByName = async (req: Request, res: Response): Promise<Response> => {
    const name = "'"+parseInt(req.params.name) + "%'";  
    try {
      const response: QueryResult = await pool.query('SELECT * FROM Hospitals WHERE name like $1', [name]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}


export const VerifyHospital = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    const {status, RejectedReason} = req.body; 
             
    try {
      const response: QueryResult = await pool.query('UPDATE Hospitals SET IsVerified=$1, RejectedReason =$2 WHERE id = $3', [status, RejectedReason, id]);
      return res.json({
        message: 'Updated',
        Verify_Details: {
          'Status':  (status == 'R') ? 'Rejected' : 'Verified' ,
          'RejectedReason': (status == 'R') ? RejectedReason : ''          
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateHospital = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const { name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
        address, city, state, country, pincode} = req.body;  
    try {
      await pool.query('UPDATE Hospitals SET name=$1, licence_no=$2, registration_no=$3, phone_no=$4, email_id=$5, website=$6, fax_no=$7, '
        + ' address=$8, city=$9, state=$10, country=$11, pincode=$12', [name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
        address, city, state, country, pincode, id]);      
      return res.json({
        message: 'Updated',
        Hospital_Details: {
          id,
          name, 
          licence_no, 
          registration_no, 
          phone_no, 
          email_id, 
          website, 
          fax_no, 
          address, 
          city, 
          state, 
          country, 
          pincode
        },
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json({ message : 'Internal Server error' });
    }
}

export const deleteHospital = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    let inActive = 'N';     
    try {
      await pool.query('UPDATE Hospitals SET IsActive=$1 WHERE id = $2', [inActive, id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

