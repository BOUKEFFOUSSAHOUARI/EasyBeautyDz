"use client"

import { useState, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, ExternalLink, CheckCircle, XCircle } from "lucide-react"
import { LanguageContext } from "@/components/LanguageProvider"

const t = (key: string, lang: string) => {
  const translations: any = {
    en: {
      'Integrations': 'Integrations',
      'Connect your store with external services': 'Connect your store with external services',
      'Google Sheets': 'Google Sheets',
      'Connected': 'Connected',
      'Disconnected': 'Disconnected',
      'Export orders and data to Google Sheets': 'Export orders and data to Google Sheets',
      'API Key': 'API Key',
      'Enter Google Sheets API key': 'Enter Google Sheets API key',
      'Sheet ID': 'Sheet ID',
      'Enter Google Sheet ID': 'Enter Google Sheet ID',
      'Test Connection': 'Test Connection',
      'View Documentation': 'View Documentation',
      'Google Analytics': 'Google Analytics',
      'Track website analytics and user behavior': 'Track website analytics and user behavior',
      'Tracking ID': 'Tracking ID',
      'Facebook Pixel': 'Facebook Pixel',
      'Track conversions and optimize Facebook ads': 'Track conversions and optimize Facebook ads',
      'Pixel ID': 'Pixel ID',
      'Enter Facebook Pixel ID': 'Enter Facebook Pixel ID',
      'Save All Integrations': 'Save All Integrations',
    },
    fr: {
      'Integrations': 'Intégrations',
      'Connect your store with external services': 'Connectez votre boutique à des services externes',
      'Google Sheets': 'Google Sheets',
      'Connected': 'Connecté',
      'Disconnected': 'Déconnecté',
      'Export orders and data to Google Sheets': 'Exporter les commandes et données vers Google Sheets',
      'API Key': 'Clé API',
      'Enter Google Sheets API key': 'Entrez la clé API Google Sheets',
      'Sheet ID': 'ID de la feuille',
      'Enter Google Sheet ID': 'Entrez l\'ID de la feuille Google',
      'Test Connection': 'Tester la connexion',
      'View Documentation': 'Voir la documentation',
      'Google Analytics': 'Google Analytics',
      'Track website analytics and user behavior': 'Suivez les analyses et le comportement des utilisateurs',
      'Tracking ID': 'ID de suivi',
      'Facebook Pixel': 'Pixel Facebook',
      'Track conversions and optimize Facebook ads': 'Suivez les conversions et optimisez les publicités Facebook',
      'Pixel ID': 'ID du pixel',
      'Enter Facebook Pixel ID': 'Entrez l\'ID du pixel Facebook',
      'Save All Integrations': 'Enregistrer toutes les intégrations',
    },
    ar: {
      'Integrations': 'التكاملات',
      'Connect your store with external services': 'اربط متجرك بالخدمات الخارجية',
      'Google Sheets': 'جوجل شيتس',
      'Connected': 'متصل',
      'Disconnected': 'غير متصل',
      'Export orders and data to Google Sheets': 'تصدير الطلبات والبيانات إلى جوجل شيتس',
      'API Key': 'مفتاح API',
      'Enter Google Sheets API key': 'أدخل مفتاح جوجل شيتس API',
      'Sheet ID': 'معرف الورقة',
      'Enter Google Sheet ID': 'أدخل معرف جوجل شيتس',
      'Test Connection': 'اختبار الاتصال',
      'View Documentation': 'عرض التوثيق',
      'Google Analytics': 'تحليلات جوجل',
      'Track website analytics and user behavior': 'تتبع تحليلات الموقع وسلوك المستخدم',
      'Tracking ID': 'معرف التتبع',
      'Facebook Pixel': 'فيسبوك بيكسل',
      'Track conversions and optimize Facebook ads': 'تتبع التحويلات وتحسين إعلانات فيسبوك',
      'Pixel ID': 'معرف البيكسل',
      'Enter Facebook Pixel ID': 'أدخل معرف فيسبوك بيكسل',
      'Save All Integrations': 'حفظ جميع التكاملات',
    },
  };
  return translations[lang]?.[key] || key;
};

export default function IntegrationsPage() {
  const { lang } = useContext(LanguageContext);
  const [integrations, setIntegrations] = useState({
    googleSheets: {
      enabled: true,
      apiKey: "AIzaSyC4YfuuFM7bkQn8Xvlp...",
      sheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    },
    googleAnalytics: {
      enabled: false,
      trackingId: "",
    },
    facebookPixel: {
      enabled: false,
      pixelId: "",
    },
  })

  const handleSave = () => {
    console.log("Saving integrations:", integrations)
  }

  return (
    <div className="space-y-6 bg-white text-black">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-clash">{t('Integrations', lang)}</h1>
        <p className="mt-2 text-gray-600 font-inter">{t('Connect your store with external services', lang)}</p>
      </div>

      {/* Google Sheets Integration */}
      <Card className="bg-white text-black">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                {t('Google Sheets', lang)}
                <Badge variant={integrations.googleSheets.enabled ? "default" : "secondary"} className="ml-2">
                  {integrations.googleSheets.enabled ? t('Connected', lang) : t('Disconnected', lang)}
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{t('Export orders and data to Google Sheets', lang)}</p>
            </div>
            {integrations.googleSheets.enabled ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-gray-400" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sheets-api">{t('API Key', lang)}</Label>
            <Input
              id="sheets-api"
              value={integrations.googleSheets.apiKey}
              onChange={(e) =>
                setIntegrations({
                  ...integrations,
                  googleSheets: { ...integrations.googleSheets, apiKey: e.target.value },
                })
              }
              placeholder={t('Enter Google Sheets API key', lang)}
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sheet-id">{t('Sheet ID', lang)}</Label>
            <Input
              id="sheet-id"
              value={integrations.googleSheets.sheetId}
              onChange={(e) =>
                setIntegrations({
                  ...integrations,
                  googleSheets: { ...integrations.googleSheets, sheetId: e.target.value },
                })
              }
              placeholder={t('Enter Google Sheet ID', lang)}
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              {t('Test Connection', lang)}
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              {t('View Documentation', lang)}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Google Analytics Integration */}
      <Card className="bg-white text-black">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                {t('Google Analytics', lang)}
                <Badge variant={integrations.googleAnalytics.enabled ? "default" : "secondary"} className="ml-2">
                  {integrations.googleAnalytics.enabled ? t('Connected', lang) : t('Disconnected', lang)}
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{t('Track website analytics and user behavior', lang)}</p>
            </div>
            {integrations.googleAnalytics.enabled ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-gray-400" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ga-tracking">{t('Tracking ID', lang)}</Label>
            <Input
              id="ga-tracking"
              value={integrations.googleAnalytics.trackingId}
              onChange={(e) =>
                setIntegrations({
                  ...integrations,
                  googleAnalytics: { ...integrations.googleAnalytics, trackingId: e.target.value },
                })
              }
              placeholder="G-XXXXXXXXXX"
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              {t('Test Connection', lang)}
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              {t('View Documentation', lang)}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Facebook Pixel Integration */}
      <Card className="bg-white text-black">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                {t('Facebook Pixel', lang)}
                <Badge variant={integrations.facebookPixel.enabled ? "default" : "secondary"} className="ml-2">
                  {integrations.facebookPixel.enabled ? t('Connected', lang) : t('Disconnected', lang)}
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{t('Track conversions and optimize Facebook ads', lang)}</p>
            </div>
            {integrations.facebookPixel.enabled ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-gray-400" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pixel-id">{t('Pixel ID', lang)}</Label>
            <Input
              id="pixel-id"
              value={integrations.facebookPixel.pixelId}
              onChange={(e) =>
                setIntegrations({
                  ...integrations,
                  facebookPixel: { ...integrations.facebookPixel, pixelId: e.target.value },
                })
              }
              placeholder={t('Enter Facebook Pixel ID', lang)}
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              {t('Test Connection', lang)}
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              {t('View Documentation', lang)}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
          <Save className="mr-2 h-4 w-4" />
          {t('Save All Integrations', lang)}
        </Button>
      </div>
    </div>
  )
}
