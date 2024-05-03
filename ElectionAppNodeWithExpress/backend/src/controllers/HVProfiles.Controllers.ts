// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const table = { Name : ''}; // Table name : Hospitals & Ventors
export const createProfile = async (req: Request, res: Response): Promise<Response> => {
    try{
        const maxId = getMaxId(req, res);
        table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';

        const id = maxId;
        const status = 'Verification Inprogress';
        const { name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
                address, city, state, country, pincode} = req.body;    
        await pool.query('INSERT INTO '+ table.Name +'(id, name, licence_no, registration_no, phone_no, email_id, website, fax_no, '
        + 'address, city, state, country, pincode, IsVerified, RejectedReason, IsActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, '
        + ' $11, $12, $13, $14 )', [id, name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
            address, city, state, country, pincode, 'N','', 'Y' ]);

        return res.status(201).json({
            message: 'Created',
            details: {
                remarks : 'Profile is created successfully'
      }
    });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

const getMaxId = (req: Request, res: Response): any => {
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';
      const response: any = pool.query('SELECT max(Id)+1 as maxId FROM '+ table.Name );  
      return response;
    } catch (error) {
      console.error(error);
      return 0;
    }
}

export const getAllProfiles = async (req: Request, res: Response): Promise<Response> => {
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.Name +' order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getProfileById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.Name +' WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getProfileByName = async (req: Request, res: Response): Promise<Response> => {
    const name = "'"+ req.params.name + "%'";  
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.Name +' WHERE name like $1', [name]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}


export const VerifyProfile = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    const {status, RejectedReason} = req.body; 
             
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';
      const response: QueryResult = await pool.query('UPDATE '+ table.Name +' SET IsVerified=$1, RejectedReason =$2 WHERE id = $3', [status, RejectedReason, id]);
      return res.json({
        message: (status == 'R') ? 'Rejected' : 'Verified' ,
        details: {
          'Remarks': (status == 'R') ? RejectedReason : 'Profile is verified successfully'          
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const { name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
        address, city, state, country, pincode} = req.body;  

    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';
      await pool.query('UPDATE '+ table.Name +' SET name=$1, licence_no=$2, registration_no=$3, phone_no=$4, email_id=$5, website=$6, fax_no=$7, '
        + ' address=$8, city=$9, state=$10, country=$11, pincode=$12', [name, licence_no, registration_no, phone_no, email_id, website, fax_no, 
        address, city, state, country, pincode, id]);      
      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json({ message : 'Internal Server error' });
    }
}

export const deleteProfile = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    let inActive = 'N';     
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospitals' : 'Suppliers';
      await pool.query('UPDATE '+ table.Name +' SET IsActive=$1 WHERE id = $2', [inActive, id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

