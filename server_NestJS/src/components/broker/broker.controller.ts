import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { Broker } from '../../models/broker';

@Controller('brokers')
export class BrokersController {
    constructor(private readonly brokerService: BrokerService) {}

    @Get()
    getBrokers(): Broker[] {
        console.log('GET /brokers');
        return this.brokerService.getAllBrokers();
    }

    @Get('id/:id')
    getBrokerById(@Param('id') id: number): Broker {
        console.log(`GET /brokers/id/${id}`);
        return this.brokerService.getBrokerById(id);
    }

    @Get('name/:name')
    getBrokerByName(@Param('name') name: string): Broker {
        console.log(`GET /brokers/name/${name}`);
        return this.brokerService.getBrokerByName(name);
    }

    @Put()
    addBroker(@Body('broker') broker: Broker): void {
        console.log('PUT /brokers broker=', broker);
        this.brokerService.putBroker(broker);
    }

    @Patch('set_name')
    setBrokerName(@Body('id') id: number, @Body('name') name: string): void {
        console.log(`PATCH /brokers/set_name id=${id}, name=${name}`);
        this.brokerService.setName(id, name);
    }

    @Delete(':id')
    deleteBroker(@Param('id') id: number): void {
        console.log(`DELETE /brokers/${id}`);
        this.brokerService.deleteBroker(id);
    }

    @Post('get_broker_stocks')
    getPersonalStocks(@Body('brokerId') brokerId: number, @Body('brokerStocks') brokerStocks: any): any {
        console.log(`POST /get_broker_stocks brokerId=${brokerId}, brokerStocks=${brokerStocks}`);
        return this.brokerService.getPersonalStocks(brokerId, brokerStocks);
    }

    @Post('deal')
    deal(@Body() body: any): any {
        return this.brokerService.deal(body);
    }
}
