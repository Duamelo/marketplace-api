import { Request } from "express";
import Vendor from "../vendor.entity";

interface RequestWithVendor extends Request
{
    user: Vendor
}
export default RequestWithVendor;