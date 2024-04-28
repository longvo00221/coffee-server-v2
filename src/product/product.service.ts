import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';

import { ProductRepository } from './product.repository';
import { Topping } from 'src/topping/schemas/topping.schema';
import { productId } from './interface/getProduct.interface';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  async createProduct(createProductDto: CreateProductDto, user?: string):Promise<Product> {
    try {
      const { name } = createProductDto;
      const productExist = await this.productRepository.findExistProduct(name)
      if (productExist) {
        throw new Error('Product already exist')
      } else {
        const product = this.productRepository.createNewProduct(createProductDto,user)
        
        return product
      }
    } catch (error) {
      if(error instanceof HttpException){
        throw error
      }else{
        throw new InternalServerErrorException(error.message)
      }
    }
  }

  async getListProduct(keyword): Promise<Product[]> {
    try {
      const productList: Product[] = await this.productRepository.getProduct(keyword);
      return productList
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException(error.message)
      }
    }

  }
  async getToppings(keyword): Promise<Topping[]> {
    try {
      const toppings: Topping[] = await this.productRepository.getToppings(keyword)
      return toppings
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException(error.message)
      }
    }

  }

  async findProductDetail(id: productId):Promise<Product> {
    try {
      const productDetail: Product = await this.productRepository.getProductById(id);
      return productDetail
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException(error.message)
      }
    }

  }
  async deleteProduct(id: productId) {
    try {
      const deleteProduct = await this.productRepository.deleteProduct(id);
      return deleteProduct
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException(error.message)
      }

    }
  }
  async updateProduct(id: string, updateProductDto: UpdateProductDto):Promise<Product> {
    try {
      const product = await this.productRepository.updateProduct(id,updateProductDto)
      return product
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new InternalServerErrorException(error.message)
      }
    }
  }


}
