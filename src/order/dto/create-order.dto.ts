import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  mood: string;

  @IsString()
  @IsOptional()
  sugar: string;

  @IsString()
  @IsOptional()
  ice: string;

  @IsArray()
  @IsOptional()
  topping: string[];

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  product: string;
}

class CreateShippingAddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  endAddress: string;

  @IsString()
  @IsNotEmpty()
  ward: string;

  @IsString()
  @IsOptional()
  distance: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  delivery: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsArray()
  @IsNotEmpty()
  orderItems: CreateOrderItemDto[];

  @IsObject()
  @IsNotEmpty()
  shippingAddress: CreateShippingAddressDto;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsNumber()
  @IsNotEmpty()
  taxPrice: number;

  @IsString()
  @IsOptional()
  invoiceCode: string;

  @IsNumber()
  @IsNotEmpty()
  shippingPrice: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsBoolean()
  @IsNotEmpty()
  isPaid: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isDelivered: boolean;
}