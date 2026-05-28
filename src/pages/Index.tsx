import { useState } from 'react'
import { MapPin, Square, Target, Zap, TrendingUp, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

export default function Index() {
  const [bairro, setBairro] = useState('')
  const [area, setArea] = useState('')
  const [quartos, setQuartos] = useState('')
  const [vagas, setVagas] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const [precoSugerido, setPrecoSugerido] = useState<number | null>(null)

const handleCalculate = async () => {
  setIsLoading(true)
  const vagasNum = vagas === '2+' ? 2 : Number(vagas)
  const quartosNum = quartos === '3+' ? 3 : Number(quartos)
  
  const response = await fetch(
    `https://api-imoveis-prpm.onrender.com/calcular?bairro=${bairro}&area=${area}&quartos=${quartosNum}&vagas=${vagasNum}`
  )
  const data = await response.json()
  setPrecoSugerido(data.preco_sugerido)
  setIsLoading(false)
  setShowResult(true)
}

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden min-h-[700px] flex items-center justify-center -mt-20 pt-20">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-10" />
          <img
            src="https://img.usecurling.com/p/1920/1080?q=bright%20living%20room"
            alt="Living Room Background"
            className="w-full h-full object-cover opacity-100"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 py-20 flex flex-col items-center justify-center max-w-7xl">
          <div className="text-center max-w-3xl mb-12 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-primary leading-[1.1]">
              Avalie seu imóvel com <br className="hidden sm:inline" />
              inteligência de dados
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/90 font-medium max-w-2xl mx-auto">
              Use nossa tecnologia para descobrir o valor de mercado atual de forma precisa e
              gratuita.
            </p>
          </div>

          <Card
            className="w-full p-6 md:p-8 shadow-elevation border border-white/40 rounded-2xl bg-white/95 backdrop-blur-md animate-slide-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
                <div className="lg:col-span-5 space-y-3">
                  <Label htmlFor="bairro" className="text-sm font-medium text-foreground">
                    Bairro
                  </Label>
                  <div className="relative group">
                    <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10 pointer-events-none" />
                    <Select value={bairro} onValueChange={setBairro}>
                      <SelectTrigger
                        id="bairro"
                        className="pl-11 h-12 text-base rounded-xl transition-all border-muted-foreground/20 focus:ring-primary focus:border-primary data-[state=open]:ring-primary data-[state=open]:border-primary"
                      >
                        <SelectValue placeholder="Selecione o bairro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Centro">Centro</SelectItem>
                        <SelectItem value="Batel">Batel</SelectItem>
                        <SelectItem value="Agua Verde">Agua Verde</SelectItem>
                        <SelectItem value="Novo Mundo">Novo Mundo</SelectItem>
                        <SelectItem value="Pinheirinho">Pinheirinho</SelectItem>
                        <SelectItem value="Cajuru">Cajuru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-3">
                  <Label htmlFor="area" className="text-sm font-medium text-foreground">
                    Área (m²)
                  </Label>
                  <div className="relative group">
                    <Square className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="area"
                      type="number"
                      className="pl-11 h-12 text-base rounded-xl transition-all border-muted-foreground/20 focus-visible:ring-primary focus-visible:border-primary"
                      placeholder="Área total"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-3">
                  <Label className="text-sm font-medium text-foreground">Quartos</Label>
                  <ToggleGroup
                    type="single"
                    value={quartos}
                    onValueChange={setQuartos}
                    className="justify-start gap-2"
                  >
                    {['1', '2', '3+'].map((q) => (
                      <ToggleGroupItem
                        key={`q-${q}`}
                        value={q}
                        variant="outline"
                        className="h-12 w-12 rounded-xl text-base font-medium border-muted-foreground/20 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary transition-all hover:bg-muted"
                      >
                        {q}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                <div className="lg:col-span-2 space-y-3">
                  <Label className="text-sm font-medium text-foreground">Vagas</Label>
                  <ToggleGroup
                    type="single"
                    value={vagas}
                    onValueChange={setVagas}
                    className="justify-start gap-2"
                  >
                    {['0', '1', '2+'].map((v) => (
                      <ToggleGroupItem
                        key={`v-${v}`}
                        value={v}
                        variant="outline"
                        className="h-12 w-12 rounded-xl text-base font-medium border-muted-foreground/20 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary transition-all hover:bg-muted"
                      >
                        {v}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  size="lg"
                  className="w-full lg:w-auto min-w-[320px] h-14 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  onClick={handleCalculate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Processando dados...
                    </>
                  ) : (
                    'Calcular Valor Agora'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-background relative z-20" id="como-funciona">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Por que a Valora?</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/5">
                <Target className="h-10 w-10 text-primary transition-transform duration-500 group-hover:-rotate-12" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Precisão</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Nossos algoritmos comparam milhares de anúncios e transações reais para entregar o
                valor mais próximo da realidade.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/5">
                <Zap className="h-10 w-10 text-primary transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Velocidade</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Esqueça laudos que demoram dias. Receba sua estimativa de mercado em menos de 10
                segundos, de forma digital.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/5">
                <TrendingUp className="h-10 w-10 text-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Análise de Dados</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Não apenas um preço, mas uma visão completa das tendências do bairro e liquidez da
                região.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Result Modal */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-[24px] border-0 shadow-2xl">
          <div className="p-8 md:p-10 text-center bg-gradient-to-b from-slate-50 to-white">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-bold text-center text-primary">
                Valor Estimado
              </DialogTitle>
              <DialogDescription className="text-center text-base mt-3 text-muted-foreground leading-relaxed">
                Com base nas características informadas, este é o valor de mercado atual em{' '}
                {bairro ? (
                  <strong className="text-foreground">{bairro}</strong>
                ) : (
                  <strong className="text-foreground">sua região</strong>
                )}
                .
              </DialogDescription>
            </DialogHeader>

            <div className="py-10 bg-white rounded-2xl shadow-subtle border border-slate-100 mb-8 transform transition-transform hover:scale-[1.01] duration-300">
              <div className="flex items-center justify-center flex-wrap gap-2 text-4xl md:text-5xl font-bold tracking-tight text-primary">
                <span className="text-2xl md:text-3xl font-medium text-muted-foreground">R$</span>
                <span>{precoSugerido?.toLocaleString('pt-BR')}</span>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <p className="text-sm text-muted-foreground font-medium">
                  Preço médio estimado: R$ 10.500/m²
                </p>
              </div>
            </div>

            <DialogFooter className="sm:justify-center w-full">
              <Button
                size="lg"
                className="w-full text-base font-semibold h-14 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Baixar Relatório Completo
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
