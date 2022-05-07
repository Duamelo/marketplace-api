import { Request } from "express";
import Customer from "../customer.entity";

interface RequestWithCustomer extends Request
{
    user: Customer
}

export default RequestWithCustomer;