import {
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Server} from 'socket.io';
import * as fs from 'fs'
import * as console from 'console'

@WebSocketGateway({cors: true})
export class WebsocketController implements OnGatewayConnection {
    interval: string | number | NodeJS.Timeout
    stocks_to_trade = []
    init_data = []
    stocks_file = JSON.parse(fs.readFileSync('./data/stocks.json', 'utf-8'))

    handleConnection(client: { emit: (arg0: string, arg1: { stocks?: any[]; data?: any[]; finish?: boolean; }) => void; }) {
        console.log('handleConnection()')
        if (this.stocks_to_trade.length)
            client.emit('message', {
                stocks: this.stocks_to_trade,
                data: this.init_data
            })
        else
            client.emit('message', {finish: true})
    }

    @WebSocketServer()
    server: Server;

    getStocks(stock_files: any) {
        const stocks = []
        for (let stock of stock_files) {
            stocks.push(JSON.parse(fs.readFileSync(`./data/stocks/${stock}.json`, 'utf-8')));
            this.init_data.push([])
        }
        return stocks
    }

    getDate(dateArr: any[]){
        const formattedDate = `${dateArr[3]}${dateArr[4]}.${dateArr[0]}${dateArr[1]}.${dateArr[6]}${dateArr[7]}${dateArr[8]}${dateArr[9]}`;
        return new Date(formattedDate);
    }

    getStartIndex(date_str: string | number | Date, stocks: any[]) {
        const date = new Date(date_str)
        console.log(date_str, date.toDateString())
        for (let i = stocks[0].length - 1; i >= 0; i--)
            if (date >= this.getDate(stocks[0][i].date))
                return i
    }

    getDateOpen(stocks: string | any[], index: string | number) {
        let body = []
        for (let i = 0; i < stocks.length; i++) {
            const cur = {
                date: stocks[i][index].date,
                open: stocks[i][index].open
            }
            body.push(cur)
            this.init_data[i].push(cur)
        }
        return body
    }

    setStocksInterval(interval: number, stocks: string | any[], index: number) {
        this.server.emit('message', this.getDateOpen(stocks, index))
        index++
        this.interval = setInterval(() => {
            this.server.emit('message', this.getDateOpen(stocks, index))
            index++
            if (index === stocks[0].length) {
                clearInterval(this.interval)
            }
        }, interval)
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody('stocks') stock_files: any,
                  @MessageBody('date') date: any,
                  @MessageBody('interval') interval: any,
                  @MessageBody('close') close: any) {
        console.log('stocks:', stock_files)
        console.log('date:', date)
        console.log('interval:', interval)
        console.log('close:', close)
        if (close) {
            this.server.emit('message', {finish: true})
            this.stocks_to_trade = []
            this.init_data = []
            clearInterval(this.interval)
            return
        }

        for (let stock_file of stock_files)
            for (let j = 0; j < this.stocks_file.length; j++)
                if (stock_file === this.stocks_file[j].id)
                    this.stocks_to_trade.push(this.stocks_file[j].id)

        console.log('this.stocks_to_trade', this.stocks_to_trade)

        const stocks = this.getStocks(stock_files)

        let index = this.getStartIndex(date, stocks)
        console.log('getStartIndex', index, stocks[0][index])

        this.setStocksInterval(interval, stocks, index)
    }
}