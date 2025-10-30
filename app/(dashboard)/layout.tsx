import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/layout/navigation'

async function getUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session) {
    redirect('/login')
  }

  try {
    const user = JSON.parse(Buffer.from(session.value, 'base64').toString())
    return user
  } catch {
    redirect('/login')
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userName={user.name} userOrganization={user.organization} />
      {children}
    </div>
  )
}
