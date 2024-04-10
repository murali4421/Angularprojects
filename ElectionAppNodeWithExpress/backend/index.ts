// Import necessary modules and types
import express, { Router } from 'express';
import { getSeatAllocatedList, getSeatAllocatedById, createSeatAllocation
    , deleteSeatAllocation, updateSeatAllocation } from './src/controllers/SeatAllocation.controllers';

// Create an Express application
const app = express();

// Create a Router instance for handling Election-related routes
const electionRouter = Router();

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes for election operations using the electionRouter
electionRouter.get('/SeatAllocation', getSeatAllocatedList);
electionRouter.get('/SeatAllocation/:id', getSeatAllocatedById);
electionRouter.post('/SeatAllocation', createSeatAllocation);
electionRouter.put('/SeatAllocation/:id', updateSeatAllocation);
electionRouter.delete('/SeatAllocation/:id', deleteSeatAllocation);

// Use the electionRouter for paths starting with '/api'
app.use(electionRouter);

// Set up the Express application to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});