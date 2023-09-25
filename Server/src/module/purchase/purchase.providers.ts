import { DataSource } from 'typeorm';
import { Address } from '../address/entities/address.entity'; 

export const purchaseProviders = [
  {
    provide: 'PURCHASE_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(Address);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    },
    inject: ['DATA_SOURCE'],
  },
];