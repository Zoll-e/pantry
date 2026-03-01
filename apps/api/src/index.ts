import { Hono } from 'hono';
import usersApp from './modules/users/users.routes';

const app = new Hono();

app.get('/', (c) => c.text('Hello Pantry!'));

app.route('/users', usersApp);

export default app;
