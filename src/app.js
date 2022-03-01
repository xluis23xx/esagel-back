import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles,createDocuments} from './libs/initialSetup'

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routes'
import documentsRoutes from './routes/documents.routes'
import employeesRoutes from './routes/employees.routes'
import providersRoutes from './routes/providers.routes'

const app = express()
const cors = require('cors')
createRoles();
createDocuments();

app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/providers', providersRoutes);

export default app;