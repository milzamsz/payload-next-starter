import React from 'react'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { RootLayout, handleServerFunctions, metadata } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './importMap.js'

export { metadata }

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      htmlProps={{ suppressHydrationWarning: true }}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
