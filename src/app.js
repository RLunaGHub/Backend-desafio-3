import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const PORT = 8080;

const manager = new ProductManager('./src/products.json');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Página de inicio');
});

app.get('/products/:id', async (req, res) => {
	const product = await manager.getProductById(parseInt(req.params.id));
	product ? res.send(product) : res.send('Producto no encontrado');
});

app.get('/products', async (req, res) => {
	const { limit } = req.query;
	const products = await manager.getProducts();
	limit ? res.send(products.slice(0, limit)) : res.send(products);
});

app.get('*', (req, res) => {
	res.send('Error 404');
});

app.listen(PORT, () => {
	console.log(`Server on PORT: ${PORT}
http://localhost:${PORT}`);
});