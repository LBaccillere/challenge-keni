import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { ProductsService } from 'src/products/core/products.service';
import { ProductResponse, mapToResponse } from './responses/product.response';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ProductsResponse,
  mapToResponse as mapToPaginatedResponse,
} from './responses/products.response';
import { AUTH_ERRORS, HTTP_ERROR_CODES } from 'src/utils/constants/error';
import { ApiError } from 'src/utils/types/apiError';
import { CreateProductDto } from './requests/createProduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/core/files.service';
import useConfigurator from 'src/config';

const { UPLOADS_PATH_DOMAIN } = useConfigurator();

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly fileService: FilesService,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async create(@Body() productDto: CreateProductDto): Promise<ProductResponse> {
    return mapToResponse(await this.productsService.create(productDto));
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async findAll(): Promise<ProductsResponse> {
    return mapToPaginatedResponse(await this.productsService.findAll());
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':uuid')
  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiUnauthorizedResponse({
    description: AUTH_ERRORS.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  async findOne(@Param('uuid') uuid: UUID): Promise<ProductResponse> {
    const product = await this.productsService.findOne(uuid);

    if (!product) {
      throw new ApiError(HTTP_ERROR_CODES.NOT_FOUND, 'Product not found');
    }

    return mapToResponse(await this.productsService.findOne(uuid));
  }

  @Post(':productUUID/images/cover/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadCover(
    @Param('productUUID') productUUID: UUID,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!productUUID)
      throw new ApiError(
        HTTP_ERROR_CODES.BAD_REQUEST,
        'Product UUID is required',
      );

    if (!file)
      throw new ApiError(HTTP_ERROR_CODES.BAD_REQUEST, 'Unattached file');

    const imagePath = `products/${productUUID}/images`;
    const fileName = 'cover';

    await this.fileService.uploadFile([file], imagePath, fileName);

    const path = `${UPLOADS_PATH_DOMAIN}/${imagePath}/${fileName}.png`;

    await this.productsService.assignCover(productUUID, path);

    return;
  }

  @Get(':productUUID/images/cover')
  @ApiExcludeEndpoint()
  async getCover(@Param('productUUID') productUUID: UUID) {
    const path = `uploads/products/${productUUID}/images/cover.png`;
    const image = await this.fileService.getImage(path);

    return new Response(image, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': image.length.toString(),
      },
    });
  }
}
