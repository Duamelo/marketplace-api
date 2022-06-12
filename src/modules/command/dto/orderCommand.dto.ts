import CreateOrderDto from "./create-order.dto";

export class OrderCommandDto{
    order: CreateOrderDto;
    client: number;
}
export default OrderCommandDto;