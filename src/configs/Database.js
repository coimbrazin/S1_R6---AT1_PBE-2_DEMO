export async function initializeDatabase() {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });


        const dbName = process.env.DB_DATABASE || 'deploy';


        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(30) NOT NULL,
                descricao VARCHAR(300) NULL
            );
        `);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(30) NOT NULL,
                valor DECIMAL(15,2) NOT NULL,
                id_categoria INT,
                FOREIGN KEY (id_categoria) REFERENCES categorias(id)
            );
        `);


        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}
