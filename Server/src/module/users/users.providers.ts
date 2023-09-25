import { DataSource } from 'typeorm';
import { User } from './entities/user.entity'; 

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(User);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    },
    inject: ['DATA_SOURCE'],
  },
];