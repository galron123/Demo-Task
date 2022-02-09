import { Controller, Get, Headers, Param } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiHeaders } from '@nestjs/swagger';
import { permutation } from './similar.service';

@ApiTags('similar')
@ApiHeaders([
  {
    name: 'x-reality-id',
    description: 'The id of he reality that is being queried',
    example: '0',
    required: false,
    schema: {
      default: '0',
    },
  },
])
@Controller('similar')
export class SimilarController {
  constructor() {}

  @Get(':word')
  @ApiResponse({ status: 200, description: 'Success: Returns similar words' })
  @ApiResponse({ status: 400, description: 'Bad input' })
  @ApiResponse({ status: 404, description: 'There is no similar word' })
  permutation(
    @Param('word') word: string,
    @Headers('x-reality-id') realityID = '0',
  ) {
    return permutation(word);
  }
}
