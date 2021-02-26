import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import OrderService from '../../services/order';



const route = Router();

export default (app: Router) => {
    app.use('/order', route);

    route.post(
        '/create-order',
        async (req:Request, res: Response) => {
            const profileServiceInstance = Container.get(OrderService);
            const result = await profileServiceInstance.CreateOrder(req,res);
            return result;
        },
    );

};