import { ApiProperty } from '@nestjs/swagger';

export class DeleteDto {
  @ApiProperty({ description: "File's id" })
  id: string[];
}
