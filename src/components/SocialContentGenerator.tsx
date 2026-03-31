import { useState, useRef } from "react"
import { Camera, Copy, Check, Loader2, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const API_URL = import.meta.env.VITE_API_URL ?? 'https://casa-gold-backend-production.up.railway.app'

interface SocialContent {
  instagram: { caption: string; hook: string; hashtags: string[] }
  tiktok:    { caption: string; hook: string; hashtags: string[] }
  facebook:  { caption: string; hook: string; hashtags: string[] }
  whatsapp:  { message: string }
}

interface Analysis {
  style: string; type: string; karat: string
  estimatedWeightGrams: number; estimatedPriceMad: number; description: string
}

export default function SocialContentGenerator() {
  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [social, setSocial] = useState<SocialContent | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setAnalysis(null)
    setSocial(null)
  }

  const generate = async () => {
    if (!fileRef.current?.files?.[0]) return
    setLoading(true)
    try {
      const token = localStorage.getItem('supabase_token') ?? ''
      const form = new FormData()
      form.append('image', fileRef.current.files[0])

      const res = await fetch(`${API_URL}/api/social/generate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setAnalysis(data.analysis)
      setSocial(data.social)
    } catch (err) {
      toast({ title: "Erreur", description: (err as Error).message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
    toast({ title: "Copié !" })
  }

  const shareWhatsApp = (msg: string) =>
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')

  // Partage natif mobile (ouvre Instagram, TikTok, WhatsApp... selon l'app installée)
  const nativeShare = async (platform: string) => {
    if (!fileRef.current?.files?.[0] || !social) return
    const s = social[platform as keyof typeof social] as { caption: string; hook: string; hashtags: string[] }
    const text = `${s.hook}\n\n${s.caption}\n\n${s.hashtags.map(h=>`#${h.replace('#','')}`).join(' ')}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Bijou ${analysis?.type ?? ''} ${analysis?.karat ?? ''}`,
          text,
          files: [fileRef.current.files[0]],
        })
      } else {
        copy(text, `${platform}-share`)
        toast({ title: "Copié !", description: "Collez dans votre app préférée" })
      }
    } catch (_) {}
  }

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <Button size="sm" variant="outline" onClick={() => copy(text, id)} className="shrink-0">
      {copied === id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </Button>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          <Camera className="w-5 h-5" />
          Créer mon post bijou
        </CardTitle>
        <p className="text-sm text-muted-foreground">3 étapes simples → texte prêt pour Instagram, TikTok, WhatsApp</p>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Étape 1 */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">① Prends une photo de ton bijou</p>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-amber-400 transition-colors bg-muted/30"
          >
            {preview ? (
              <img src={preview} alt="bijou" className="max-h-52 mx-auto rounded-lg object-cover" />
            ) : (
              <div className="space-y-3">
                <Camera className="w-12 h-12 mx-auto text-amber-500" />
                <p className="text-base font-medium text-foreground">Appuyer ici pour prendre une photo</p>
                <p className="text-xs text-muted-foreground">ou choisir depuis la galerie</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhoto} />
        </div>

        {/* Étape 2 */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">② L'IA analyse et crée le texte</p>
          <Button
            onClick={generate}
            disabled={!preview || loading}
            className="w-full gold-gradient text-primary-foreground text-base py-6"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyse en cours (15-30s)...</>
            ) : (
              "✨ Générer automatiquement"
            )}
          </Button>
        </div>

        {/* Analyse bijou */}
        {analysis && (
          <div className="bg-muted rounded-lg p-3 flex flex-wrap gap-2 text-sm">
            <Badge variant="outline">{analysis.type}</Badge>
            <Badge variant="outline">{analysis.style}</Badge>
            <Badge variant="outline">{analysis.karat}</Badge>
            <Badge className="gold-gradient text-primary-foreground">{analysis.estimatedPriceMad} MAD</Badge>
          </div>
        )}

        {/* Contenu social */}
        {social && (
          <Tabs defaultValue="instagram">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            </TabsList>

            {(['instagram', 'tiktok', 'facebook'] as const).map((platform) => (
              <TabsContent key={platform} value={platform} className="space-y-3">
                {/* Hook */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Hook</p>
                  <div className="flex gap-2 items-start">
                    <p className="text-sm font-medium flex-1 bg-muted p-2 rounded">{social[platform].hook}</p>
                    <CopyBtn text={social[platform].hook} id={`${platform}-hook`} />
                  </div>
                </div>
                {/* Caption */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Légende</p>
                  <div className="flex gap-2 items-start">
                    <p className="text-sm flex-1 bg-muted p-2 rounded whitespace-pre-wrap">{social[platform].caption}</p>
                    <CopyBtn text={social[platform].caption} id={`${platform}-caption`} />
                  </div>
                </div>
                {/* Hashtags */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Hashtags</p>
                  <div className="flex gap-2 items-start">
                    <p className="text-sm flex-1 bg-muted p-2 rounded text-blue-600 break-all">
                      {social[platform].hashtags.map(h => `#${h.replace('#','')}`).join(' ')}
                    </p>
                    <CopyBtn text={social[platform].hashtags.map(h => `#${h.replace('#','')}`).join(' ')} id={`${platform}-tags`} />
                  </div>
                </div>
                {/* Tout copier */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => copy(
                      `${social[platform].hook}\n\n${social[platform].caption}\n\n${social[platform].hashtags.map(h=>`#${h.replace('#','')}`).join(' ')}`,
                      `${platform}-all`
                    )}
                    variant="outline" className="flex-1"
                  >
                    {copied === `${platform}-all` ? '✅ Copié !' : '📋 Tout copier'}
                  </Button>
                  <Button
                    onClick={() => nativeShare(platform)}
                    className="flex-1 gold-gradient text-primary-foreground"
                  >
                    🚀 Partager
                  </Button>
                </div>
              </TabsContent>
            ))}

            <TabsContent value="whatsapp" className="space-y-3">
              <div className="flex gap-2 items-start">
                <p className="text-sm flex-1 bg-muted p-2 rounded whitespace-pre-wrap">{social.whatsapp.message}</p>
                <CopyBtn text={social.whatsapp.message} id="whatsapp-msg" />
              </div>
              <Button
                onClick={() => shareWhatsApp(social.whatsapp.message)}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Partager sur WhatsApp
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
