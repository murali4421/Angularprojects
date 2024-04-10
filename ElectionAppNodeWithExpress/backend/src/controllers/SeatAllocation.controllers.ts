// Import necessary types from Express
import { Request, Response } from 'express';
import { QueryResult } from 'pg';
// Import the PostgreSQL connection pool from database.ts
import { pool } from '../database';


// Controller for a new seat allocation
export const createSeatAllocation = async (req: Request, res: Response): Promise<Response> => {
    // Extract Seat details from the request body
    //(title, description, completed)
    const {id, mp_state, total_seats } = req.body;
    // Execute a SQL INSERT statement
    await pool.query('INSERT INTO SeatAllocation(id,MP_state,Total_seats) VALUES ($1, $2, $3)', [id, mp_state , total_seats]);
    // Send a JSON response to the client
    return res.status(201).json({
      // Seat Created successfully
      message: 'Seat allocated successfully',
      Seat: {
        id,
        mp_state,
        total_seats,
      }
    });
  };



  // Get all Seat Allocated List
export const getSeatAllocatedList = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Execute a PostgreSQL query to select all seat allocated list
      const response: QueryResult = await pool.query('SELECT * FROM SeatAllocation');
  
      // Return a JSON response with the retrieved seat allocation
      return res.status(200).json(response.rows);
    } catch (error) {
      // Handle errors, log them, and return an internal server error response
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }

  
  // Get a Seat Allocation by ID
  export const getSeatAllocatedById = async (req: Request, res: Response): Promise<Response> => {
    // Extract the Seat Allocated ID from the request parameters
    const id = parseInt(req.params.id);
  
    try {
      // Execute a PostgreSQL query to select a task by ID
      const response: QueryResult = await pool.query('SELECT * FROM SeatAllocation WHERE id = $1', [id]);
  
      // Return a JSON response with the retrieved seat allocation
      return res.json(response.rows);
    } catch (error) {
      // Handle errors, log them, and return an internal server error response
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }

  // Update a Seat Allocation by ID
export const updateSeatAllocation = async (req: Request, res: Response): Promise<Response> => {
    // Extract Seat Allocation ID from request parameters
    const id = parseInt(req.params.id);
    console.error(req.body);
    // Extract updated Seat Allocation details from request body
    const {mp_state, total_seats } = req.body;
  
    try {
      // Execute a PostgreSQL query to update the Seat Allocation by ID
      await pool.query('UPDATE SeatAllocation SET mp_state = $1, total_seats = $2 WHERE id = $3', [mp_state, total_seats, id]);
  
      // Return a JSON response with the updated Seat Allocation details
      return res.json({
        message: 'Seat Allocation updated successfully',
        Seat: {
          id,
          mp_state,
          total_seats,
        },
      });
    } catch (error) {
   
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }
  

  // Delete a Seat Allocation by ID
  export const deleteSeatAllocation = async (req: Request, res: Response): Promise<Response> => {
    // Extract Seat Allocation ID from request parameters
    const id = parseInt(req.params.id);
  
    try {
      // Execute a PostgreSQL query to delete the Seat Allocation by ID
      await pool.query('DELETE FROM SeatAllocation WHERE id = $1', [id]);
  
      // Return a JSON response indicating successful deletion
      return res.status(200).json(`Seat ${id} deleted successfully`);
    } catch (error) {
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }