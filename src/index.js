import app from './app'
import './database'
console.log("Se malogro");
const port = process.env.PORT || 4000
app.listen(port)
console.log('Server Listen on port', port);