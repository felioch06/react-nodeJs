import { Router } from 'express';
import order from './routes/order';
export default () => {
    const app = Router();

    order(app)
    
    return app
}