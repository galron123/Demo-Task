import {Controller, Get, Query} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { permutation } from './similar.service';

@ApiTags('similar')
@Controller('similar')
export class SimilarController {
  constructor() {}
  @Get()
  @ApiResponse({ status: 200, description: 'Success: Returns similar words' })
  @ApiResponse({ status: 400, description: 'Bad input' })
  @ApiResponse({ status: 404, description: 'There is no similar word' })
  permutation(
    @Query('word') word: string,
  ) {
    return permutation(word);
  }
}
