import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

import { Broker } from '../../models/broker';

@Injectable()
export class BrokerService {
    private brokers: Broker[] = [];
    private lastId: number;
    private readonly brokersFilePath = './data/brokers.json';
    private readonly brokersStocksFilePath = './data/brokers_stocks.json';

    constructor() {
        this.readFromFile();
        this.findLastId();
    }

    private findLastId(): void {
        this.lastId = Math.max(...this.brokers.map(broker => broker.id), -1);
    }

    private getNewLastId(): number {
        this.lastId++;
        return this.lastId;
    }

    private readFromFile(): void {
        this.brokers = JSON.parse(fs.readFileSync(this.brokersFilePath, 'utf-8'));
    }

    private writeToFile(): void {
        fs.writeFileSync(this.brokersFilePath, JSON.stringify(this.brokers, null, 2));
    }

    getAllBrokers(): Broker[] {
        this.readFromFile();
        return this.brokers;
    }

    getBrokerById(id: number): Broker | null {
        this.readFromFile();
        id = Number(id);
        return this.brokers.find(broker => broker.id === id) || null;
    }

    getBrokerByName(name: string): Broker | null {
        this.readFromFile();
        return this.brokers.find(broker => broker.name === name) || null;
    }

    putBroker(putBroker: Broker): void {
        this.readFromFile();
        if (!putBroker.id) {
            putBroker.id = this.getNewLastId();
            this.brokers.push(putBroker);
        } else {
            this.brokers = this.brokers.map(broker =>
                broker.id === Number(putBroker.id) ? putBroker : broker
            );
        }
        this.writeToFile();
    }

    setName(id: number, name: string): void {
        const broker = this.getBrokerById(id);
        if (broker) {
            broker.name = name;
            this.writeToFile();
        }
    }

    deleteBroker(id: number): void {
        id = Number(id);
        this.readFromFile();
        this.brokers = this.brokers.filter(broker => broker.id !== id);
        this.writeToFile();
    }

    getPersonalStocks(brokerId: number, brokerStocks: any): any {
        const brokersStocksData = JSON.parse(fs.readFileSync(this.brokersStocksFilePath, 'utf-8'));

        for (const broker of brokersStocksData) {
            if (broker.id === brokerId) {
                const res = [];
                for (const brokerStock of brokerStocks) {
                    res.push(broker[brokerStock]);
                }
                console.log('res:', res);
                return { data: res };
            }
        }
        return null;
    }

    deal(body: any): any {
        const stockFile = JSON.parse(fs.readFileSync(this.brokersStocksFilePath, 'utf-8'));
        this.readFromFile();
        const brokerIndex = this.brokers.findIndex(broker => body.id === broker.id);

        if (brokerIndex === -1) {
            return { status: 'Broker was not found' };
        }

        const broker = this.brokers[brokerIndex];

        const stock = stockFile.find(stock => stock.id === body.id);

        if (!stock) {
            return { status: 'Stock was not found' };
        }

        if (body.sum > broker.balance) {
            return { status: 'not enough money' };
        }

        if (body.qty < 0 && Math.abs(body.qty) > stock[body.stock].qty) {
            return { status: 'not enough stocks' };
        }

        broker.balance -= body.sum;
        stock[body.stock].qty += body.qty;
        stock[body.stock].balance -= body.sum;

        fs.writeFileSync(this.brokersStocksFilePath, JSON.stringify(stockFile, null, 2));
        this.writeToFile();

        return {
            status: 'ok',
            balance: broker.balance.toFixed(2),
            qty: stock[body.stock].qty,
            stock_balance: stock[body.stock].balance.toFixed(2),
        };
    }
}
