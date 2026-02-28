import { supabase } from '@/lib/supabase'
import EmailSignup from '@/components/EmailSignup'
import LiveStocks from '@/components/LiveStocks'
import NewsSection from '@/components/NewsSection'
import StockPicks from '@/components/StockPicks'

async function getNews() {
    const { data: news } = await supabase.from('news_articles').select('*').order('published_at', { ascending: false }).limit(6)
    return news || []
}

async function getStockPicks() {
    const { data: picks } = await supabase.from('stock_picks').select('*').eq('status', 'ACTIVE').order('created_at', { ascending: false }).limit(5)
    return picks || []
}

function TickerCard({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
    return (
        <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-sm text-slate-500 mb-1">{label}</div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className={`text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>{change}</div>
        </div>
    )
}

export default async function Home() {
    const [news, picks] = await Promise.all([getNews(), getStockPicks()])

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
            </div>

            {/* Glass Header */}
            <header className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Pulse Markets AI
                        </span>
                    </div>
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">Markets</a>
                        <a href="#" className="hover:text-white transition-colors">News</a>
                        <a href="#" className="hover:text-white transition-colors">Picks</a>
                        <a href="#" className="hover:text-white transition-colors">Learn</a>
                    </nav>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                        Get Pro
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm text-slate-400">AI-Powered Market Intelligence</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Trade Smarter with{' '}
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            AI Insights
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Real-time stock analysis, AI-curated news, and expert picks. 
                        Join thousands of investors making data-driven decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
                            Start Free Trial
                        </button>
                        <button className="px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/5 transition-all">
                            View Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Market Ticker */}
            <section className="relative z-10 py-8 border-y border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <TickerCard label="S&P 500" value="4,783.45" change="+1.24%" positive={true} />
                        <TickerCard label="NASDAQ" value="15,123.67" change="+0.87%" positive={true} />
                        <TickerCard label="DOW JONES" value="37,545.20" change="-0.32%" positive={false} />
                        <TickerCard label="NIFTY 50" value="21,456.30" change="+0.45%" positive={true} />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative z-10 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                                <LiveStocks />
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                                <StockPicks picks={picks} />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                                <NewsSection articles={news} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <EmailSignup />
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 py-12 px-4 bg-black/20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <span className="font-bold">Pulse Markets AI</span>
                    </div>
                    <p className="text-slate-500 text-sm">© 2024 Pulse Markets AI. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>
                </div>
            </footer>
        </main>
    )
}