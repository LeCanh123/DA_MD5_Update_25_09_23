
import { DataSource } from 'typeorm';
import {Product} from "./../products/entities/product.entity"

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      try{
          const dataSource = new DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'md5_db',
            entities: [
                __dirname + '/../../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
          });
          await dataSource.initialize();
          return dataSource;
      }
      catch(err){
          console.log("Lỗi kết nối database");

      } 
      
    }, 
  }, 
];