/* eslint-disable @typescript-eslint/comma-dangle */
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, `../../../.env${process.env.NODE_ENV === 'development' ? `.development` : ''}`)
});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development'),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().required(),
    API_BASE_URL: Joi.string().required(),
    RECEIPT_API_BASE_URL: Joi.string().required(),
    REGISTRY_API_BASE_URL: Joi.string().required(),
    QR_BASE_URL: Joi.string().required(),
    FILE_API_BASE_URL: Joi.string().required()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

export default {
  env: envVars.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 5000,
  base_url: envVars.BASE_URL,
  api: {
    base_url: envVars.API_BASE_URL,
    receipt_base_url: envVars.RECEIPT_API_BASE_URL,
    registry_base_url: envVars.REGISTRY_API_BASE_URL,
    qr_base_url: envVars.QR_BASE_URL,
    file_base_url: envVars.FILE_API_BASE_URL
  },
  logs:
    process.env.NODE_ENV === 'production' ? '":method :url" :status :response-time ":referrer" ":user-agent"' : 'dev'
};
