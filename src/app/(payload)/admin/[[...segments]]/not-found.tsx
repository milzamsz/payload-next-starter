import { NotFoundPage } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../../importMap.js'

export default function NotFound() {
  return NotFoundPage({ config, importMap })
}
