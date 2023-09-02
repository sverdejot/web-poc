import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserRequest {
  @ApiProperty({
    description: 'The full name of the user',
    type: String,
    examples: [
      'Samuel Verdejo de Toro',
      'Julio Daniel José Sarmiento AKA el Venezolanito Machetero',
    ],
  })
  name: string;

  @ApiProperty({
    description: "User's Email (would be use as login username)",
    type: String,
    examples: ['samuel.verdejo@apexfs.group', 'julio.sarmiento@apexfs.group'],
  })
  mail: string;

  @ApiProperty({
    description:
      "User's status (active or unactive) which declares whether an user is able to log in or not",
    type: Boolean,
  })
  status: boolean;
}
