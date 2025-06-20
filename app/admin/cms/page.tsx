"use client"

import { useState, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Upload } from "lucide-react"
import { LanguageContext } from "../layout"

export default function CMSPage() {
  const [heroData, setHeroData] = useState({
    title: "Fresh finds for every occasion",
    subtitle:
      "Explore our latest arrivals, curated to bring you style, functionality, and inspiration. Shop now and discover your next favorite.",
    buttonText: "Shop Now",
    buttonColor: "#ffffff",
    heroImage: "",
  })

  const { lang } = useContext(LanguageContext)

  const translations = {
    en: {
      contentManagement: "Content Management",
      manageContent: "Manage your website content and appearance",
      heroSection: "Hero Section",
      heroTitle: "Hero Title",
      enterHeroTitle: "Enter hero title",
      heroSubtitle: "Hero Subtitle",
      enterHeroSubtitle: "Enter hero subtitle",
      buttonText: "Button Text",
      enterButtonText: "Enter button text",
      buttonColor: "Button Color",
      heroImage: "Hero Image",
      upload: "Upload",
      saveChanges: "Save Changes",
      preview: "Preview",
    },
    ar: {
      contentManagement: "إدارة المحتوى",
      manageContent: "إدارة محتوى ومظهر موقعك",
      heroSection: "قسم البطل",
      heroTitle: "عنوان البطل",
      enterHeroTitle: "أدخل عنوان البطل",
      heroSubtitle: "وصف البطل",
      enterHeroSubtitle: "أدخل وصف البطل",
      buttonText: "نص الزر",
      enterButtonText: "أدخل نص الزر",
      buttonColor: "لون الزر",
      heroImage: "صورة البطل",
      upload: "رفع",
      saveChanges: "حفظ التغييرات",
      preview: "معاينة",
    },
    fr: {
      contentManagement: "Gestion du contenu",
      manageContent: "Gérez le contenu et l'apparence de votre site web",
      heroSection: "Section Héros",
      heroTitle: "Titre du héros",
      enterHeroTitle: "Entrez le titre du héros",
      heroSubtitle: "Sous-titre du héros",
      enterHeroSubtitle: "Entrez le sous-titre du héros",
      buttonText: "Texte du bouton",
      enterButtonText: "Entrez le texte du bouton",
      buttonColor: "Couleur du bouton",
      heroImage: "Image du héros",
      upload: "Télécharger",
      saveChanges: "Enregistrer les modifications",
      preview: "Aperçu",
    },
  } as const
  type Lang = keyof typeof translations
  const t = translations[lang as Lang] || translations.en

  const handleSave = () => {
    // Save hero section data
    console.log("Saving hero data:", heroData)
  }

  return (
    <div className="space-y-6 bg-white text-black">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-clash">{t.contentManagement}</h1>
        <p className="mt-2 text-gray-600 font-inter">{t.manageContent}</p>
      </div>

      {/* Hero Section Editor */}
      <Card className="bg-white text-black">
        <CardHeader>
          <CardTitle>{t.heroSection}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hero-title">{t.heroTitle}</Label>
            <Input
              id="hero-title"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              placeholder={t.enterHeroTitle}
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-subtitle">{t.heroSubtitle}</Label>
            <Textarea
              id="hero-subtitle"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
              placeholder={t.enterHeroSubtitle}
              rows={3}
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="button-text">{t.buttonText}</Label>
              <Input
                id="button-text"
                value={heroData.buttonText}
                onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                placeholder={t.enterButtonText}
                className="bg-white text-black border-gray-300 focus:ring-green-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="button-color">{t.buttonColor}</Label>
              <div className="flex space-x-2">
                <Input
                  id="button-color"
                  type="color"
                  value={heroData.buttonColor}
                  onChange={(e) => setHeroData({ ...heroData, buttonColor: e.target.value })}
                  className="w-16 h-10 bg-white border-gray-300"
                />
                <Input
                  value={heroData.buttonColor}
                  onChange={(e) => setHeroData({ ...heroData, buttonColor: e.target.value })}
                  placeholder="#ffffff"
                  className="flex-1 bg-white text-black border-gray-300 focus:ring-green-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-image">{t.heroImage}</Label>
            <div className="flex items-center space-x-2">
              <Input id="hero-image" type="file" accept="image/*" className="flex-1 bg-white text-black border-gray-300" />
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Upload className="mr-2 h-4 w-4" />
                {t.upload}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="mr-2 h-4 w-4" />
              {t.saveChanges}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-white text-black">
        <CardHeader>
          <CardTitle>{t.preview}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-black mb-4 font-clash">{heroData.title}</h1>
              <p className="text-gray-700 mb-6 font-inter">{heroData.subtitle}</p>
              <button
                style={{ backgroundColor: heroData.buttonColor }}
                className="px-6 py-3 rounded-full font-medium text-black"
              >
                {heroData.buttonText}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
