// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from './db/database';

const table = { name : ''};
let supplierTbl = 'Supplier_Orders';
let hospitalTbl = 'Hospital_Orders';

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    const citys = getAllOrders(req, res);
    const id = 0;
    const { profile_id, quote_no, quote_date, quote_type, price_type, medicine_Name, description, qty,
        expiry_date, Category, storage_type, storage_value, quoted_amount, expected_date,
        created_by, platform_cost, modified_date, modified_by, approved_flag,
         approved_date, approved_by, reason, order_cancel, order_cancel_by, order_accepted  } = req.body;
    try{
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
        const response :QueryResult = await pool.query('INSERT INTO '+ table.name +'(id, profile_id, quote_no, quote_date, quote_type, price_type, medicine_Name, description, qty, ' +
                    ' expiry_date, Category, storage_type, storage_value, quoted_amount, expected_date, ' +
                    ' created_by, platform_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)', 
                    [id, profile_id, quote_no, quote_date, quote_type, price_type, medicine_Name, description, qty,
                        expiry_date, Category, storage_type, storage_value, quoted_amount, expected_date,
                        created_by, platform_cost ]);
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

export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' order by id asc');  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getAllProfileOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.profile_id);
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' where profile_id=$1 order by id asc',[id]);  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}
  
export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);  
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' WHERE id = $1', [id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getProfileOrderById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id); 
    const profile_id = parseInt(req.params.profile_id);
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' WHERE profile_id=$1 and id=$2', [profile_id,id]);
      return res.json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);

    console.error(req.body);
    const {quote_type, price_type, medicine_Name, description, qty,
        expiry_date, Category, storage_type, storage_value, quoted_amount, expected_date,
        created_by, platform_cost, modified_date, modified_by} = req.body;  
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
        const response :QueryResult = await pool.query('UPDATE '+ table.name +' SET quote_type=$1, price_type=$2, medicine_Name=$3, description=$4, qty=$5, ' +
      ' expiry_date=$6, Category=$7, storage_type=$8, storage_value=$9, quoted_amount=$10, expected_date=$11, ' +
      ' created_by=$12, platform_cost=$13, modified_date=$14, modified_by=$15 WHERE id=$16 and order_cancel is null and approved_flag is null', 
      [quote_type, price_type, medicine_Name, description, qty,
        expiry_date, Category, storage_type, storage_value, quoted_amount, expected_date,
        created_by, platform_cost, modified_date, modified_by, id]);      
      return res.json({
        message: 'Updated'
      });
    } catch (error) {   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const setOrderCancel = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
        const response :QueryResult = await pool.query('UPDATE '+ table.name +' SET order_cancel=$1 WHERE id = $2 and order_cancel is null', ['Y',id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const setInternalOrderApprove = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { approved_date, approved_by, approved_flag, reason} = req.body; 
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
        const response :QueryResult = await pool.query('UPDATE '+ table.name +' SET approved_date=$1, approved_by=$2, approved_flag=$3, reason=$4 WHERE id = $5 and order_cancel is null ', 
      [approved_date, approved_by, approved_flag, reason, id]);

      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getInternalApprovePendingOrderList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.profile_id);
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' where profile_id=$1 and approved_flag is null and order_cancel is null order by id asc',[id]);  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getInternalApprovedOrderList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' where profile_id=$1 and approved_flag=$2 and order_cancel is null order by id asc',[id, 'Y']);  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getExternalAcceptedOrderList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' where profile_id=$1 and order_accepted=$2 and order_cancel is null order by id asc',[id, 'Y']);  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getExternalReceivedOrderList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' where profile_id=$1 and order_accepted is null and order_cancel is null order by id asc',[id]);  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const getDemandMedicineList = async (req: Request, res: Response): Promise<Response> => {
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
      const response: QueryResult = await pool.query('SELECT * FROM '+ table.name +' where approved_flag=$1 and quote_type=$2 and order_cancel is null order by id asc',['Y', 'Public']);  
      return res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

export const setExternalOrderCancel = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const profile_name = req.params.name;
    try {
        table.name = req.url.indexOf('Hospital') > -1 ?  hospitalTbl : supplierTbl;
        const response :QueryResult = await pool.query('UPDATE '+ table.name +' SET order_cancel=$1, order_cancel_by=$2 WHERE id = $3', ['Y', profile_name,id]);
      return res.status(200).json(`Deleted`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
}

