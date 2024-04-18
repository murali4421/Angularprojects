// Import necessary modules and types
import express, { Router } from 'express';
// import { getSeatAllocatedList, getSeatAllocatedById, createSeatAllocation
//     , deleteSeatAllocation, updateSeatAllocation } from './src/controllers/SeatAllocation.controllers';
import { createProfile, VerifyProfile, deleteProfile,getAllProfiles,getProfileById,getProfileByName, updateProfile } from './src/controllers/HVProfiles.Controllers';
import { createEmployee, deleteEmployee, getAllEmployee, getEmployeeById, getEmployeeByName, updateEmployee } from './src/controllers/Users.Controllers';
import { createCity, deleteCity, getAllCity, getCityById, updateCity } from './src/controllers/City.Controllers';
import { createCountry, deleteCountry, getAllCountry, getCountryById, updateCountry} from './src/controllers/Country.Controllers';
import { createState, deleteState, getAllStates, getStateById, updateState} from './src/controllers/States.Controllers';
import { createDesignation, deleteDesignation, getAllDesignation, getDesignationById, updateDesignation} from './src/controllers/Designation.Controllers';
import { createMedicine, deleteMedicine, getAllMedicine, getMedicineById, updateMedicine} from './src/controllers/MedicineName.Controllers';
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory} from './src/controllers/MedicineCategory.Controllers';
import { createStorageCategoryType, deleteStorageCategoryType, getAllStorageCategoryTypes, getStorageCategoryTypeById, updateStorageCategoryType} from './src/controllers/StorageCategoryType.Controllers';
import { createStorageCategoryTypeValue, deleteStorageCategoryTypeValue, getAllStorageCategoryTypeValues, getStorageCategoryTypeValueById, updateStorageCategoryTypeValue} from './src/controllers/StorageCategoryTypeValue.Controllers';
import { createOrder, getAllOrders, getAllProfileOrders, getDemandMedicineList, getExternalAcceptedOrderList, 
          getExternalReceivedOrderList, getInternalApprovePendingOrderList, getInternalApprovedOrderList, 
          getOrderById, getProfileOrderById, setExternalOrderCancel, setInternalOrderApprove, setOrderCancel,
          updateOrder } from './src/controllers/Orders.Controllers';
// Create an Express application
const app = express();

// Create a Router instance for handling app routes
const appRouter = Router();

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // Define routes for election operations using the appRouter
// appRouter.get('/SeatAllocation', getSeatAllocatedList);
// appRouter.get('/SeatAllocation/:id', getSeatAllocatedById);
// appRouter.post('/SeatAllocation', createSeatAllocation);
// appRouter.put('/SeatAllocation/:id', updateSeatAllocation);
// appRouter.delete('/SeatAllocation/:id', deleteSeatAllocation);

// Define routes for City operations using the appRouter
appRouter.get('/City/All', getAllCity);
appRouter.get('/City/:id', getCityById);
appRouter.post('/City', createCity);
appRouter.put('/City/:id', updateCity);
appRouter.delete('/City/:id', deleteCity);
// Define routes for State operations using the appRouter
appRouter.get('/State/All', getAllStates);
appRouter.get('/State/:id', getStateById);
appRouter.post('/State', createState);
appRouter.put('/State/:id', updateState);
appRouter.delete('/State/:id', deleteState);
// Define routes for Country operations using the appRouter
appRouter.get('/Country', getAllCountry);
appRouter.get('/Country/:id', getCountryById);
appRouter.post('/Country', createCountry);
appRouter.put('/Country/:id', updateCountry);
appRouter.delete('/Country/:id', deleteCountry);
// Define routes for Designation operations using the appRouter
appRouter.get('/Designation', getAllDesignation);
appRouter.get('/Designation/:id', getDesignationById);
appRouter.post('/Designation', createDesignation);
appRouter.put('/Designation/:id', updateDesignation);
appRouter.delete('/Designation/:id', deleteDesignation);
// Define routes for Medicine operations using the appRouter
appRouter.get('/Medicine', getAllMedicine);
appRouter.get('/Medicine/:id', getMedicineById);
appRouter.post('/Medicine', createMedicine);
appRouter.put('/Medicine/:id', updateMedicine);
appRouter.delete('/Medicine/:id', deleteMedicine);
// Define routes for Category operations using the appRouter
appRouter.get('/Category', getAllCategory);
appRouter.get('/Category/:id', getCategoryById);
appRouter.post('/Category', createCategory);
appRouter.put('/Category/:id', updateCategory);
appRouter.delete('/Category/:id', deleteCategory);
// Define routes for Storage Category Type operations using the appRouter
appRouter.get('/StorageCategoryType', getAllStorageCategoryTypes);
appRouter.get('/StorageCategoryType/:id', getStorageCategoryTypeById);
appRouter.post('/StorageCategoryType', createStorageCategoryType);
appRouter.put('/StorageCategoryType/:id', updateStorageCategoryType);
appRouter.delete('/StorageCategoryType/:id', deleteStorageCategoryType);
// Define routes for Storage Category Type Value operations using the appRouter
appRouter.get('/StorageCategoryTypeValue', getAllStorageCategoryTypeValues);
appRouter.get('/StorageCategoryTypeValue/:id', getStorageCategoryTypeValueById);
appRouter.post('/StorageCategoryTypeValue', createStorageCategoryTypeValue);
appRouter.put('/StorageCategoryTypeValue/:id', updateStorageCategoryTypeValue);
appRouter.delete('/StorageCategoryTypeValue/:id', deleteStorageCategoryTypeValue);


// Define routes for Hospital operations using the appRouter
appRouter.post('/Hospital', createProfile);
appRouter.get('/Hospital/All', getAllProfiles);
appRouter.put('/Hospital/:id', updateProfile);
appRouter.put('/Hospital/Verify/:id', VerifyProfile);
appRouter.delete('/Hospital/:id', deleteProfile);
appRouter.get('/Hospital/:id', getProfileById);
appRouter.get('/Hospital/:name', getProfileByName);
// Define routes for Hospital employee operations using the appRouter
appRouter.get('/Hospital/Employee/All', getAllEmployee);
appRouter.get('/Hospital/Employee/:id', getEmployeeById);
appRouter.get('/Hospital/Employee/N/:name', getEmployeeByName);
appRouter.post('/Hospital/Employee', createEmployee);
appRouter.put('/Hospital/Employee/:id', updateEmployee);
appRouter.delete('/Hospital/Employee/:id', deleteEmployee);
// Define routes for Hospital Order operations using the appRouter
appRouter.get('/Hospital/Order/All', getAllProfileOrders);
appRouter.get('/All/Hospital/Orders', getAllOrders);
appRouter.get('/Hospital/Order/:id', getProfileOrderById);
appRouter.get('/All/Hospital/Orders/:id', getOrderById);
appRouter.post('/Hospital/Order', createOrder);
appRouter.put('/Hospital/Order/:id', updateOrder);
appRouter.put('/Hospital/Order/:id', setOrderCancel);
appRouter.put('/Hospital/VdrOrder/Cancel/:id', setExternalOrderCancel);
appRouter.get('/Hospital/VdrOrders/:id', getExternalReceivedOrderList);
appRouter.get('/Hospital/VdrOrders/Accepted/:id', getExternalAcceptedOrderList);
appRouter.get('/Hospital/DemandMedicine/', getDemandMedicineList);
appRouter.get('/Hospital/Orders/Pending/:id', getInternalApprovePendingOrderList);
appRouter.get('/Hospital/Orders/Approved/:id', getInternalApprovedOrderList);
appRouter.put('/Hospital/Orders/Approve/:id', setInternalOrderApprove);

// Define routes for Vendor operations using the appRouter
appRouter.post('/Ventor', createProfile);
appRouter.get('/Ventors', getAllProfiles);
appRouter.put('/Ventors/:id', updateProfile);
appRouter.put('/Ventors/Verify/:id', VerifyProfile);
appRouter.delete('/Ventor/:id', deleteProfile);
appRouter.get('/Ventor/:id', getProfileById);
appRouter.get('/Ventor/:name', getProfileByName);
// Define routes for Vendor employee operations using the appRouter
appRouter.get('/Vendor/Employee/All', getAllEmployee);
appRouter.get('/Vendor/Employee/:id', getEmployeeById);
appRouter.get('/Vendor/Employee/N/:name', getEmployeeByName);
appRouter.post('/Vendor/Employee', createEmployee);
appRouter.put('/Vendor/Employee/:id', updateEmployee);
appRouter.delete('/Vendor/Employee/:id', deleteEmployee);
// Define routes for Vendor Order operations using the appRouter
appRouter.get('/Vendor/Order/All', getAllProfileOrders);
appRouter.get('/All/Vendor/Orders', getAllOrders);
appRouter.get('/Vendor/Order/:id', getProfileOrderById);
appRouter.get('/All/Vendor/Orders/:id', getOrderById);
appRouter.post('/Vendor/Order', createOrder);
appRouter.put('/Vendor/Order/:id', updateOrder);
appRouter.put('/Vendor/Order/:id', setOrderCancel);
appRouter.put('/Vendor/HsplOrder/Cancel/:id', setExternalOrderCancel);
appRouter.get('/Vendor/HsplOrders/:id', getExternalReceivedOrderList);
appRouter.get('/Vendor/HsplOrders/Accepted/:id', getExternalAcceptedOrderList);
appRouter.get('/Vendor/Orders/Pending/:id', getInternalApprovePendingOrderList);
appRouter.get('/Vendor/Orders/Approved/:id', getInternalApprovedOrderList);
appRouter.put('/Vendor/Orders/Approve/:id', setInternalOrderApprove);

// Use the appRouter for paths starting with '/api'
app.use(appRouter);

// Set up the Express application to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});