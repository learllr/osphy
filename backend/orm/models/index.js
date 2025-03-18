import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import process from "process";
import { Sequelize } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

dotenv.config({ path: path.resolve("../.env") });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const configFilePath = pathToFileURL(
  path.resolve(__dirname, "../config/config.js")
).href;

let configFile;
try {
  configFile = (await import(configFilePath)).default;
} catch (error) {
  console.error(
    "Erreur lors du chargement du fichier de configuration :",
    error
  );
  process.exit(1);
}

const config = configFile[env];

if (!config) {
  console.error(`Configuration introuvable pour l'environnement : ${env}`);
  process.exit(1);
}

const db = {};

let sequelize;
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], {
      ...config,
      logging: false,
      dialectOptions: {
        ssl: false,
      },
    });
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        ...config,
        logging: false,
        dialectOptions: {
          ssl: false,
        },
      }
    );
  }
} catch (error) {
  console.error("Erreur de connexion à la base de données :", error);
  process.exit(1);
}

const files = await fs.readdir(__dirname);

for (const file of files) {
  if (
    file.startsWith(".") ||
    file === basename ||
    !file.endsWith(".js") ||
    file.includes(".test.js")
  ) {
    continue;
  }

  try {
    const filePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(filePath).href;
    const { default: model } = await import(fileUrl);

    if (typeof model !== "function") {
      console.warn(
        `Le fichier ${file} ne semble pas exporter un modèle valide.`
      );
      continue;
    }

    const initializedModel = model(sequelize, Sequelize.DataTypes);
    db[initializedModel.name] = initializedModel;
  } catch (error) {
    console.error(`Erreur lors de l'importation du modèle ${file} :`, error);
  }
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
