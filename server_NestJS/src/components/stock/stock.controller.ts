import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get()
    async getStocks(): Promise<any> {
        return await this.stockService.getStockList();
    }

    @Get('/:stockId')
    async getStockInfo(@Param('stockId') stockId: string): Promise<any> {
        try {
            return await this.stockService.getStockInfo(stockId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`Stock with ID '${stockId}' not found`);
            }
            throw error;
        }
    }
}
