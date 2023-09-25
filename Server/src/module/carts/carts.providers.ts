import { DataSource } from 'typeorm';
import { Cart } from './entities/cart.entity'; 

export const cartProviders = [
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(Cart);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    },
    inject: ['DATA_SOURCE'],
  },
];