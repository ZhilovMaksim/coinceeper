import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = '1bc2fc46e94b160ccfaa9ece681ef1f77d915d3fe363420230b21480996def7bb299e147483023bed8eca2a2d3a8986c96ca0ec3da9e42b9c8ea1124842f3ad1d6176a68f546ddf9e2527ef75065ea2135581cec25a5a023f54c9195791eba134bf75c794c2eba298b9341949e7be99ed2b0796586c9c34d82ebd198ba34f04d04bfc5c3f7e7dd09d56d5f0efbed8c00bdff17d1933a199ad2cae9c8a9884bb7fad4849268f12319ef150d37b4263cf941ebbfc1566f2236df1f50e0133401524f16e4413e98a060075db4c147551504bfafa1b3ea9ecaf697c8624f43b8a81c4c47f9fd40a065fb781a7453b44a0d47f24feb3cbace3670ec5b66f42c7dd666'; // Храните в переменных окружения в продакшене
const TOKEN_EXPIRY = '1h';

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Неверный или истекший токен' });
    }
};

// Регистрация
server.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const db = router.db;
    const userExists = db.get('users').find({ email }).value();
    if (userExists) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
    };

    db.get('users').push(newUser).write();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
});

// Авторизация
server.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const db = router.db;
    const user = db.get('users').find({ email }).value();
    if (!user) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    res.status(200).json({ token, user: { id: user.id, email: user.email } });
});

server.post('/transactions', authenticateToken, (req, res) => {
    const { type, amount, category, date, comment } = req.body;
    if (!type || !amount || !category || !date) {
        return res.status(400).json({ error: 'Тип, сумма, категория и дата обязательны' });
    }

    const db = router.db;
    const newTransaction = {
        id: Date.now().toString(),
        userId: req.user.userId,
        type,
        amount: parseFloat(amount),
        category,
        date,
        comment: comment || '',
        createdAt: new Date().toISOString(),
    };

    db.get('transactions').push(newTransaction).write();
    res.status(201).json(newTransaction);
});

server.delete('/transactions/:id', authenticateToken, (req, res) => {
    const db = router.db;
    const transactionId = req.params.id;

    const transaction = db.get('transactions').find({ id: transactionId, userId: req.user.userId }).value();
    if (!transaction) {
        return res.status(404).json({ error: 'Транзакция не найдена или доступ запрещен' });
    }

    db.get('transactions').remove({ id: transactionId }).write();
    res.status(204).send();
});

server.post('/categories', authenticateToken, (req, res) => {
    const { name, color } = req.body;
    if (!name || !color) {
        return res.status(400).json({ error: 'Имя и цвет категории обязательны' });
    }

    const db = router.db;
    const newCategory = {
        id: Date.now().toString(),
        userId: req.user.userId,
        name,
        color,
    };

    db.get('categories').push(newCategory).write();
    res.status(201).json(newCategory);
});

// Роуты для защищенных данных
server.use('/transactions', authenticateToken);
server.use('/categories', authenticateToken);

server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});