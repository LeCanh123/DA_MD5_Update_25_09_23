import { DataSource } from 'typeorm';
import { Bag } from './entities/bag.entity'; 

export const bagsProviders = [
  {
    provide: 'BAG_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(Bag);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    }, 
    inject: ['DATA_SOURCE'],
  },
];