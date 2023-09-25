import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DatabaseErrorMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Xử lý lỗi kết nối cơ sở dữ liệu ở đây
    console.log('Lỗi kết nối database');
    next();
  }
}