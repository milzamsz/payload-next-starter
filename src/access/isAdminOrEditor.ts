import type { AccessArgs } from 'payload'

type UserWithRole = {
  role?: 'admin' | 'editor'
}

export const isAdminOrEditor = ({ req: { user } }: AccessArgs): boolean => {
  if (!user) return false
  const userWithRole = user as unknown as UserWithRole
  return userWithRole.role === 'admin' || userWithRole.role === 'editor'
}

export const isAdmin = ({ req: { user } }: AccessArgs): boolean => {
  if (!user) return false
  const userWithRole = user as unknown as UserWithRole
  return userWithRole.role === 'admin'
}
