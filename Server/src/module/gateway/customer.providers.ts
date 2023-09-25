import { DataSource } from 'typeorm';
import { CustomerGateWay } from './customer.getway';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(CustomerGateWay);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    },
    inject: ['DATA_SOURCE'],
  },
];