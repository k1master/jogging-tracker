export const isFieldRequired = value =>
  value ? undefined : 'This Field is Required.'

export const ucFirst = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const isAdmin = (profile) => profile.role === 'admin'

export const isManager = (profile) => profile.role === 'manager'

export const isUser = (profile) => profile.role === 'user'

export const canManageUsers = (profile) => isAdmin(profile) || isManager(profile)
