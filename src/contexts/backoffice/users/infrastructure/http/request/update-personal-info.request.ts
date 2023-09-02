import { ApiProperty } from '@nestjs/swagger';

export default class UpdatePersonalInfoRequest {
  @ApiProperty({
    description: "New user's full name",
  })
  name?: string;

  @ApiProperty({
    description: "New use's email and login username",
  })
  mail?: string;
}
