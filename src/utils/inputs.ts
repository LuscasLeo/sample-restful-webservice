import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

type ObjectType<T> =
    | {
          new (): T;
      }
    | Function;

export class IndexInput<T> {
    @IsOptional()
    @IsNumber()
    public offset: number;

    @IsOptional()
    @IsNumber()
    public limit: number;

    @IsOptional()
    @IsString()
    public sort: keyof T;

    @IsOptional()
    @IsString({})
    public order: "ASC" | "DESC";
}
