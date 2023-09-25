import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from '../productimages/entities/productimage.entity';
import { productImageProviders } from '../productimages/productimages.providers';

export const productProviders = [
  {
    productImageProviders
    ,provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource,productImageRepository: Repository<ProductImage>) => {

      try{
        const productRepository = dataSource.getRepository(Product);
        const productImageRepository = dataSource.getRepository(ProductImage);
  
        if (!productRepository || !productImageRepository) {
          console.log("Không thể lấy repository");
          return null; // hoặc trả về giá trị mặc định khác
        }
  
       return productRepository
      }
      catch(err){
          console.log("Chưa kết nối database");
        }
    },
    inject: ['DATA_SOURCE'],
  },
];