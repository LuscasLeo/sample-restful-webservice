import { createConnection } from "typeorm";
import { User } from "../../database/entity/User";
import UserController from "./user.controller";
import UserService from "./user.service";

describe("UserController", () => {
    it("Shout be okay", async () => {
        const connection = await createConnection({
            type: "sqlite",
            database: ":memory:",
            entities: ["src/database/entity/**/*.ts"],
            synchronize: true,
        });

        const repository = connection.getRepository(User);

        const userController = new UserController(new UserService(repository), repository);
        const a = await userController.getAll({ limit: 100, offset: 0, order: "DESC", sort: "name" });
    });
});
