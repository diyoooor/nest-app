import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'example@email.com',
       
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(32)
    password: string;
}