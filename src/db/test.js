const mysql = require('mysql2/promise');

async function updateCategories() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Arturo.2109',
    database: 'Ofraud',
  });

  const [rows] = await connection.execute(
    'SELECT * FROM categories WHERE id = ?',
    [1],
  );

  console.log('rows:', rows);
  await connection.end();
}

updateCategories().catch(console.error);
