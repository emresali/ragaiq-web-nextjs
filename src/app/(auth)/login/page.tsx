"use client"

import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Loader2, Shield, Zap, BookOpen, Building2, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { authenticate } from "./actions"

function LoginButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-ragaiq-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-ragaiq-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ragaiq-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          Wird überprüft...
        </span>
      ) : (
        "Anmelden"
      )}
    </button>
  )
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const [ssoLoading, setSsoLoading] = useState(false)



  const handleSSO = async (provider: string) => {
    setSsoLoading(true)
    
    try {
      // In production, this would redirect to SSO provider
      window.location.href = `/api/auth/signin/${provider}`
    } catch {
      setSsoLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-ragaiq-primary/5 via-transparent to-ragaiq-primary/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-ragaiq-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ragaiq-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              Rag<span className="text-ragaiq-primary">AI-Q</span>
            </h1>
            <p className="mt-2 text-gray-600">Enterprise Regulatory Intelligence Platform</p>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Willkommen zurück</h2>
              <p className="mt-2 text-sm text-gray-600">
                Melden Sie sich in Ihrem Unternehmenskonto an
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-ragaiq-primary/10 rounded-lg">
              <Shield className="w-4 h-4 text-ragaiq-primary" />
              <span className="text-sm font-medium text-gray-700">
                Sichere Enterprise-Anmeldung
              </span>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}

            <form action={dispatch} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Geschäftliche E-Mail-Adresse
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ragaiq-primary focus:border-transparent transition-all"
                  placeholder="name@unternehmen.de"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Passwort
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ragaiq-primary focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <LoginButton />
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">oder</span>
              </div>
            </div>

            {/* SSO Options */}
            <div className="space-y-3">
              <button
                onClick={() => handleSSO("saml")}
                disabled={ssoLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Single Sign-On (SAML)</span>
              </button>

              <button
                onClick={() => handleSSO("azure")}
                disabled={ssoLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Microsoft Azure AD</span>
              </button>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Noch kein Konto?{" "}
              <Link href="/contact" className="font-medium text-ragaiq-primary hover:underline">
                Kontaktieren Sie den Vertrieb
              </Link>
            </p>
          </div>

          {/* Legal Footer */}
          <div className="mt-8 text-center text-xs text-gray-500 space-x-4">
            <Link href="/datenschutz" className="hover:text-ragaiq-primary">
              Datenschutzerklärung
            </Link>
            <span>•</span>
            <Link href="/impressum" className="hover:text-ragaiq-primary">
              Impressum
            </Link>
            <span>•</span>
            <Link href="/agb" className="hover:text-ragaiq-primary">
              AGB
            </Link>
            <span>•</span>
            <Link href="/sicherheit" className="hover:text-ragaiq-primary">
              Sicherheit
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Product Preview */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ragaiq-primary/10 via-transparent to-blue-600/10" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-ragaiq-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />

        <div className="relative z-10 flex flex-col justify-center px-20 max-w-2xl">
          <h2 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-ragaiq-primary via-blue-400 to-ragaiq-primary bg-clip-text text-transparent">
              Intelligente Compliance
            </span>
            <br />
            <span className="text-white">
              auf Enterprise-Niveau
            </span>
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-ragaiq-primary/30 to-ragaiq-primary/10 rounded-lg flex items-center justify-center border border-ragaiq-primary/20">
                <BookOpen className="w-6 h-6 text-ragaiq-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">KWG, MaRisk &amp; CRR Expertise</h3>
                <p className="text-gray-300 leading-relaxed">
                  Direkter Zugriff auf regulatorische Dokumente mit KI-gestützter Analyse
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-ragaiq-primary/30 to-ragaiq-primary/10 rounded-lg flex items-center justify-center border border-ragaiq-primary/20">
                <Shield className="w-6 h-6 text-ragaiq-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Höchste Sicherheitsstandards</h3>
                <p className="text-gray-300 leading-relaxed">
                  ISO 27001 zertifiziert, DSGVO-konform, On-Premise verfügbar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-ragaiq-primary/30 to-ragaiq-primary/10 rounded-lg flex items-center justify-center border border-ragaiq-primary/20">
                <Zap className="w-6 h-6 text-ragaiq-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Sofortige Antworten</h3>
                <p className="text-gray-300 leading-relaxed">
                  Präzise Antworten mit Quellenangaben in Sekunden
                </p>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-12 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-ragaiq-primary/20">
            <div className="font-mono text-sm">
              <div className="text-ragaiq-primary mb-2 flex items-center gap-2">
                <span className="text-xl">→</span> Frage:
              </div>
              <div className="text-white font-medium mb-4 pl-6">
                &ldquo;Welche Anforderungen stellt MaRisk an das Risikocontrolling?&rdquo;
              </div>
              <div className="text-ragaiq-primary mb-2 flex items-center gap-2">
                <span className="text-xl">←</span> RagAI-Q:
              </div>
              <div className="text-gray-300 pl-6">
                <span className="inline-block animate-pulse">Analysiere MaRisk AT 4.3.2 mit relevanten Quellen...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}