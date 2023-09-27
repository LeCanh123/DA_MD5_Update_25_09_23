import { DataSource, Repository } from 'typeorm';
import { GateWay1 } from './entities/gateway.entity'; 
import { productImageProviders } from '../productimages/productimages.providers';

export const gateWayProviders = [
  {
    productImageProviders
    ,provide: 'GATEWAY_REPOSITORY',
    useFactory: (dataSource: DataSource) => {

      try{
        const gatewayRepository = dataSource.getRepository(GateWay1);
        return gatewayRepository
      }
      catch(err){
          console.log("Chưa kết nối database");
        }
    },
    inject: ['DATA_SOURCE'],
  },
];