"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, ExternalLink, CheckCircle, XCircle } from "lucide-react"

export default function IntegrationsPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 font-clash">Integrations</h1>
        <p className="mt-2 text-gray-600 font-inter">Connect your store with external services</p>
      </div>

      {/* Google Sheets Integration */}
      <Card className="bg-white text-black">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                Google Sheets
                <Badge variant={integrations.googleSheets.enabled ? "default" : "secondary"} className="ml-2">
                  {integrations.googleSheets.enabled ? "Connected" : "Disconnected"}
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Export orders and data to Google Sheets</p>
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
            <Label htmlFor="sheets-api">API Key</Label>
            <Input
              id="sheets-api"
              value={integrations.googleSheets.apiKey}
              onChange={(e) =>
                setIntegrations({
                  ...integrations,
                  googleSheets: { ...integrations.googleSheets, apiKey: e.target.value },
                })
              }
              placeholder="Enter Google Sheets API key"
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sheet-id">Sheet ID</Label>
            <Input
              id="sheet-id"
              value={integrations.googleSheets.sheetId}
              onChange={(e) =>
                setIntegrations({
                  ...integrations,
                  googleSheets: { ...integrations.googleSheets, sheetId: e.target.value },
                })
              }
              placeholder="Enter Google Sheet ID"
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              View Documentation
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
                Google Analytics
                <Badge variant={integrations.googleAnalytics.enabled ? "default" : "secondary"} className="ml-2">
                  {integrations.googleAnalytics.enabled ? "Connected" : "Disconnected"}
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Track website analytics and user behavior</p>
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
            <Label htmlFor="ga-tracking">Tracking ID</Label>
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
              Test Connection
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              View Documentation
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
                Facebook Pixel
                <Badge variant={integrations.facebookPixel.enabled ? "default" : "secondary"} className="ml-2">
                  {integrations.facebookPixel.enabled ? "Connected" : "Disconnected"}
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Track conversions and optimize Facebook ads</p>
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
            <Label htmlFor="pixel-id">Pixel ID</Label>
            <Input
              id="pixel-id"
              value={integrations.facebookPixel.pixelId}
              onChange={(e) =>
                setIntegrations({
                  ...integrations,
                  facebookPixel: { ...integrations.facebookPixel, pixelId: e.target.value },
                })
              }
              placeholder="Enter Facebook Pixel ID"
              className="bg-white text-black border-gray-300 focus:ring-green-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
          <Save className="mr-2 h-4 w-4" />
          Save All Integrations
        </Button>
      </div>
    </div>
  )
}
