

class App extends Component {
    

    constructor(){
        super()
        this.state={
            BtcApi: {
                dataBinance: {
                    symbol: '',
                    price: 0,
                },
                dataCoinbase: {
                    amount: 0,
                    base: 0
                },
                dataPricesBinance: null,
                dataPricesCoinbase: null,
            }
        }
        this.BtcApi = new BtcApi()
    }

    componentDidMount() {
        this.updatePrices(); // Вызываем метод обновления цен
        // this.consolingItemsBinance()
       
        // Запускаем интервал для обновления цен каждую секунду
       // this.interval = setInterval(this.updatePrices, 1000);

        this.interval = setInterval(() => {
            this.setState(prevState => ({
                BtcApi: {
                    ...prevState.BtcApi,
                    dataPricesBinance: null,
                    dataPricesCoinbase: null,
                }
            }))
            this.updatePrices();

        }, 100000)
      }
      
      componentWillUnmount() {
        clearInterval(this.interval); // При размонтировании компонента очищаем интервал
      }
      
      updatePrices = async () => {
        
        const[price, amount, dataPricesBinance, dataPricesCoinbase] = await Promise.all([
            
            this.BtcApi.fetcherBinance('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
            this.BtcApi.fetcherCoinbase('https://api.coinbase.com/v2/prices/BTC-USD/spot'),
            this.BtcApi.fetcherBinance('https://api.binance.com/api/v3/ticker/price'),
            this.BtcApi.fetcherCoinbase(`https://api.coinbase.com/v2/prices/USD/spot`)
            
        ])

        this.setState(prevState => ({
          BtcApi: {
            dataBinance: {
            symbol: price['symbol'],
            price: price['price'],
            },
            dataCoinbase: {
              amount,
              base: [amount],
            },
            dataPricesBinance: dataPricesBinance,
            dataPricesCoinbase: dataPricesCoinbase,
          },
        }));
      }

    render() {
        const { BtcApi } = this.state;
    
    //сортировку тут

    //console.log(BtcApi.dataBinance)

    //  let binSymbol = BtcApi.dataBinance.symbol
    //  let binPrice = BtcApi.dataBinance.price
    //  let coiPrice = BtcApi.dataCoinbase.amount
     //console.log(BtcApi.dataPricesBinance)
    const itemsBinance = <BinanceItems BtcApi={BtcApi} />; // Используем компонент BinanceItems вместо метода renderItemsBinance
    //const itemsCoinbase= this.renderItemsCoinbase((BtcApi.dataPricesCoinbase))
    const itemsCoinbase = <ItemsCoinbase BtcApi={BtcApi}/>
    //const itemsDif = this.renderItemsDif(BtcApi.dataPricesBinance, BtcApi.dataPricesCoinbase)
    // const consoling = this.consolingItemsBinance((BtcApi.dataPricesBinance))
    const itemsDif = <ItemsDif BtcApi={BtcApi}/>
    


     return (
        <div className="container">
            <Header/>
            <div className="cover text-center">
            {/* Название колонок над соответствующими столбцами */}
            <div className="row align-items-start">
                <div className="col">
                <b>BINANCE COIN</b>
                </div>
                
                <div className="col">
                <b>BINANCE COIN PRICE</b>
                </div>
                <div className="col">
                <b>COINBASE COIN</b>
                </div>
                <div className="col">
                <b>CoinBase COIN PRICE</b>
                </div>
                <div className="col">
                <b>% DIF.</b>
                </div>
                <div className="col">
                <b>PRICE DIFFERENCE Bi - Co</b>
                </div>
            </div>
            
            {/* Столбцы с данными */}
            <div className="row align-items-start">
                <div className="col">
                {/* Вывод данных из itemsBinance */}
                {itemsBinance}
                </div>
                <div className="col">
                {/* Вывод данных из itemsCoinbase */}
                {itemsCoinbase}
                </div>
                <div className="col">
                {/* Вывод данных из itemsCoinbase */}
                {itemsDif}
                {/* {consoling} */}
                </div>
            </div>
            </div>
        </div>
  );
    }
  
}

export default App;