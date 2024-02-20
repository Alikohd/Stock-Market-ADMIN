import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class StockService {
    private readonly stocksFilePath = "./data/stocks.json";

    getStockList(): any {
        return this.readFileContent(this.stocksFilePath);
    }

    getStockInfo(stockId: string): any {
        const stockFilePath = `./data/stocks/${stockId}.json`;

        if (!this.fileExists(stockFilePath)) {
            throw new NotFoundException(`Stock with ID '${stockId}' not found`);
        }

        return this.readFileContent(stockFilePath);
    }

    private readFileContent(filePath: string): any {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            throw new Error(`Error reading file at path '${filePath}': ${error.message}`);
        }
    }

    private fileExists(filePath: string): boolean {
        try {
            fs.accessSync(filePath, fs.constants.F_OK);
            return true;
        } catch (error) {
            return false;
        }
    }
}
