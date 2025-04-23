
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RocketIcon } from "lucide-react"

export default function XTraderWeb() {
  const [price, setPrice] = useState("--")
  const [wallet, setWallet] = useState("--")
  const [adsVisible, setAdsVisible] = useState(true)
  const [lastSignal, setLastSignal] = useState("--")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDC")
        const data = await r.json()
        setPrice(parseFloat(data.price).toFixed(2))
      } catch (e) {
        setPrice("Errore")
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const total = 21.87 + 0.000057 * parseFloat(price || 0)
    setWallet(`BTC: 0.000057 | USDC: 21.87 | Totale ≈ ${total.toFixed(2)} USDC`)
  }, [price])

  useEffect(() => {
    const interval = setInterval(() => {
      setAdsVisible(true)
    }, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const closeAd = () => setAdsVisible(false)

  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen p-6">
      <div className="text-center">
        <img src="/logo_xtrader.png" alt="logo" className="w-32 mx-auto mb-4" />
        <h1 className="text-4xl font-bold">X TRADER AI</h1>
        <p className="text-cyan-400 text-lg italic">Web Dashboard</p>
      </div>

      <div className="grid gap-6 mt-8 max-w-xl mx-auto">
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">💰 Wallet</h2>
            <p>{wallet}</p>
            <h2 className="text-xl font-semibold">📈 Prezzo BTC</h2>
            <p>{price} USDC</p>
            <h2 className="text-xl font-semibold">📨 Ultimo Segnale</h2>
            <p>{lastSignal}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="grafico">
          <TabsList>
            <TabsTrigger value="grafico">Grafico</TabsTrigger>
            <TabsTrigger value="guida">Guida</TabsTrigger>
          </TabsList>
          <TabsContent value="grafico">
            <iframe
              className="w-full h-[300px] rounded-xl border"
              src="https://www.tradingview.com/embed-widget/mini-symbol-overview/?symbol=BINANCE:BTCUSDC&locale=it"
            ></iframe>
          </TabsContent>
          <TabsContent value="guida">
            <ScrollArea className="h-[300px]">
              <pre className="whitespace-pre-wrap text-sm text-left p-2">
{`✅ CREA UN ACCOUNT BINANCE
- Registrati su binance.com
- Crea API Key
- Avvia X_Trader

🚀 Trading AI ogni 5 minuti
📩 Ricevi segnali in automatico
📉 Grafico live BTC
`}
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {adsVisible && (
          <div className="bg-black border border-white p-4 rounded-xl text-center relative">
            <p className="text-lg mb-2">🔥 Offerta esclusiva Crypto! 🔥</p>
            <iframe
              src="https://adsjumbo.com/ad.html?id=123456"
              className="w-full h-[120px] border rounded"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
            <Button onClick={closeAd} className="absolute top-2 right-2" variant="destructive">
              Chiudi Ad
            </Button>
          </div>
        )}

        <Button variant="secondary" className="w-full" onClick={() => window.location.reload()}>
          <RocketIcon className="mr-2" /> Aggiorna Dashboard
        </Button>
      </div>
    </div>
  )
}
