// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class JwtMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return res.status(401).send('token no encontrado');
//     }
//     try {
//       const decoded = jwt.verify(token, 'yourSecretKey');
//       req.user = decoded;
//       next();
//     } catch (error) {
//       return res.status(401).send('token no valido');
//     }
//   }
// }
