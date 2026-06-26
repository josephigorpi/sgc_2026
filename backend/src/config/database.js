import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
<<<<<<< HEAD
  logging: false,
=======
  logging: console.log,
>>>>>>> companero1/main
  define: {
    schema: 'sgc',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'modificado_en',
  },
});