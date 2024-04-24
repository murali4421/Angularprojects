// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

export const table = { Name : ''}; // Table name : Hospital_Employees & Ventor_Employees
export const createEmployee = async (req: Request, res: Response): Promise<Response> => {
    try{
        const maxId = getMaxId(req, res);
        const id = maxId;
        const { user_id, pwd, name, emp_id, designation_id, emplymt_start_date, 
                emplymt_end_date, mobile_no, email_id, official_email_id, DOB, 
                address, city, state, country, pincode } = req.body;    
        table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';

        await pool.query('INSERT INTO '+ table.Name +'(id, user_id, pwd, name, emp_id, designation_id, emplymt_start_date, emplymt_end_date, mobile_no, email_id, official_email_id, DOB, '
        + 'address, city, state, country, pincode, IsActive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, '
        + ' $11, $12, $13, $14, $15, $16, $17, $18 )', [id, user_id, pwd, name, emp_id, designation_id, emplymt_start_date, 
            emplymt_end_date, mobile_no, email_id, official_email_id, DOB, 
            address, city, state, country, pincode, 'Y' ]);

        return res.status(201).json({
            message: 'Created'
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
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';
      const response: any = pool.query('SELECT max(Id)+1 as maxId FROM '+ table.Name  );  
      return response;
    } catch (error) {
      console.error(error);
      return 0;
    }
}

export const getAllEmployee = async (req: Request, res: Response): Promise<Response> => {
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.Name +' order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getEmployeeById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.Name +' WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getEmployeeByName = async (req: Request, res: Response): Promise<Response> => {
    const name = "'"+ req.params.name + "%'";  
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.Name +' WHERE name like $1', [name]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateEmployee = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    console.error(req.body);
    const { user_id, pwd, name, emp_id, designation_id, emplymt_start_date, 
        emplymt_end_date, mobile_no, email_id, official_email_id, DOB, 
        address, city, state, country, pincode } = req.body;  
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';
      await pool.query('UPDATE '+ table.Name +' SET user_id =$1, pwd=$2, name=$3, emp_id=$4, designation_id=$5, ' +
      ' emplymt_start_date=$6, emplymt_end_date=$7, mobile_no=$8, email_id=$9, official_email_id=$10, DOB=$11, ' +
      ' address =$12, city=$13, state=$14, country=$15, pincode=$16  where id=$17', [user_id, pwd, name, emp_id, 
        designation_id, emplymt_start_date, emplymt_end_date, mobile_no, email_id, official_email_id, DOB, 
        address, city, state, country, pincode, id]);      

      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json({ message : 'Internal Server error' });
    }
}

export const deleteEmployee = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    let inActive = 'N';     
    try {
      table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';
      await pool.query('UPDATE '+ table.Name +' SET IsActive=$1 WHERE id = $2', [inActive, id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const GetUserLoginDetail = async (req: Request, res: Response): Promise<Response> => {
  const { user_id, passward} = req.body;  
  try {
    table.Name = req.url.indexOf('Hospital') > -1 ? 'Hospital_Employees' : 'Ventor_Employees';
    const response: QueryResult = await pool.query('SELECT * FROM '+ table.Name +' WHERE user_id = $1 and pwd =$2', [user_id, passward]);
    
    if(response.rowCount != null && response.rowCount > 0)
      {
        return res.status(200).json('response.rows');
      }
      else{
        return res.status(200).json({ message : 'Invalid user'});
      }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal Server error');
  }
}