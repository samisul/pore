import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtPayload } from 'src/core/auth.model';
import { LoggedInGuard } from 'src/core/guards/logged-in.guard';
import { Roles } from 'src/core/guards/roles.decorator';
import { SourcePreviewDto, UpsertSourceDto } from './source.dto';
import { SourceService } from './source.service';
import { FilterDto, List } from '../model';

@Roles('admin', 'user')
@UseGuards(LoggedInGuard)
@Controller('sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Get()
  async findAll(
    @Req() req: Express.Request & { user: JwtPayload },
    @Query('filter') filter: string,
  ): Promise<List<SourcePreviewDto>> {
    const _parsedFilter = JSON.parse(filter) as FilterDto;
    const _page = _parsedFilter.page ? _parsedFilter.page : 0;
    return await this.sourceService.findAll(req.user.sub, _page);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Express.Request & { user: JwtPayload },
  ): Promise<SourcePreviewDto> {
    return await this.sourceService.findOne(id, req.user.sub);
  }

  @Post()
  async create(
    @Req() req: Express.Request & { user: JwtPayload },
    @Body() body: UpsertSourceDto,
  ): Promise<void> {
    await this.sourceService.create(body, req.user.sub);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Req() req: Express.Request & { user: JwtPayload },
    @Body() body: UpsertSourceDto,
  ): Promise<void> {
    await this.sourceService.update(id, body, req.user.sub);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Express.Request & { user: JwtPayload },
  ): Promise<void> {
    await this.sourceService.remove(id, req.user.sub);
  }
}
