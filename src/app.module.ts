import { config } from './common/configs';
import { CertificateModule } from './models/certificate/certificate.module';
import { ReceiptModule } from './models/receipt/receipt.module';
import { RegistryModule } from './models/registry/registry.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.example'],
      load: [config], // we can create special config for other module
      isGlobal: true, // works for other modules,
      cache: true // helping get variables from env
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ]),
    CertificateModule,
    ReceiptModule,
    RegistryModule
  ]
})
export class AppModule {}
