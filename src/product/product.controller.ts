import { Controller, Get, Post, Body, Patch, Delete, Res, Query, Param, HttpException, Put, HttpStatus, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseHandler } from 'src/response';
import { productId } from './interface/getProduct.interface';
import { Product } from './schema/product.schema';
import { Topping } from 'src/topping/schemas/topping.schema';
import { Private } from 'src/common/decorators/private.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly response: ResponseHandler) { }
  @Get('/')
  async findAll(@Res() res: Response, @Query('keyword') keyword?: string): Promise<Response> {
    try {
      const key = keyword
        ? {
          $or: [
            {
              name: {
                $regex: keyword,
                $options: "i",
              },
            },
            {
              normalizedName: {
                $regex: keyword,
                $options: "i",
              },
            },
            {
              englishName: {
                $regex: keyword,
                $options: "i",
              },
            },
          ],
        }
        : {};
      const allProduct: Product[] = await this.productService.getListProduct(key);

      return this.response.responseWithData(res, 200, allProduct)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message);
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }

  }
  @Get('/topping')
  async findTopping(@Res() res: Response, @Query('keyword') keyword?: string): Promise<Response> {
    try {
      const key = keyword ? {
        name: {
          $regex: keyword,
          $options: 'i'
        }
      } : {}
      const toppings: Topping[] = await this.productService.getToppings(key);

      return this.response.responseWithData(res, 200, toppings)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message);
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: productId): Promise<Response> {
    try {
      const product: Product = await this.productService.findProductDetail(id);
      return this.response.responseWithData(res, 200, product)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message);
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }

  }
  @Private()
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response, @Req() req: Request & { user: { _id: string } }): Promise<Response> {
    try {
      const userId = req.user._id;
      const product = await this.productService.createProduct(createProductDto, userId);
      console.log(product)
      return this.response.created(res, product)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message);
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }

  }
  @Private()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response): Promise<Response> {
    try {
      const productAfterPut = this.productService.updateProduct(id, updateProductDto)
      return this.response.responseWithData(res, 200, productAfterPut)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message);
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
  @Private()
  @Delete(':id')
  remove(@Param('id') id: productId, @Res() res: Response): Promise<Response> {
    try {
      const delProduct = this.productService.deleteProduct(id);
      return this.response.ok(res, delProduct)
    } catch (error) {
      if (error instanceof HttpException) {
        this.response.error(res, error.getStatus(), error.message);
      } else {
        this.response.error(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
}
