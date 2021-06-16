const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const ormData = require("./ormconfig_js");

/**
 * @type import('typeorm').ConnectionOptions
 */
module.exports = {
    ...ormData,
    entities: ["src/database/entity/**/*.ts"],
    migrations: ["src/database/migration/**/*.ts"],
    cli: {
        entitiesDir: "src/database/entity",
        migrationsDir: "src/database/migration",
        subscribersDir: "src/database/subscriber",
    },
};
