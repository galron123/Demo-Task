import {
  Controller,
  Get,
  Headers,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiHeaders,
} from '@nestjs/swagger';
import {stats} from './stat.service';


@ApiTags('stat')
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
@Controller('stat')
export class StatController {
  constructor(
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success: Returns stats' })
  stats(@Headers('x-reality-id') realityID = '0') {
    return stats();
  }
}
