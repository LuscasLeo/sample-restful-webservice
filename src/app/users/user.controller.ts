import { MinLength } from "class-validator";
import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../database/entity/User";
import { IndexInput } from "../../utils/inputs";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import UserService from "./user.service";

class UserInput {
    @MinLength(4)
    name: string;

    @MinLength(4)
    password: string;
}

class UserIndexInput extends IndexInput<UserInput> {}

@OpenAPI({
    security: [
        {
            bearerToken: [""],
        },
    ],
})
@JsonController("/users")
@Service()
@UseBefore(AuthenticationMiddleware)
export default class UserController {
    constructor(private usersService: UserService, @InjectRepository(User) private userRepo: Repository<User>) {}

    @Get("/", { transformRequest: true })
    async getAll(@Body({ required: true, validate: true }) query: UserIndexInput) {
        return query;
        // return await this.userRepo.find({
        //     order: {
        //         id: "ASC",
        //     },
        // });
    }

    @Get("/:id")
    @OnUndefined(404)
    async getOne(@Param("id") id: number) {
        return await this.userRepo.findOne(id);
    }

    @Post()
    @HttpCode(201)
    async post(@Body() user: UserInput) {
        return await this.userRepo.save(Object.assign(new User(), user));
    }

    @Put("/:id")
    @OnUndefined(404)
    @HttpCode(202)
    async put(@Param("id") id: number, @Body({ validate: true }) userInput: UserInput) {
        const user = await this.userRepo.findOne(id);
        if (!user) return undefined;
        return await this.userRepo.save(Object.assign(new User(), { ...user, ...userInput }));
    }

    @Delete("/:id")
    async remove(@Param("id") id: number) {
        return await this.userRepo.delete(id);
    }
}
