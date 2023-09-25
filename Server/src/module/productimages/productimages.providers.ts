import { DataSource } from 'typeorm';
import { ProductImage } from './entities/productimage.entity'; 

export const productImageProviders = [
  {
    provide: 'PRODUCTIMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(ProductImage);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    },
    inject: ['DATA_SOURCE'],
  },
];