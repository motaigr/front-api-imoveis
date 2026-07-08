import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
          scrolled ? 'bg-white/80 backdrop-blur-md border-border shadow-sm' : 'bg-white/0',
        )}
      >
        <div className="container flex h-20 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <span className="text-2xl font-bold tracking-tight text-primary">Valora</span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-sm font-semibold border-b-2 border-primary pb-1 px-1">
              Início
            </Link>
            <Link
              to="#como-funciona"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1"
            >
              Como Funciona
            </Link>
            <Link
              to="#precos"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1"
            >
              Preços
            </Link>
            <Link
              to="#contato"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1"
            >
              Contato
            </Link>
          </nav>

          <div className="hidden md:flex">
            <Button
              size="lg"
              className="rounded-md px-8 font-semibold transition-transform hover:scale-[1.02]"
            >
              Entrar
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-12">
                <Link to="/" className="text-xl font-semibold border-b-2 border-primary w-fit pb-1">
                  Início
                </Link>
                <Link to="#como-funciona" className="text-xl font-medium text-muted-foreground">
                  Como Funciona
                </Link>
                <Link to="#precos" className="text-xl font-medium text-muted-foreground">
                  Preços
                </Link>
                <Link to="#contato" className="text-xl font-medium text-muted-foreground">
                  Contato
                </Link>
                <Button size="lg" className="mt-8 w-full font-semibold">
                  Entrar
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 py-12 px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary">Valora</span>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2026 Valora Real Estate Analytics.
              <br className="md:hidden" /> Todos os direitos reservados.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium text-muted-foreground">
            <Link
              to="#"
              className="hover:text-primary hover:underline underline-offset-4 transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              to="#"
              className="hover:text-primary hover:underline underline-offset-4 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              to="#"
              className="hover:text-primary hover:underline underline-offset-4 transition-colors"
            >
              Cookies
            </Link>
            <Link
              to="#"
              className="hover:text-primary hover:underline underline-offset-4 transition-colors"
            >
              Suporte
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
