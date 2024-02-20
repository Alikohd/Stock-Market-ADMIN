import {Module} from '@nestjs/common';
import {BrokersController} from "./components/broker/broker.controller";
import {BrokerService} from "./components/broker/broker.service";
import {StockController} from "./components/stock/stock.controller";
import {StockService} from "./components/stock/stock.service";
import {WebsocketController} from "./components/websocket/websocket.controller";

@Module({
    imports: [],
    controllers: [BrokersController, StockController],
    providers: [BrokerService, StockService, WebsocketController]
})
export class AppModule {
}
